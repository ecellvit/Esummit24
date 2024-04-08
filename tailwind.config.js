/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "text-gradient":
          "linear-gradient(126deg, #DCA64E 16.34%, #FEFAB7 53.16%, #D6993F 100.41%)",
      },
      colors: {
        "main-green":"#00FF68",
        "color-gradient":
          "linear-gradient(126deg, #DCA64E 16.34%, #FEFAB7 53.16%, #D6993F 100.41%)",
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'gotham-black': ['"Gotham Black"', 'sans-serif'],
        'figtree': ['"Figtree"', 'sans-serif'],
      },
      },
    },
    plugins: [],
};
