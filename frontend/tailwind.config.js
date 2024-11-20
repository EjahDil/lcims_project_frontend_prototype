/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'custom-md': '1089px',
        "sm-732" : {max : "732px"},
         'xs': {max : "256px"},
         "sm-168" : {max : "168px"},
         "sm-238" : {max : "238px"},
         "sm-211" : {max : "211px"},
         "sm-138" : {max : "138px"},
         "sm-1000" : {min : "1000px"},
      },
    },
  },
  plugins: [
    function({addBase}) {
    addBase({
      '@media (max-width: 732px)': {
        body: { overflowX: 'hidden' },
      },
    });
  },
  ],
}

