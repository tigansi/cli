import path from "path";
import fs from "fs/promises";

export const updateTsconfig = {
  /** Método que atualiza o arquivo tsconfig.app.json **/
  runCommand: async (projectPath: string) => {
    console.log(`⚙️ Atualizando tsconfig.app.json...\n`);
    const tsconfigPath = path.join(projectPath, "tsconfig.app.json");
    const tsconfig = JSON.parse(await fs.readFile(tsconfigPath, "utf-8"));
    tsconfig.compilerOptions = {
      ...tsconfig.compilerOptions,
      baseUrl: "./src",
      paths: {
        "@/*": ["./*"],
      },
    };
    await fs.writeFile(
      tsconfigPath,
      JSON.stringify(tsconfig, null, 2),
      "utf-8"
    );
  },
};
