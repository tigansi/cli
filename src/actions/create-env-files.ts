import path from "path";
import fs from "fs/promises";

export const createEnvFiles = {
  runCommand: async (projectPath: string) => {
    console.log("📄 Criando arquivos .env...");

    const envDevPath = path.join(projectPath, ".env.development");
    const envProdPath = path.join(projectPath, ".env.production");

    const envDevContent =
      `
VITE_APP_HOST_SERVER=
VITE_USER_ACESSO_HOMOL=
VITE_NOME_ACESSO_HOMOL=
VITE_EMAIL_ACESSO_HOMOL=
VITE_ID_WS=
    `.trim() + "\n";

    const envProdContent = ``; // pode incluir comentários, se desejar

    try {
      await fs.writeFile(envDevPath, envDevContent, "utf-8");
      await fs.writeFile(envProdPath, envProdContent, "utf-8");

      console.log("✅ Arquivos .env.development e .env.production criados");
    } catch (error) {
      console.error("❌ Erro ao criar arquivos .env:", error);
      throw error;
    }
  },
};
