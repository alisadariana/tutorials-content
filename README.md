# Tutorial Content Repository

This repository contains markdown files for tutorials displayed on my [page](https://alisadariana.github.io/).

## Repository Structure

```
tutorials/
  ├── basics/
  │   ├── start.md
  │   └── setup.md
  ├── advanced/
  │   └── optimize.md
  └── ...
scripts/
  ├── generate.js
  └── validate.js
meta.json    # Generated metadata about all tutorials
```

## Tutorial File Requirements

### File Location and Slug Format

The location of your markdown file in the directory structure determines its slug. For example:

- File path: `tutorials/basics/start.md`
  - Corresponding slug: `basics-start`
- File path: `tutorials/advanced/optimize.md`
  - Corresponding slug: `advanced-optimize`

### Required Frontmatter

Each tutorial must begin with YAML frontmatter containing the following fields:

```md
---
title: "Your Tutorial Title"
description: "A brief description of the tutorial (1-2 sentences)"
tags: ["tag1", "tag2"]
date: "YYYY-MM-DD"
author: "Your Name"
slug: "category-name" # Must match the file path format
---
```

### Frontmatter Rules

- `title`: Clear and concise title
- `description`: 1-2 sentence summary
- `tags`: Array of relevant keywords
- `date`: ISO format (YYYY-MM-DD)
- `author`: Your full name
- `slug`: Must match the file path with categories separated by hyphens

## Adding a New Tutorial

1. Choose the appropriate category directory under `tutorials/` or create a new one
2. Create your markdown file with a simple verb as the name
3. Ensure the slug matches the file path format
4. Write your content using markdown
5. Run validation before submitting:
   ```bash
   npm run validate
   ```

## Development Scripts

```bash
# Validate all tutorials
npm run validate

# Generate meta.json
npm run generate
```

## Writing Guidelines

- Use proper markdown syntax
- Include code examples where relevant
- Add images in the appropriate directory
- Keep the frontmatter complete and accurate
- Use simple verbs for filenames
- Avoid hyphens in directory and file names

## Validation

The validation script checks:

- Presence of all required frontmatter fields
- Date format validity
- Slug format and correspondence with file path
- Tags array validity

## Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Run validation
5. Submit a pull request
