import fs from "node:fs/promises";
import { globby } from "globby";

async function syncExports() {
  const pck = JSON.parse(await fs.readFile("./package.json", "utf-8"));
  const hooks = await globby("./src/**/use*.ts");

  pck.exports = {};
  hooks.forEach((hook) => {
    // Convert file to kebab-case, and remove extension and src
    const entry = hook
      .replace("src/", "")
      .replace(".ts", "")
      .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
      .toLowerCase();
    const distFile = hook.replace("src", "dist");

    pck.exports[entry] = {
      types: distFile.replace(".ts", ".d.ts"),
      import: distFile.replace(".ts", ".mjs"),
      require: distFile.replace(".ts", ".cjs"),
      default: distFile.replace(".ts", ".cjs"),
    };
  });

  await fs.writeFile("./package.json", JSON.stringify(pck, null, 2));
}

syncExports();
