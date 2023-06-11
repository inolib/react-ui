/* eslint-disable @typescript-eslint/no-unsafe-assignment, jsdoc/check-tag-names */
/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  ...require("../../.prettierrc.cjs"),
  plugins: [require("@ianvs/prettier-plugin-sort-imports")],
  importOrder: ["", "<BUILTIN_MODULES>", "", "<THIRD_PARTY_MODULES>", "", "^\\."],
  importOrderTypeScriptVersion: "5.0.0",
};
