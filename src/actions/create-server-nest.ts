import path from "path";
import { execa } from "execa";

export const createServerNest = {
  runCommand: async (projectPath: string) => {
    console.log("🚀 Criando backend NestJS na pasta /server...");

    const serverPath = path.join(projectPath, "server");

    try {
      // Cria o projeto NestJS diretamente na pasta /server
      await execa(
        "npx",
        [
          "@nestjs/cli",
          "new",
          "server",
          "--skip-git",
          "--package-manager",
          "npm",
        ],
        {
          cwd: projectPath, // Executa o comando dentro da pasta do projeto React
          stdio: "inherit",
        }
      );

      console.log("✅ Projeto NestJS criado com sucesso em:", serverPath);
    } catch (error) {
      console.error("❌ Erro ao criar projeto NestJS:", error);
      throw error;
    }
  },
};
