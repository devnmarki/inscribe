import { API_URL_BASE } from "../globals";
import { getLoggedInUser } from "./user.data";

export type FolderType = {
  _id?: string;
  user_id?: string;
  name?: string;
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

export const getFoldersOfLoggedInUser = async () => {
  try {
    const loggedInUser = await getLoggedInUser();
    if (!loggedInUser) return;

    const response = await fetch(
      `${API_URL_BASE}/users/${loggedInUser._id}/folders`,
    );

    if (!response.ok) {
      throw new Error("Failed to get folder from logged in user.");
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

    console.log("Folder created successfully!");

    return result;
  } catch (e) {
    console.error(e);
  }
};

export const updateFolder = async (folderId: string, newData: FolderType) => {
  try {
    const response = await fetch(`${API_URL_BASE}/folders/${folderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      throw new Error("Failed to update folder: " + folderId);
    }

    let result = await response.json();

    return result;
  } catch (e) {
    console.error(e);
  }
};

export const deleteFolder = async (folderId: string) => {
  try {
    const response = await fetch(`${API_URL_BASE}/folders/${folderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete folder: " + folderId);
    }

    let result = await response.json();

    return result;
  } catch (e) {
    console.error(e);
  }
};
