/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,css,js}",
    "./views/*.ejs",],
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  // add daisyUI plugin
  plugins: [require("daisyui")],

  // daisyUI config 
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
}
