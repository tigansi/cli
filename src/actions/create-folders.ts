import path from "path";
import fs from "fs/promises";

export const createFolders = {
  runCommand: async (projectPath: string) => {
    console.log(`\n📁 Criando estrutura de pastas...\n`);
    const folders = [
      "schemas",
      "routes",
      "shared",
      "shared/components",
      "shared/hooks",
      "shared/services",
      "modules",
      "types",
      "stores",
      "styles"
    ];
    for (const folder of folders) {
      await fs.mkdir(path.join(projectPath, "src", folder), {
        recursive: true,
      });
    }
  },
};
