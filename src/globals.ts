export const API_URL_BASE = "http://localhost:5000/api";

export const Icons = {
  editGray: "/icons/edit_gray_icon.svg",
  editBlack: "/icons/edit_icon.svg",
  archiveGray: "/icons/archive_gray_icon.svg",
  archiveBlack: "/icons/archive_icon.svg",
  trashGray: "/icons/trash_gray_icon.svg",
  trashRed: "/icons/trash_red_icon.svg",
};

export const modalsStatesConfig = {
  fade: false,
  createFolderPopup: false,
  deleteFolderPopup: false,
  noteEditor: false,
};

export const setBackgroundColor = () => {
  document.body.style.backgroundColor = "#F5F5F5";

  return () => {
    document.body.style.backgroundColor = "";
  };
};

export const shortenUrl = async (url: string) => {
  try {
    const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
      method: "POST",
      headers: {
        Authorization: "Bearer 26e41e4a35b621fea9683776ffe8250d0aa6a086",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        long_url: url,
      }),
    });

    const result = await response.json();

    return result;
  } catch (e) {
    console.error(e);
  }
};
