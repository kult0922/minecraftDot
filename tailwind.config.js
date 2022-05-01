module.exports = {
  mode: "jit",
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    // all the following default to ['responsive']
    imageRendering: ["responsive"],
  },
  plugins: [
    require("tailwindcss-image-rendering")(), // no options to configure
  ],
};
