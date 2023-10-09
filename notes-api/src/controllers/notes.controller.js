import Note from "../models/Note";
import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";

export const createNote = async (req, res) => {
  const token = req.headers["x-access-token"];

  const decoded = jwt.verify(token, config.SECRET);

  const { title, content } = req.body;

  if (!title || title.trim().length <= 0) {
    return res.status(400).json({ message: "No title provided" });
  }

  if (!content || content.trim().length <= 0) {
    return res.status(400).json({ message: "No content provided" });
  }

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
};

export const getNotes = async (req, res) => {
  try {
    const token = req.headers["x-access-token"] || req.cookies["token"];

    const decoded = jwt.verify(token, config.SECRET);

    const notes = await Note.find({ user_id: decoded.id }, { user_id: 0 });

    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const getNote = async (req, res) => {
  const token = req.headers["x-access-token"] || req.cookies["token"];

  const decoded = jwt.verify(token, config.SECRET);

  let note = await Note.findById(req.params.noteId, function (err, data) {
    if (err) {
      console.error;
      res.status(500).json("An error has ocurred");
    }
  })
    .clone()
    .catch(function (err) {
      console.log("An error has ocurred");
    });

  if (!note.user_id.equals(decoded.id)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.status(200).json(note);
};

export const updateNoteById = async (req, res) => {
  const token = req.headers["x-access-token"] || req.cookies["token"];

  const decoded = jwt.verify(token, config.SECRET);

  let note = await Note.findById(req.params.noteId, function (err, data) {
    if (err) {
      console.error;
      return res.status(500).json("An error has ocurred");
    }
  })
    .clone()
    .catch(function (err) {
      console.log("An error has ocurred");
    });

  if (!note) {
    return res.status(404).json({ message: "Note not found." });
  }

  if (!note.user_id.equals(decoded.id)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const updatedNote = await Note.findByIdAndUpdate(
    req.params.noteId,
    req.body,
    { new: true },
  );
  res.status(200).json(updatedNote);
};

export const deleteNoteById = async (req, res) => {
  const token = req.headers["x-access-token"] || req.cookies["token"];

  const decoded = jwt.verify(token, config.SECRET);

  let note = await Note.findById(req.params.noteId, function (err, data) {
    if (err) {
      console.error;
      return res.status(500).json("An error has ocurred");
    }
  })
    .clone()
    .catch(function (err) {
      console.log("An error has ocurred");
    });

  if (!note) {
    return res.status(404).json({ message: "Note not found." });
  }

  if (!note.user_id.equals(decoded.id)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { noteId } = req.params;
  await Note.findByIdAndDelete(noteId);
  res.status(204).json();
};
