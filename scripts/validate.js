const fs = require("fs").promises;
const path = require("path");
const matter = require("gray-matter");

async function validateTutorials() {
  const tutorialsDir = path.join(__dirname, "..", "tutorials");
  const errors = [];

  async function validateFile(filePath) {
    try {
      const content = await fs.readFile(filePath, "utf8");
      const { data } = matter(content);

      // Required frontmatter fields
      const requiredFields = [
        "title",
        "description",
        "tags",
        "date",
        "author",
        "slug",
      ];

      for (const field of requiredFields) {
        if (!data[field]) {
          errors.push(`Missing required field '${field}' in ${filePath}`);
        }
      }

      // Validate date format
      if (data.date && !isValidDate(data.date)) {
        errors.push(
          `Invalid date format in ${filePath}. Use YYYY-MM-DD format.`
        );
      }

      // Validate tags array
      if (data.tags && !Array.isArray(data.tags)) {
        errors.push(`Tags must be an array in ${filePath}`);
      }

      // Validate slug format and path correspondence
      if (data.slug) {
        if (!/^[a-z0-9-]+$/.test(data.slug)) {
          errors.push(
            `Invalid slug format in ${filePath}. Use only lowercase letters, numbers, and hyphens.`
          );
        }

        const relativePath = path
          .relative(tutorialsDir, filePath)
          .replace(/\\/g, "/")
          .replace(/\.md$/, "");
        const expectedSlug = relativePath.replace(/\//g, "-");

        if (data.slug !== expectedSlug) {
          errors.push(
            `Slug '${data.slug}' doesn't match the expected format based on file path. Expected: '${expectedSlug}'`
          );
        }
      }
    } catch (error) {
      errors.push(`Error processing ${filePath}: ${error.message}`);
    }
  }

  async function processDirectory(dir) {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          await processDirectory(fullPath);
        } else if (entry.name.endsWith(".md")) {
          await validateFile(fullPath);
        }
      }
    } catch (error) {
      errors.push(`Error reading directory ${dir}: ${error.message}`);
    }
  }

  function isValidDate(dateString) {
    const date = new Date(dateString);
    return (
      date instanceof Date &&
      !isNaN(date) &&
      /^\d{4}-\d{2}-\d{2}$/.test(dateString)
    );
  }

  try {
    await processDirectory(tutorialsDir);

    if (errors.length > 0) {
      console.error("Validation failed with the following errors:");
      errors.forEach((error) => console.error(`- ${error}`));
      process.exit(1);
    } else {
      console.log("All tutorials validated successfully!");
    }
  } catch (error) {
    console.error("Validation script failed:", error);
    process.exit(1);
  }
}

validateTutorials();
