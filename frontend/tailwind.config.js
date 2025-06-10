/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "bounce-in": "bounceIn 0.6s ease-out",
        "pulse-soft": "pulse 2s infinite",
      },
    },
  },
  plugins: [],
};
