import { NavigateFunction } from "react-router-dom";

type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
};

export const getLoggedInUser = async (): Promise<User | null> => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/user", {
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    let result = await response.json();

    return result.user as User;
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
