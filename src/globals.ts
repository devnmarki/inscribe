export const API_URL_BASE = "http://localhost:5000/api";

export const setBackgroundColor = () => {
  document.body.style.backgroundColor = "#F5F5F5";

  return () => {
    document.body.style.backgroundColor = "";
  };
};
