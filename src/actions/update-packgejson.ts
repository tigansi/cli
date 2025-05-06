import path from "path";
import fs from "fs/promises";

export const updatePackageJson = {
  runCommand: async (projectPath: string) => {
    console.log("🔧 Atualizando script de desenvolvimento no package.json...");

    const packageJsonPath = path.join(projectPath, "package.json");

    try {
      const rawContent = await fs.readFile(packageJsonPath, "utf-8");
      const packageJson = JSON.parse(rawContent);

      const currentDevScript = packageJson.scripts?.dev || "";

      // Garante que o comando tenha o --open no final
      const updatedDevScript = currentDevScript.includes("--open")
        ? currentDevScript
        : `${currentDevScript} --open`.trim();

      packageJson.scripts = {
        ...packageJson.scripts,
        dev: updatedDevScript,
      };

      await fs.writeFile(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2),
        "utf-8"
      );

      console.log(`✅ Script "dev" atualizado: "${updatedDevScript}"`);
    } catch (error) {
      console.error("❌ Erro ao atualizar o package.json:", error);
      throw error;
    }
  },
};
