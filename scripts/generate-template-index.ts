import fs from "fs";
import path from "path";

const repo = process.env.GITHUB_REPOSITORY;
const ref = process.env.GITHUB_REF ?? "refs/tags/dev";
const tag = process.env.RELEASE_TAG ?? "dev"; // e.g. v1.0.0

// Update this line to match the Turborepo layout
const templatesDir = path.join(__dirname, "..", "apps", "templates");

const downloadBase = `https://github.com/${repo}/releases/download/${tag}`;
const outputFile = path.join(
  __dirname,
  "..",
  "apps",
  "gallery",
  "public",
  "template-index.json"
);

const templateNames = fs
  .readdirSync(templatesDir)
  .filter((name) => fs.statSync(path.join(templatesDir, name)).isDirectory());

const metadata = templateNames.map((name) => ({
  name,
  slug: name,
  downloadLink: `${downloadBase}/${name}.zip`,
  previewLink: `https://${name}.vercel.app`,
  image: `/images/${name}-preview.png`,
}));

// Ensure output directory exists
if (!fs.existsSync(path.dirname(outputFile))) {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
}

fs.writeFileSync(outputFile, JSON.stringify(metadata, null, 2));
console.log("✅ Created apps/gallery/public/template-index.json");
