import { STATUS_CODES } from "../constants.js";
import Folder from "../models/folder.model.js";
import Note from "../models/note.model.js";

export const getNotes = async (req, res) => {
  const { folder_id } = req.params;

  try {
    const notes = await Note.find({ folder_id });
    if (!notes) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        message: "Notes not found!",
      });
    }

    res.status(STATUS_CODES.OK).json(notes);
  } catch (e) {
    res.status(STATUS_CODES.SERVER_ERROR).json({ message: e.message });
  }
};

export const getNote = async (req, res) => {
  const { note_id } = req.params;

  try {
    const note = await Note.findById(note_id);
    if (!note) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        message: "Note not found!",
      });
    }

    res.status(STATUS_CODES.OK).json(note);
  } catch (e) {
    res.status(STATUS_CODES.SERVER_ERROR).json({ message: e.message });
  }
};

export const createNote = async (req, res) => {
  const { folder_id } = req.params;

  try {
    const folder = await Folder.findById(folder_id);
    if (!folder) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Folder not found" });
    }

    const note = new Note({
      ...req.body,
      folder_id,
    });

    await note.save();

    res.status(STATUS_CODES.CREATED).json({
      message: "Note created successfully!",
      data: note,
    });
  } catch (e) {
    res.status(STATUS_CODES.SERVER_ERROR).json({ message: e.message });
  }
};

export const updateNote = async (req, res) => {
  const { note_id } = req.params;

  try {
    const updatedNote = await Note.findByIdAndUpdate(note_id, req.body, {
      new: true,
    });

    if (!updatedNote) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        message: "Note not found!",
      });
    }

    res.status(STATUS_CODES.OK).json({ data: updateNote });
  } catch (e) {
    res.status(STATUS_CODES.SERVER_ERROR).json({ message: e.message });
  }
};

export const deleteNote = async (req, res) => {
  const { note_id } = req.params;

  try {
    const deletedNote = await Note.findByIdAndDelete(note_id);
    if (!deletedNote) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        message: "Note not found!",
      });
    }

    res.status(STATUS_CODES.OK).json({ data: deletedNote });
  } catch (e) {
    res.status(STATUS_CODES.SERVER_ERROR).json({ message: e.message });
  }
};
