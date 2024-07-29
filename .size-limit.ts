import * as path from "node:path";
import { globbySync } from "globby";
import type { SizeLimitConfig } from "size-limit";

const toCamelCase = (str: string) =>
  str.replace(/-([a-z])/g, (_, m) => m.toUpperCase());

// Get all hooks from the `src/hooks` directory, and validate their size
const limits = globbySync("dist/hooks/use*.js").map((file) => {
  const name = path.parse(file).name;

  return {
    name: name,
    path: file,
    import: `{ ${toCamelCase(name)} }`,
    limit: "1 KB",
  };
}) satisfies SizeLimitConfig;

export default limits;
