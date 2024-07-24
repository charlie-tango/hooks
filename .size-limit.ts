import * as path from "node:path";
import { globbySync } from "globby";
import type { SizeLimitConfig } from "size-limit";

// Get all hooks from the `src/hooks` directory, and validate their size
const importNames = globbySync("src/hooks/*.ts").map((file) => {
  return path.parse(file).name;
});

const limits = [
  ...importNames.map((name) => ({
    name: `${name} (ems)`,
    import: `{ ${name} }`,
    limit: "1 kb",
    path: "dist/index.js",
  })),
  ...importNames.map((name) => ({
    name: `${name} (cjs)`,
    import: `{ ${name} }`,
    limit: "1.5 kb",
    path: "dist/index.cjs",
  })),
] satisfies SizeLimitConfig;

export default limits;
