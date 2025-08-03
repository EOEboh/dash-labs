import fs from "fs";
import path from "path";

const repo = process.env.GITHUB_REPOSITORY;
const ref = process.env.GITHUB_REF ?? "refs/tags/dev"; // default to dev if not set
const tag = ref.split("/").pop(); // e.g. v1.0.0

const templatesDir = path.join(__dirname, "..", "src", "templates");
const downloadBase = `https://github.com/${repo}/releases/download/${tag}`;
const outputFile = path.join(__dirname, "..", "public", "template-index.json");

const templateNames = fs
  .readdirSync(templatesDir)
  .filter((name) => fs.statSync(path.join(templatesDir, name)).isDirectory());

const metadata = templateNames.map((name) => ({
  name,
  downloadLink: `${downloadBase}/${name}.zip`,
}));

fs.writeFileSync(outputFile, JSON.stringify(metadata, null, 2));
console.log("✅ Created public/template-index.json");
