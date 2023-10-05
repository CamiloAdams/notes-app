import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
import cors from "cors";
import cookieParser from "cookie-parser";

import { createAdminUser, createRoles } from "./libs/initialSetup";
import authRoutes from "./routes/auth.routes";
import notesRoutes from "./routes/notes.routes";
import userRoutes from "./routes/user.routes";
import cookiesRoutes from "./routes/cookies.routes";

const app = express();

createRoles().then(() => createAdminUser());

app.set("pkg", pkg);

app.use(express.json());
app.use(cookieParser())
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cookie", cookiesRoutes);

export default app;
