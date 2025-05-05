#!/usr/bin/env node
import { createVite } from "./utils/create-vite.js";
import { installDep } from "./utils/install-dep.js";
import { createFolders } from "./utils/create-folders.js";
import { createRoutesReact } from "./utils/create-routes-react.js";
import { updateTsconfig } from "./utils/update-tsconfig.js";
import { updateViteConfig } from "./utils/update-vite-config.js";
import { updateAppTsx } from "./utils/update-app-tsx.js";
import { updateHtml } from "./utils/update-html.js";
async function main() {
    const projectName = await createVite.runCommand();
    const projectPath = await installDep.runCommand(projectName);
    await createFolders.runCommand(projectPath);
    await createRoutesReact.runCommand(projectPath);
    await updateTsconfig.runCommand(projectPath);
    await updateViteConfig.runCommand(projectPath);
    await updateAppTsx.runCommand(projectPath);
    await updateHtml.runCommand(projectPath, projectName);
    console.log(`✅ Projeto ${projectName} criado com sucesso!`);
    console.log(`\n👉 cd ${projectName}`);
    console.log(`👉 npm run dev\n`);
}
main().catch((err) => {
    console.error("❌ Erro ao criar o projeto:", err);
    process.exit(1);
});
