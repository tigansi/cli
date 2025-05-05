import fs from "fs/promises";
import path from "path";

export const createRoutesReact = {
  runCommand: async (projectPath: string) => {
    console.log(`📄 Criando AppRoutes.tsx...\n`);
    const routesFile = path.join(projectPath, "src", "routes", "AppRoutes.tsx");
    const routesContent = `import React from "react";
    import { Routes } from "react-router-dom";
    
    export const AppRoutes: React.FC = () => {
      return (
        <div>
          <Routes>
            {/* Suas rotas aqui */}
          </Routes>
        </div>
      );
    };`;
    await fs.writeFile(routesFile, routesContent, "utf-8");
  },
};
