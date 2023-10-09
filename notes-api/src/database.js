import mongoose from "mongoose";

mongoose.set('strictQuery', false)
    // .connect("mongodb://localhost/notesapp")
    .connect("mongodb://localhost:27017/notesapp")
    .then((db) => console.log("Db is connected"))
    .catch((error) => console.log(error));
