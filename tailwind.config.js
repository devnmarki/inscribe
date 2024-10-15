/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        500: "500px",
        470: "470px",
        350: "350px",
        310: "310px",
        288: "288px",
        280: "280px",
        228: "228px",
        176: "176px",
        155: "155px",
        50: "50px",
        24: "24px",
        "45c": "45ch",
      },
      height: {
        294: "294px",
        290: "290px",
        181: "181px",
        101: "101px",
        100: "100px",
        80: "80px",
        50: "50px",
        38: "38px",
        35: "35px",
        14: "14px",
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
        red: {
          1: "#F93737",
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
        25: "25px",
        30: "30px",
      },
      borderWidth: {
        1: "1px",
      },
      borderRadius: {
        5: "5px",
      },
      fontSize: {
        20: "20px",
        16: "16px",
        14: "14px",
      },
      gridTemplateColumns: {
        notes: {
          3: "repeat(3, minmax(0px, 350px))",
        },
      },
    },
  },
  plugins: [],
};
