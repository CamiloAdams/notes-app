import { model, Schema } from "mongoose";

const colorSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      require: true,
    },
    hex_code: {
      type: String,
      unique: true,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model("Color", colorSchema);
