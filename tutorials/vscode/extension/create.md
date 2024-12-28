---
title: "Creating a VS Code Extension"
description: "Learn how to build a VS Code extension from scratch with TypeScript"
tags: ["vscode", "extension", "typescript", "development"]
date: "2024-12-28"
author: "Multiple Authors"
slug: "vscode-extension-create"
---

# Creating a VS Code Extension

This guide walks through creating a VS Code extension from initial setup to testing and deployment.

## Prerequisites

- Node.js (v14.x or higher)
- Visual Studio Code
- Basic TypeScript knowledge
- Git (optional, but recommended)
- npm or yarn package manager

## Steps

### 1. Set Up Development Environment

First, install required global dependencies:

```bash
# Install Yeoman and VS Code Extension Generator
npm install -g yo generator-code

# Verify installations
yo --version
```

### 2. Generate Extension Scaffold

Create the extension project:

```bash
# Create and navigate to project directory
mkdir my-extension
cd my-extension

# Run the generator
yo code

# Select options:
# - New Extension (TypeScript)
# - Name the extension
# - Identifier: my-extension
# - Description
# - Initialize git repository? Yes
# - Bundler: esbuild (recommended for best performance)
# - Package manager: npm
```

### 3. Understand Project Structure

Key files and their purposes:

```plaintext
my-extension/
├── .vscode/             # VS Code settings
├── src/                 # Source files
│   └── extension.ts     # Main extension code
├── .gitignore          # Git ignore rules
├── package.json        # Extension manifest
├── README.md           # Documentation
└── tsconfig.json       # TypeScript config
```

### 4. Configure Extension Manifest

Edit package.json to define extension capabilities:

```json
{
  "name": "my-extension",
  "displayName": "My Extension",
  "description": "Extension description",
  "version": "0.0.1",
  "engines": {
    "vscode": "^1.85.0"
  },
  "categories": ["Other"],
  "activationEvents": ["onStartupFinished"],
  "main": "./dist/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "my-extension.helloWorld",
        "title": "Hello World"
      }
    ]
  }
}
```

### 5. Implement Basic Functionality

Create the extension's main logic in src/extension.ts:

```typescript
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("Extension is now active");

  // Register a command
  let disposable = vscode.commands.registerCommand(
    "my-extension.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello from Extension!");
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
```

### 6. Add Development Scripts

Ensure these scripts are in package.json:

```json
{
  "scripts": {
    "vscode:prepublish": "npm run package",
    "compile": "webpack",
    "watch": "webpack --watch",
    "package": "webpack --mode production --devtool hidden-source-map",
    "compile-tests": "tsc -p . --outDir out",
    "watch-tests": "tsc -p . -w --outDir out",
    "pretest": "npm run compile-tests && npm run compile && npm run lint",
    "lint": "eslint src --ext ts",
    "test": "node ./out/test/runTest.js"
  }
}
```

### 7. Write Basic Tests

Create tests in src/test/suite/extension.test.ts:

```typescript
import * as assert from "assert";
import * as vscode from "vscode";

suite("Extension Test Suite", () => {
  test("Command Registration", async () => {
    // Verify command exists
    const commands = await vscode.commands.getCommands();
    assert.ok(commands.includes("my-extension.helloWorld"));
  });
});
```

## Next Steps

1. Check the generated `vsc-extension-quickstart.md` file in the project root for detailed instructions on:

   - Running the extension
   - Modifying the extension
   - Debugging
   - Testing
   - Publishing

2. Important Note:
   - After installing the recommended extensions from `vsc-extension-quickstart.md`
   - Close and reopen VS Code completely for the extensions to take effect
   - This step is crucial for proper development environment setup

## Troubleshooting

### Command Not Found

- Check command ID in package.json matches extension.ts
- Verify extension is activated
- Check Debug Console for errors

### Build Errors

- Run `npm install` to ensure dependencies are installed
- Check TypeScript version compatibility
- Verify tsconfig.json settings

### Extension Not Loading

- Check activationEvents in package.json
- Verify main entry point path
- Check VS Code version compatibility

### Common TypeScript Errors

- Ensure @types/vscode is installed
- Check VS Code API version matches
- Verify strict mode settings in tsconfig.json

For more information:

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
