import mongoose from "mongoose";

mongoose
    // .connect("mongodb://localhost/notesapp")
    .connect("mongodb://0.0.0.0:27017/notesapp")
    .then((db) => console.log("Db is connected"))
    .catch((error) => console.log(error));
