#!/usr/bin/env node

import { createVite } from "./utils/create-vite";
import { installDep } from "./utils/install-dep";
import { createFolders } from "./utils/create-folders";
import { createRoutesReact } from "./utils/create-routes-react";
import { updateTsconfig } from "./utils/update-tsconfig";
import { updateViteConfig } from "./utils/update-vite-config";

async function main() {
  const projectName = await createVite.runCommand();
  const projectPath = await installDep.runCommand(projectName);

  await createFolders.runCommand(projectPath);
  await createRoutesReact.runCommand(projectPath);
  await updateTsconfig.runCommand(projectPath);
  await updateViteConfig.runCommand(projectPath);

  console.log(`✅ Projeto ${projectName} criado com sucesso!`);
  console.log(`\n👉 cd ${projectName}`);
  console.log(`👉 npm run dev\n`);
}

main().catch((err) => {
  console.error("❌ Erro ao criar o projeto:", err);
  process.exit(1);
});
