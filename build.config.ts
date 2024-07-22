import { defineBuildConfig } from "unbuild";

// const entries = globbySync("src/use*.ts");

export default defineBuildConfig({
  declaration: true,
  clean: true,
  failOnWarn: true,
  rollup: {
    emitCJS: true,
  },
});
