export const API_URL_BASE = "http://localhost:5000/api";

export const Icons = {
  editGray: "/icons/edit_gray_icon.svg",
  editBlack: "/icons/edit_icon.svg",
  archiveGray: "/icons/archive_gray_icon.svg",
  archiveBlack: "/icons/archive_icon.svg",
  trashGray: "/icons/trash_gray_icon.svg",
  trashRed: "/icons/trash_red_icon.svg",
};

export const setBackgroundColor = () => {
  document.body.style.backgroundColor = "#F5F5F5";

  return () => {
    document.body.style.backgroundColor = "";
  };
};
