/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        // //! Green Palette
        // pine_tree: "#2B3021",
        // kombu_green: "#363C2A",
        // rifle_green: "#414833",
        // ebony: "#525943",
        // ebony_light: "#6B735C",
        // xanadu: "#747C65",
        // artichoke: "#868E76",
        // laurel_green: "#ABB39A",
        // laurel_green_light: "#BFC7AD",
        // beige: "#D2DAC0",
        // beige_light: "#DCE0CC",
        // alabaster: "#E5E8D9",

        // dark_olive_green: "#656D4A",

        fogra_dark: "#0A131F",
        fogra: "#0E1B2B",
        oxford_blue: "#112236",
        prussian_blue: "#1E3249",
        indigo_dye: "#2A425B",
        mn_blue: "#37526E",
        queen_blue: "#426280",
        shadow_blue: "#738EA9",
        steel_blue: "#A3BAD2",
        steel_blue_light: "#C9D6E3",
        alica_blue: "#DBE4ED",
        alica_blue_middle: "#E4EBF2",
        alica_blue_light: "#EDF2F6",
        ghost_white: "#F9FBFF",

        dark_blue_gray: "#636792",
        eggplant: "#C53030",
        eggplant_light: "#D34A4A",
        golden: "#FBB623",
        golden_light: "#FBC44B",
        sea_green: "#408759",
        sea_green_light: "#4EA66D",
      },

      fontFamily: {
        'raleway': ['Raleway' , 'cursive'],
        'righteous': ['Righteous' , 'cursive'],
        'roboto': ['Roboto Slab' , 'serif']
      },

      boxShadow: {
        'navbar': '0px 0px 10px 2px rgb(0 0 0 / 60%)',
        'sidebar': '10px 0px 8px -4px rgb(0 0 0 / 35%)',
        'table': '1px 1px 10px -2px rgb(150,150,150,1);',
        'input': '1px 2px 8px -3px rgb(150,150,150,1)',
        'button': '2px 2px 9px 1px rgb(150,150,150,1)'
      }
    },
    
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
