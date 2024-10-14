import express from "express";
import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from "../controllers/note.controller.js";

const router = express.Router();

router.get("/folders/:folder_id/notes", getNotes);
router.get("/notes/:note_id", getNote);
router.post("/folders/:folder_id/notes", createNote);
router.put("/notes/:note_id", updateNote);
router.delete("/notes/:note_id", deleteNote);

export default router;
