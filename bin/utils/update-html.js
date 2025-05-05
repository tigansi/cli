import path from "path";
import fs from "fs/promises";
export const updateHtml = {
    runCommand: async (projectPath, projectName) => {
        console.log("📝 Atualizando título do index.html...");
        const htmlPath = path.join(projectPath, "index.html");
        try {
            const htmlContent = await fs.readFile(htmlPath, "utf-8");
            const updatedContent = htmlContent.replace(/<title>(.*?)<\/title>/, `<title>${projectName}</title>`);
            await fs.writeFile(htmlPath, updatedContent, "utf-8");
            console.log(`✅ Título atualizado para "${projectName}"`);
        }
        catch (error) {
            console.error("❌ Erro ao atualizar o index.html:", error);
            throw error;
        }
    },
};
