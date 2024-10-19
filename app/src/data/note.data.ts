import { FolderType } from "./folder.data";
import { API_URL_BASE } from "../globals";

export type NoteType = {
  _id?: string;
  title?: string;
  content?: string;
  date?: string;
  archived?: boolean;
};

export const getNotesOfSelectedFolder = async (
  selctedFolder: FolderType | null,
) => {
  try {
    const response = await fetch(
      `${API_URL_BASE}/folders/${selctedFolder?._id}/notes`,
    );

    if (!response.ok) {
      throw new Error("Failed to get nores of selected folder.");
    }

    let result = (await response.json()) as NoteType[];

    return result;
  } catch (e) {
    console.error(e);
  }
};

export const getNote = async (noteId: string) => {
  try {
    const response = await fetch(`${API_URL_BASE}/notes/${noteId}`);

    if (!response.ok) {
      throw new Error("Failed to get nores of selected folder.");
    }

    let result = (await response.json()) as NoteType;

    return result;
  } catch (e) {
    console.error(e);
  }
};

export const createNote = async (folderId: string, noteData: NoteType) => {
  try {
    const response = await fetch(`${API_URL_BASE}/folders/${folderId}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });

    if (!response.ok) {
      throw new Error("Could not create note.");
    }

    let result = await response.json();

    return result;
  } catch (e) {
    console.error(e);
  }
};

export const updateNote = async (noteId: string, updatedData: NoteType) => {
  try {
    const response = await fetch(`${API_URL_BASE}/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Could not update note.");
    }

    let result = await response.json();

    return result;
  } catch (e) {
    console.error(e);
  }
};

export const deleteNote = async (noteId: string) => {
  try {
    const response = await fetch(`${API_URL_BASE}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete note: " + noteId);
    }

    let result = await response.json();

    return result;
  } catch (e) {
    console.error(e);
  }
};
