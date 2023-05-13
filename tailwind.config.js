/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        weatherimg: "url('/assets/image/weatherimg.jpg')",
      },
    },
  },
  plugins: [],
};
