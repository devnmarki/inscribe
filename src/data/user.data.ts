import { NavigateFunction } from "react-router-dom";
import { API_URL_BASE } from "../globals";

type UserData = {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
};

export const getLoggedInUser = async (): Promise<UserData | null> => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/user", {
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    let result = await response.json();

    return result.user as UserData;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const updateLoggedInUserData = async (
  newData: UserData,
): Promise<UserData | null> => {
  try {
    const loggedInUser = await getLoggedInUser();

    const response = await fetch(`${API_URL_BASE}/user/${loggedInUser?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      throw new Error("Could not update logged in user data.");
    }

    let result = await response.json();

    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const logOutUser = async (navigate: NavigateFunction) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/logout", {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to log out user!");
    }

    const result = await response.json();

    navigate("/");

    return result;
  } catch (e) {
    console.error(e);
  }
};

export const handleLoggedInUser = async (navigate: NavigateFunction) => {
  const loggedInUser = await getLoggedInUser();

  if (loggedInUser) {
    navigate("/notes");
  }
};
