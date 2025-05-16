import path from "path";
import { execa } from "execa";
import fs from "fs/promises";

export const installDepNestjs = {
  runCommand: async (projectPath: string) => {
    const serverPath = path.join(projectPath, "server");

    console.log("🔧 Instalando dependências adicionais no backend...");

    try {
      // Instalar dependências
      await execa(
        "npm",
        [
          "install",
          "@nestjs/config",
          "class-validator",
          "class-transformer",
          //"@prisma/client",
        ],
        {
          cwd: serverPath,
          stdio: "inherit",
        }
      );

      await execa("npm", ["install", "-D", "prisma"], {
        cwd: serverPath,
        stdio: "inherit",
      });

      console.log("📦 Dependências instaladas");

      // Adicionar ValidationPipe ao main.ts
      const mainPath = path.join(serverPath, "src", "main.ts");
      let mainContent = await fs.readFile(mainPath, "utf-8");

      if (!mainContent.includes("ValidationPipe")) {
        mainContent = mainContent.replace(
          "from '@nestjs/core';",
          "from '@nestjs/core';\nimport { ValidationPipe } from '@nestjs/common';"
        );

        mainContent = mainContent.replace(
          "await app.listen(",
          "app.useGlobalPipes(new ValidationPipe());\n  await app.listen("
        );

        await fs.writeFile(mainPath, mainContent, "utf-8");
        console.log("✅ ValidationPipe adicionado ao main.ts");
      } else {
        console.log("ℹ️ ValidationPipe já presente no main.ts");
      }
    } catch (error) {
      console.error("❌ Erro ao customizar o backend NestJS:", error);
      throw error;
    }
  },
};
