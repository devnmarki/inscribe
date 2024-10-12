/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        500: "500px",
        470: "470px",
        310: "310px",
        288: "288px",
        228: "228px",
        176: "176px",
        155: "155px",
        50: "50px",
      },
      height: {
        100: "100px",
        80: "80px",
        50: "50px",
        38: "38px",
        35: "35px",
      },
      colors: {
        black: {
          1: "#333333",
        },
        gray: {
          1: "#C5CCDB",
          2: "#F5F5F5",
        },
        white: {
          1: "#FFFFFF",
        },
      },
      padding: {
        10: "10px",
        15: "15px",
        20: "20px",
        30: "30px",
        33: "33px",
        45: "45px",
      },
      gap: {
        3: "3px",
        5: "5px",
        10: "10px",
        15: "15px",
        20: "20px",
        30: "30px",
      },
      borderRadius: {
        5: "5px",
      },
      fontSize: {
        20: "20px",
        16: "16px",
      },
    },
  },
  plugins: [],
};
