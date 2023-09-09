import Note from "../models/Note";
import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";

export const createNote = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    const decoded = await jwt.verify(token, config.SECRET);

    const { title, content } = req.body;

    const user = await User.findById(decoded.id, { password: 0 });

    if (!user) return res.status(404).json({ message: "No user found" });

    const newNote = new Note({
      user_id: decoded.id,
      title,
      content,
    });

    const noteSaved = await newNote.save();
    delete noteSaved["_doc"].user_id;

    res.status(201).json({
      noteSaved,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unautorized" });
  }
};

export const getNotes = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    const decoded = await jwt.verify(token, config.SECRET);

    const user = await User.findById(decoded.id, {
      username: 0,
      password: 0,
      roles: 0,
    });

    if (!user) return res.status(404).json({ message: "No user found" });

    const notes = await Note.find({ id_usuario: user.id }, { id_usuario: 0 });

    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const getNote = async (req, res) => {
  await Note.findById(req.params.noteId, function (err, data) {
    if (!err) {
      res.status(200).json(data);
    } else {
      console.error;
      res.status(500).json("An error has ocurred");
    }
  })
    .clone()
    .catch(function (err) {
      console.log("An error has ocurred");
    });
};

export const updateNoteById = async (req, res) => {
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.noteId,
    req.body,
  );
  res.status(200).json(updatedNote);
};

export const deleteNoteById = async (req, res) => {
  const { noteId } = req.params;
  await Bill.findByIdAndDelete(noteId);
  res.status(204).json();
};
