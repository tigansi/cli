import path from "path";
import fs from "fs/promises";
import { parse, stringify } from "comment-json";
export const updateTsconfig = {
    /** Método que atualiza o tsconfig.app.json **/
    runCommand: async (projectPath) => {
        console.log(`⚙️ Atualizando tsconfig.app.json...\n`);
        const tsconfigPath = path.join(projectPath, "tsconfig.app.json");
        const tsconfigRaw = await fs.readFile(tsconfigPath, "utf-8");
        const parsed = parse(tsconfigRaw);
        if (!parsed || typeof parsed !== "object") {
            throw new Error("❌ Falha ao parsear o tsconfig.app.json");
        }
        const tsconfig = parsed;
        tsconfig.compilerOptions = {
            ...(tsconfig.compilerOptions || {}),
            baseUrl: "./src",
            paths: {
                "@/*": ["./*"],
            },
        };
        await fs.writeFile(tsconfigPath, stringify(tsconfig, null, 2), "utf-8");
    },
};
