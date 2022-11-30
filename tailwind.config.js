module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "m-green": "#007A3A",
        "m-green-light": "#0FCB5B",
      },
    },
  },
  variants: {
    // all the following default to ['responsive']
    imageRendering: ["responsive"],
  },
  plugins: [
    require("tailwindcss-image-rendering")(), // no options to configure
  ],
};
