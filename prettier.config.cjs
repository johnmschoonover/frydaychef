/** @type {import("prettier").Config} */
module.exports = {
  plugins: [],
  overrides: [
    {
      files: "*.md",
      options: {
        proseWrap: "always"
      }
    }
  ]
};
