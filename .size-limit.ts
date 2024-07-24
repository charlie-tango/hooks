import * as path from "node:path";
import { globbySync } from "globby";
import type { SizeLimitConfig } from "size-limit";

// Get all hooks from the `src/hooks` directory, and validate their size
const limits = globbySync("src/hooks/use*.ts").map((file) => {
  const name = path.parse(file).name;

  return {
    name: name,
    import: `{ ${name} }`,
    path: "dist/index.js",
    limit: "1 KB",
  };
}) satisfies SizeLimitConfig;

export default limits;
