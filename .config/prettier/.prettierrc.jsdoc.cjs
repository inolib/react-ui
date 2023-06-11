/* eslint-disable @typescript-eslint/no-unsafe-assignment */
module.exports = {
  ...require("../../.prettierrc.cjs"),
  plugins: [require("prettier-plugin-jsdoc")],
  jsdocKeepUnParseAbleExampleIndent: true,
  jsdocSeparateTagGroups: true,
};
