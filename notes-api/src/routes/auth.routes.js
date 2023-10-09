import { Router } from "express";
const router = Router();

import * as authCtrl from "../controllers/auth.controller";

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.get("/logout", authCtrl.logout);

export default router;
