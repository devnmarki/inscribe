import { FolderType } from "./folder.data";
import { API_URL_BASE } from "../globals";

export type NoteType = {
  _id?: string;
  title?: string;
  content?: string;
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
