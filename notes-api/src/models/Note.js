import { Schema, model } from "mongoose";

const noteSchema = new Schema(
    {
        id_usuario: {
            ref: "User",
            type: Schema.Types.ObjectId,
        },
        title: String,
        content: String,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("Note", noteSchema);
