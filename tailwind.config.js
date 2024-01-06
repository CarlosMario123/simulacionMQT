/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{html,js}'//se lo va asignar a todos
  ],
  // ...
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["synthwave"],
  }
}
