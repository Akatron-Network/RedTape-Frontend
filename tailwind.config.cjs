/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        fogra_dark: "#041421",
        fogra: "#041D29",
        oxford_blue: "#042630",
        prussian_blue: "#163941",
        indigo_dye: "#284C52",
        mn_blue: "#3A5F63",
        queen_blue: "#4C7273",
        shadow_blue: "#699692",
        steel_blue: "#8ABCB2",
        steel_blue_light: "#ABC8C3",
        alica_blue: "#BECFCD",
        alica_blue_middle: "#D0D6D6",
        alica_blue_light: "#E3E6E6",
        ghost_white: "#F5F5F5",

        purple: "#636792",
        purple_light: "#9295B5",
        eggplant: "#B92F2F",
        eggplant_light: "#E34744",
        golden: "#FBB623",
        golden_light: "#FBC44B",
        sea_green: "#3CB371",
        sea_green_light: "#58CB8B",
        blues: "#0C4C8A",

        not_tahsil: "#D48155",
        not_tahsil_light: "#E79468",
        not_tahsil_dark: "#E37B43",
        
        modal_bg: "#0000006E",
        html_bg: "#F0F2F1",
        dark_modal_bg: "#000000BF",
        esprint_red: "#AC0B03",
        esprint_gray: "#1A1A18",


        //, fogra_dark: "#0A131F",
        //, fogra: "#0E1B2B",
        //, oxford_blue: "#112236",
        //, prussian_blue: "#1E3249",
        //, indigo_dye: "#2A425B",
        //, mn_blue: "#37526E",
        //, queen_blue: "#426280",
        //, shadow_blue: "#738EA9",
        //, steel_blue: "#A3BAD2",
        //, steel_blue_light: "#C9D6E3",
        //, alica_blue: "#DBE4ED",
        //, alica_blue_middle: "#E4EBF2",
        //, alica_blue_light: "#EDF2F6",
        //, ghost_white: "#F9FBFF",

        //, purple: "#636792",
        //, purple_light: "#9295B5",
        //, eggplant: "#C53030",
        //, eggplant_light: "#D34A4A",
        //, golden: "#FBB623",
        //, golden_light: "#FBC44B",
        //, sea_green: "#408759",
        //, sea_green_light: "#4EA66D",

        //, modal_bg: "#0000006E",
        //, dark_modal_bg: "#000000BF",
        //, esprint_red: "#AC0B03",
        //, esprint_gray: "#1A1A18"

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
  ]
}
