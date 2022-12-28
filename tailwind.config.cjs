/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        //* SOIL COLORS
        dark_brown: "#765435",
        seal_brown: "#582F0E",
        russet: "#7F4F24",
        coyote_brown: "#936639",
        camel: "#A68A64",
        khaki_web: "#B6AD90",

        //* GREEN COLORS
        pine_tree: "#292F23",
        kombu_green: "#333D29",
        rifle_green: "#414833",
        dark_olive_green: "#656D4A",
        laurel_green: "#A4AC86",

        //* LIGHT COLORS
        laurel_green_light: "#C2C5AA",
      },

      fontFamily: {
        'raleway': ['Raleway' , 'cursive']
      },
    },
    
  },
  plugins: [],
}
