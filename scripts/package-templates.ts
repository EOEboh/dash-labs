import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";

const templatesDir = path.join(__dirname, "..", "src", "templates");
const downloadsDir = path.join(__dirname, "..", "public", "downloads");

if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

const templates = fs.readdirSync(templatesDir);

templates.forEach((templateName) => {
  const inputDir = path.join(templatesDir, templateName);
  const outputZip = path.join(downloadsDir, `${templateName}.zip`);

  console.log(`📦 Zipping ${templateName}...`);

  const zip = new AdmZip();
  zip.addLocalFolder(inputDir);
  zip.writeZip(outputZip);

  console.log(`✅ Created: ${outputZip}`);
});
