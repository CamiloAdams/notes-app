import { Router } from "express";

import * as notesCtrl from "../controllers/notes.controller";
import { authjwt } from "../middlewares";

const router = Router();

router.post("/", [authjwt.verifyToken], notesCtrl.createNote);

router.get("/", [authjwt.verifyToken], notesCtrl.getNotes);

router.get(
    "/:noteId",
    [authjwt.verifyToken],
    notesCtrl.getNote
);

router.put(
    "/:noteId",
    [authjwt.verifyToken],
    notesCtrl.updateNoteById
);

router.delete(
    "/:noteId",
    [authjwt.verifyToken],
    notesCtrl.deleteNoteById
);

export default router;
