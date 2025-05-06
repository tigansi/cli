import path from "path";
import fs from "fs/promises";

export const updateViteConfig = {
  runCommand: async (projectPath: string) => {
    console.log(`⚙️ Atualizando vite.config.ts...\n`);
    const viteConfigPath = path.join(projectPath, "vite.config.ts");
    const viteConfig = `import { defineConfig } from "vite";
        import react from "@vitejs/plugin-react-swc";
        import path from "path";
        
        export default defineConfig({
          plugins: [react()],
          resolve: {
            alias: {
              "@": path.resolve(__dirname, "src"),
            },
          },
        });
        `;
    await fs.writeFile(viteConfigPath, viteConfig, "utf-8");
  },
};
