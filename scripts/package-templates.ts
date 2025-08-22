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

// Files and directories to exclude from ZIP
const excludePatterns = [
  ".next",
  "node_modules",
  ".git",
  ".env.local",
  ".env.development.local",
  ".env.production.local",
  ".turbo",
  ".vercel",
  "coverage",
  "dist",
  ".DS_Store",
];

// Files that should NEVER be excluded (even if they match patterns)
const essentialFiles = [
  "package.json",
  "next.config.js",
  "next.config.mjs",
  "next.config.ts",
  "tailwind.config.js",
  "tailwind.config.ts",
  "postcss.config.js",
  "postcss.config.mjs",
  "tsconfig.json",
  ".gitignore",
  ".eslintrc.json",
  "eslint.config.js",
  "eslint.config.mjs",
];

function shouldExclude(filePath: string): boolean {
  const fileName = path.basename(filePath);

  // Never exclude essential files
  if (essentialFiles.includes(fileName)) {
    return false;
  }

  // Check for log files with proper pattern matching
  if (fileName.endsWith(".log")) {
    return true;
  }

  // Check other exclusion patterns
  return excludePatterns.some((pattern) => {
    if (pattern.includes("*")) {
      return fileName.includes(pattern.replace("*", ""));
    }
    return fileName === pattern;
  });
}

function generateReadme(templateName: string, templateDir: string): string {
  let packageJson: any = {};

  try {
    const packagePath = path.join(templateDir, "package.json");
    packageJson = JSON.parse(fs.readFileSync(packagePath, "utf-8"));
  } catch (error) {
    console.warn(`   ⚠️  Could not read package.json for ${templateName}`);
  }

  return `# ${packageJson.name || templateName}

${packageJson.description || "A Next.js template from our gallery"}

## Quick Start

1. **Extract this ZIP file** to your desired location
2. **Navigate to the folder**:
   \`\`\`bash
   cd ${templateName}
   \`\`\`

3. **Install dependencies**:
   \`\`\`bash
   npm install
   # or
   yarn install  
   # or
   pnpm install
   \`\`\`

4. **Run development server**:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or  
   pnpm dev
   \`\`\`

5. **Open your browser** to [http://localhost:3000](http://localhost:3000)

## What's Included

- ⚡ **Next.js ${packageJson.dependencies?.next || "15+"}** with App Router
- 🎨 **Tailwind CSS** for styling  
- 📘 **TypeScript** configuration
- 🧩 **Pre-built components** and layouts
- 🔧 **Development tools** and scripts

## Project Structure

\`\`\`
${templateName}/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # Reusable React components
│   │   ├── ui/          # Base UI components
│   │   └── ...
│   └── lib/             # Utility functions
├── public/              # Static assets
├── package.json         # Dependencies and scripts
├── next.config.js       # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
\`\`\`

## Key Features

${
  packageJson.dependencies
    ? Object.entries(packageJson.dependencies)
        .filter(([name]) =>
          [
            "@radix-ui",
            "@tanstack",
            "lucide-react",
            "recharts",
            "next-themes",
          ].some((key) => name.includes(key))
        )
        .slice(0, 5)
        .map(([name, version]) => `- **${name}**: ${version}`)
        .join("\n")
    : "- Modern React components\n- Responsive design\n- Dark/light mode support"
}

## Customization

- 📄 **Pages**: Modify files in \`src/app/\`
- 🧩 **Components**: Add new components in \`src/components/\`  
- 🎨 **Styles**: Update \`src/app/globals.css\`
- ⚙️ **Config**: Adjust \`tailwind.config.ts\` and \`next.config.js\`

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms
\`\`\`bash
npm run build
\`\`\`

Then upload the \`.next\` folder to your hosting provider.

## Support

- 📚 [Next.js Documentation](https://nextjs.org/docs)
- 🎨 [Tailwind CSS Docs](https://tailwindcss.com/docs)
- 🐛 [Report Issues](https://github.com/your-repo/issues)

---
**Template Version**: ${packageJson.version || "1.0.0"}  
**Generated**: ${new Date().toLocaleDateString()}
`;
}

// Main execution
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

const templates = fs
  .readdirSync(templatesDir)
  .filter((name) => fs.statSync(path.join(templatesDir, name)).isDirectory());

console.log(`📦 Found ${templates.length} template(s) to package...\n`);

templates.forEach((templateName) => {
  const inputDir = path.join(templatesDir, templateName);
  const outputZip = path.join(downloadsDir, `${templateName}.zip`);

  console.log(`📦 Processing ${templateName}...`);

  // Check for required structure
  const srcDir = path.join(inputDir, "src");
  const publicDir = path.join(inputDir, "public");
  const packageJson = path.join(inputDir, "package.json");

  if (!fs.existsSync(srcDir)) {
    console.log(`   ⚠️  Warning: No 'src' folder found`);
  } else {
    console.log(`   ✅ Found src/ directory`);
  }

  if (!fs.existsSync(publicDir)) {
    console.log(`   ⚠️  Warning: No 'public' folder found`);
  } else {
    console.log(`   ✅ Found public/ directory`);
  }

  if (!fs.existsSync(packageJson)) {
    console.log(`   ❌ Error: No package.json found - skipping`);
    return;
  } else {
    console.log(`   ✅ Found package.json`);
  }

  const zip = new AdmZip();

  // Add files recursively with exclusions
  function addDirectory(dirPath: string, basePath = "") {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const relativePath = path.join(basePath, item);

      if (shouldExclude(fullPath)) {
        continue;
      }

      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        addDirectory(fullPath, relativePath);
      } else {
        zip.addLocalFile(fullPath, basePath);
      }
    }
  }

  // Add all template files
  addDirectory(inputDir);

  // Generate and add README
  const readmeContent = generateReadme(templateName, inputDir);
  zip.addFile("README.md", Buffer.from(readmeContent, "utf8"));

  // Write ZIP file
  zip.writeZip(outputZip);

  // Show file size
  const stats = fs.statSync(outputZip);
  const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);

  console.log(
    `   ✅ Created: ${path.basename(outputZip)} (${fileSizeInMB} MB)`
  );
  console.log(`   📁 Location: ${outputZip}\n`);
});

console.log(`🎉 Successfully packaged ${templates.length} template(s)!`);
console.log(`📂 ZIP files available in: ${downloadsDir}`);
