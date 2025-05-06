import inquirer from "inquirer";
import { execa } from "execa";
import fs from "fs";

export const createVite = {
  /** Roda o comando npx create-vite@latest **/
  runCommand: async () => {
    const { projectName } = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "Nome do projeto:",
        validate: (input) => (input ? true : "Digite um nome válido."),
      },
    ]);

    if (fs.existsSync(projectName)) {
      const { overwrite } = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: `O diretório "${projectName}" já existe. Deseja sobrescrever?`,
          default: false,
        },
      ]);

      if (!overwrite) {
        console.log("🚫 Operação cancelada.");
        process.exit(0);
      }

      fs.rmSync(projectName, { recursive: true, force: true });
    }

    console.log(`\n📦 Criando projeto Vite: ${projectName}...\n`);
    try {
      await execa(
        "npx",
        ["create-vite@latest", projectName, "--template", "react-swc-ts"],
        { stdio: "inherit" }
      );
    } catch (error) {
      console.error("❌ Erro ao criar o projeto Vite:", error);
      process.exit(1);
    }

    return projectName;
  },
};
