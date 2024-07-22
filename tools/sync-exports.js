import fs from "node:fs/promises";
import { globby } from "globby";

async function syncExports() {
  const pck = JSON.parse(await fs.readFile("./package.json", "utf-8"));
  const hooks = await globby("./src/**/use*.ts");

  pck.exports = {};
  hooks.forEach((hook) => {
    const entry = hook.replace(".ts", "");
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
