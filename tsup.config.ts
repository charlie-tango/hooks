import * as path from "node:path";
import { globbySync } from "globby";
import { defineConfig } from "tsup";

const kebabCase = (str: string) =>
  str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

const entries: Record<string, string> = { index: "src/index.ts" };
globbySync("src/hooks/use*.ts").forEach((file) => {
  const { name } = path.parse(file);
  entries[`hooks/${kebabCase(name)}`] = file;
});

export default defineConfig({
  minify: false,
  dts: true,
  clean: true,
  external: ["react", "react-dom"],
  format: ["esm"],
  entry: entries,
  outDir: "dist",
  treeshake: true,
});
