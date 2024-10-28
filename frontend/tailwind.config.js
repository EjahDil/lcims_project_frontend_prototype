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
        "sm-732" : {max : "732px"}
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

