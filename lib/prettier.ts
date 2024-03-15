import prettier from "prettier/standalone";
import estree from "prettier/plugins/estree";
import typescript from "prettier/plugins/typescript";
import type { Options } from "prettier";

const prettierConfig = {
  plugins: [estree, typescript],
  parser: "typescript",
  useTabs: true,
  trailingComma: "all",
  printWidth: 100,
} satisfies Options;

export const formatCode = async (val: string) => {
  try {
    const text = await prettier.format(val, prettierConfig);
    return text;
  } catch (e) {
    console.error("prettier failed: ", e);
    return null;
  }
};
