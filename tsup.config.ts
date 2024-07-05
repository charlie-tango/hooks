import { defineConfig } from "tsup";

export default defineConfig({
  minify: false,
  sourcemap: true,
  dts: true,
  clean: true,
  outDir: "lib",
  target: "es2018",
  external: ["react"],
  format: ["esm", "cjs"],
});
