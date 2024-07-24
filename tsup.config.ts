import { globbySync } from "globby";
import { defineConfig } from "tsup";

const hooks = globbySync("src/hooks/use*.ts");

export default defineConfig({
  minify: false,
  dts: true,
  clean: true,
  external: ["react", "react-dom"],
  format: ["esm", "cjs"],
  entry: ["src/index.ts", ...hooks],
  outDir: "dist",
  treeshake: true,
});
