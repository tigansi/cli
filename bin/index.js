#!/usr/bin/env node
import { createVite } from "./actions/create-vite.js";
import { installDep } from "./actions/install-dep.js";
import { createFolders } from "./actions/create-folders.js";
import { createRoutesReact } from "./actions/create-routes-react.js";
import { updateTsconfig } from "./actions/update-tsconfig.js";
import { updateViteConfig } from "./actions/update-vite-config.js";
import { updateAppTsx } from "./actions/update-app-tsx.js";
import { updateHtml } from "./actions/update-html.js";
import { createEnvFiles } from "./actions/create-env-files.js";
import { updatePackageJson } from "./actions/update-packgejson.js";
import { createServerNest } from "./actions/create-server-nest.js";
import { installDepNestjs } from "./actions/install-dep-nestjs.js";
import { createAxiosClient } from "./actions/create-axios-client.js";
async function main() {
    const projectName = await createVite.runCommand();
    const projectPath = await installDep.runCommand(projectName);
    await createFolders.runCommand(projectPath);
    await createRoutesReact.runCommand(projectPath);
    await updateTsconfig.runCommand(projectPath);
    await updateViteConfig.runCommand(projectPath);
    await updateAppTsx.runCommand(projectPath);
    await updateHtml.runCommand(projectPath, projectName);
    await createEnvFiles.runCommand(projectPath);
    await createAxiosClient.runCommand(projectPath);
    await updatePackageJson.runCommand(projectPath);
    await createServerNest.runCommand(projectPath);
    await installDepNestjs.runCommand(projectPath);
    console.log(`✅ Projeto ${projectName} criado com sucesso!`);
    console.log(`\n👉 cd ${projectName}`);
    console.log(`👉 npm run dev\n`);
}
main().catch((err) => {
    console.error("❌ Erro ao criar o projeto:", err);
    process.exit(1);
});
