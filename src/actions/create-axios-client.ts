import path from "path";
import fs from "fs/promises";

export const createAxiosClient = {
  runCommand: async (projectPath: string) => {
    console.log(`📄 Criando apiService.ts...\n`);
    const apiServiceFile = path.join(
      projectPath,
      "src",
      "shared",
      "services",
      "apiService.ts"
    );

    const apiServiceFileContent = `import axios from "axios";
export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_HOST_SERVER,
});`;
    await fs.writeFile(apiServiceFile, apiServiceFileContent, "utf-8");
  },
};
