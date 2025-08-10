import fs from "fs";
import path from "path";

const repo = process.env.GITHUB_REPOSITORY;
const tag = "v1.1.2";

const templatesDir = path.join(__dirname, "..", "apps", "templates");
const outputFile = path.join(
  __dirname,
  "..",
  "apps",
  "gallery",
  "public",
  "template-index.json"
);

const downloadBase = `https://github.com/${repo}/releases/download/${tag}`;

const templateNames = fs
  .readdirSync(templatesDir)
  .filter((name) => fs.statSync(path.join(templatesDir, name)).isDirectory());

const metadata = templateNames.map((slug) => {
  const templatePath = path.join(templatesDir, slug);
  const configPath = path.join(templatePath, "template.json");

  let config = {
    name: slug,
    slug,
    description: "No description provided.",
    category: "Uncategorized",
    prodLink: `https://${slug}.vercel.app`,
  };

  if (fs.existsSync(configPath)) {
    const content = fs.readFileSync(configPath, "utf-8");
    const parsed = JSON.parse(content);
    config = {
      ...config,
      ...parsed,
      slug,
    };
  }

  return {
    name: config.name,
    slug: config.slug,
    description: config.description,
    category: config.category,
    downloadLink: `${downloadBase}/${slug}.zip`,
    previewLink: config.prodLink,
    image: `/images/${slug}-preview.png`,
  };
});

// Ensure output directory exists
if (!fs.existsSync(path.dirname(outputFile))) {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
}

fs.writeFileSync(outputFile, JSON.stringify(metadata, null, 2));
console.log("✅ Created apps/gallery/public/template-index.json");
