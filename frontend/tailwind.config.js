/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('/assets/img/lccview1.jpg')",
        'manage-bg': "url('/assets/img/lcims_new.png')",
      },

      screens: {
        'custom-md': '1089px',
        "nav-md" : {min : "1400px"},
        "nav-ms" : {max : "1399px"},
        "sm-732" : {max : "732px"},
        "sm-887" : {max : "887px"},
        "sm-684" : {max : "684px"},
        "sm-615" : {max : "615px"},
        "sm-537" : {max : "537px"},
        "sm-478" : {max : "478px"},
        "sm-398" : {max : "398px"},
        "sm-260" : {max : "260px"},
        "sm-333" : {max : "333px"},
         'xs': {max : "256px"},
         "sm-168" : {max : "168px"},
         "sm-238" : {max : "238px"},
         "sm-211" : {max : "211px"},
         "sm-138" : {max : "138px"},
         "sm-1000" : {min : "1000px"},
         "sm-1156" : {max : "1156px"},
         "sm-1342" : {max : "1342px"},
         "sm-1360" : {max : "1360px"},
         "sm-1245" : {max : "1245px"},
         "sm-1664" : {max : "1664px"},
         "sm-1768" : {max : "1768px"},
         "sm-1514" : {min : "1514px"},
         "lg-1360" : {min : "1360px"},
         "lg-1387" : {min : "1387px"},
         "lg-1399" : {min : "1399px"}
      },

      keyframes: {
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blink: {
          '100%': { borderColor: 'transparent' },
        },
      },
      animation: {
        typing: 'typing 3s steps(18, end) forwards',
        blink: 'blink 0.6s step-end infinite',
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

