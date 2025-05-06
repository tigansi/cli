import path from "path";
import fs from "fs/promises";

export const updateAppTsx = {
  runCommand: async (projectPath: string) => {
    console.log("🎨 Personalizando estilos e estrutura do App...");

    // 1. Sobrescrever index.css
    const indexCssPath = path.join(projectPath, "src", "index.css");
    const indexCssContent = `
    @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
    
    * {
      font-family: "Poppins", sans-serif;
    }
    margin: 0
    padding: 0
        `.trim();

    await fs.writeFile(indexCssPath, indexCssContent, "utf-8");
    console.log("✅ index.css atualizado");

    // 2. Remover App.css
    const appCssPath = path.join(projectPath, "src", "App.css");
    try {
      await fs.unlink(appCssPath);
      console.log("🗑️ App.css removido");
    } catch (error: any) {
      if (error.code !== "ENOENT") throw error;
      console.warn("⚠️ App.css não encontrado para remoção");
    }

    // 3. Sobrescrever App.tsx
    const appTsxPath = path.join(projectPath, "src", "App.tsx");
    const appTsxContent = `
    import { BrowserRouter } from "react-router-dom";
    import "./App.css";
    import { AppRoutes } from "@/routes/AppRoutes";
    
    function App() {
      return (
        <>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </>
      );
    }
    
    export default App;
        `.trim();

    await fs.writeFile(appTsxPath, appTsxContent, "utf-8");
    console.log("✅ App.tsx atualizado");
  },
};
