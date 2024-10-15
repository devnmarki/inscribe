import { FolderType } from "./folder.data";
import { API_URL_BASE } from "../globals";

export type NoteType = {
  _id?: string;
  title?: string;
  content?: string;
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
