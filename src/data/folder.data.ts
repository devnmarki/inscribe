import { API_URL_BASE } from "../globals";

export type FolderType = {
  _id: string;
  user_id: string;
  name: string;
};

export const getFolders = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL_BASE}/users/${userId}/folders`);

    if (!response.ok) {
      throw new Error("Failed to get folder from user: " + userId);
    }

    let result = await response.json();

    return result;
  } catch (e) {
    console.error(e);
  }
};

export const getFolder = async (folderId: string) => {
  try {
    const response = await fetch(`${API_URL_BASE}/folders/${folderId}`);

    if (!response.ok) {
      throw new Error("Failed to get folder: " + folderId);
    }

    let result = await response.json();

    return result;
  } catch (e) {
    console.error(e);
  }
};

export const createFolder = async (userId: string, data: FolderType) => {
  try {
    const response = await fetch(`${API_URL_BASE}/users/${userId}/folders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create new folder.");
    }

    let result = await response.json();

    return result;
  } catch (e) {
    console.error(e);
  }
};
