#!/usr/bin/env node

import { createVite } from "./actions/create-vite";
import { installDep } from "./actions/install-dep";
import { createFolders } from "./actions/create-folders";
import { createRoutesReact } from "./actions/create-routes-react";
import { updateTsconfig } from "./actions/update-tsconfig";
import { updateViteConfig } from "./actions/update-vite-config";
import { updateAppTsx } from "./actions/update-app-tsx";
import { updateHtml } from "./actions/update-html";
import { createEnvFiles } from "./actions/create-env-files";
import { updatePackageJson } from "./actions/update-packgejson";
import { createServerNest } from "./actions/create-server-nest";
import { installDepNestjs } from "./actions/install-dep-nestjs";
import { createAxiosClient } from "./actions/create-axios-client";

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
