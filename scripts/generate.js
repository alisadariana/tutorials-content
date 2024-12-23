const fs = require("fs").promises;
const path = require("path");
const matter = require("gray-matter");

async function generateMeta() {
  const tutorialsDir = path.join(__dirname, "..", "tutorials");
  const tutorials = [];

  async function processDirectory(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else if (entry.name.endsWith(".md")) {
        const content = await fs.readFile(fullPath, "utf8");
        const { data } = matter(content);

        if (!data.title || !data.description || !data.date || !data.slug) {
          console.warn(`Warning: Missing required frontmatter in ${fullPath}`);
          continue;
        }

        tutorials.push({
          ...data,
          category: path.relative(tutorialsDir, dir),
          path: path.relative(tutorialsDir, fullPath),
        });
      }
    }
  }

  await processDirectory(tutorialsDir);

  // Sort by date, newest first
  tutorials.sort((a, b) => new Date(b.date) - new Date(a.date));

  await fs.writeFile(
    path.join(__dirname, "..", "meta.json"),
    JSON.stringify({ tutorials }, null, 2)
  );
}

generateMeta().catch(console.error);
