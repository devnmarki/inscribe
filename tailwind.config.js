/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        500: "500px",
        470: "470px",
        310: "310px",
        228: "228px",
        176: "176px"
      },
      height: {
        50: "50px",
        38: "38px"
      },
      colors: {
        black: {
          1: "#333333"
        },
        gray: {
          1: "#C5CCDB"
        },
        white: {
          1: "#FFFFFF"
        }
      },
      padding: {
        10: "10px",
        15: "15px",
        20: "20px",
        30: "30px"
      },
      gap: {
        5: "5px",
        10: "10px",
        15: "15px",
        20: "20px",
        30: "30px"
      }
    },
  },
  plugins: [],
}