import path from "path";
import { execa } from "execa";

export const installDep = {
  runCommand: async (projectName: string) => {
    const projectPath = path.resolve(process.cwd(), projectName);

    console.log(`\n📁 Instalando dependências...\n`);
    await execa(
      "npm",
      [
        "install",
        "axios",
        "zod",
        "zustand",
        "react-router-dom",
        "@mui/material",
        "@emotion/react",
        "@emotion/styled",
        "@mui/icons-material",
        "@mui/styled-engine-sc",
        "styled-components",
      ],
      { cwd: projectPath, stdio: "inherit" }
    );

    await execa("npm", ["install", "-D", "@types/node"], {
      cwd: projectPath,
      stdio: "inherit",
    });

    return projectPath;
  },
};
