// lib/templates.ts
import fs from "fs";
import path from "path";

export type Template = {
  name: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  previewLink: string;
  downloadLink: string;
};

export function getTemplates(): Template[] {
  try {
    const filePath = path.join(process.cwd(), "public", "template-index.json");
    const fileContents = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContents);
  } catch (err) {
    console.warn("⚠️ Could not load template-index.json:", err);
    return []; // Safe fallback
  }
}
