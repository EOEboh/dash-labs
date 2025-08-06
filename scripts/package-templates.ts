// scripts/package-templates.ts
import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";

const templatesDir = path.join(__dirname, "..", "apps", "templates");
const downloadsDir = path.join(
  __dirname,
  "..",
  "apps",
  "gallery",
  "public",
  "downloads"
);

if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

const templates = fs
  .readdirSync(templatesDir)
  .filter((name) => fs.statSync(path.join(templatesDir, name)).isDirectory());

templates.forEach((templateName) => {
  const inputDir = path.join(templatesDir, templateName);
  const outputZip = path.join(downloadsDir, `${templateName}.zip`);

  console.log(`📦 Zipping ${templateName}...`);
  const zip = new AdmZip();
  zip.addLocalFolder(inputDir);
  zip.writeZip(outputZip);
  console.log(` Created: ${outputZip}`);
});
