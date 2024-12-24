---
title: "Managing Multiple Git Accounts Using SSH"
description: "Configure and manage multiple Git accounts securely using SSH keys"
tags: ["git", "ssh", "vscode", "development"]
date: "2024-12-24"
author: "Alisa Dariana"
slug: "git-account-manage"
---

# Managing Multiple Git Accounts Using SSH

This guide explains how to manage multiple Git accounts (e.g., personal and work) using SSH keys and integrate them with Visual Studio Code.

## Prerequisites

- Git installed
- Visual Studio Code
- Access to multiple Git accounts
- Terminal access

## Steps

### 1. Generate SSH Keys

Generate unique SSH keys for each account:

```bash
# Personal account
ssh-keygen -t ed25519 -C "personal@example.com" -f ~/.ssh/personal
# Work account
ssh-keygen -t ed25519 -C "work@example.com" -f ~/.ssh/work
```

### 2. Add SSH Keys to SSH Agent

Start the SSH agent and add your keys:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/personal
ssh-add ~/.ssh/work
```

### 3. Configure SSH Config File

Create or edit ~/.ssh/config:

```bash
# Personal GitHub account
Host github.com-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/personal
    AddKeysToAgent yes

# Work GitHub account
Host github.com-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/work
    AddKeysToAgent yes
```

### 4. Add Public Keys to Git Accounts

Copy the public keys:

```bash
cat ~/.ssh/personal.pub  # Copy for personal account
cat ~/.ssh/work.pub     # Copy for work account
```

Add these keys to their respective Git accounts through the web interface:

1. Go to Settings > SSH and GPG keys
2. Click "New SSH key"
3. Paste the public key content

### 5. Configure Git Repositories

For existing repositories:

```bash
# Personal project
git remote set-url origin git@github.com-personal:username/repo.git

# Work project
git remote set-url origin git@github.com-work:organization/repo.git
```

For new repositories:

```bash
# Personal project
git clone git@github.com-personal:username/repo.git

# Work project
git clone git@github.com-work:organization/repo.git
```

### 6. Configure Local Git Settings

Set repository-specific configurations:

```bash
# Personal repository
git config user.name "Personal Name"
git config user.email "personal@example.com"

# Work repository
git config user.name "Work Name"
git config user.email "work@example.com"
```

### 7. VS Code Integration

1. Install the "Git Lens" extension for enhanced Git functionality
2. Configure workspace settings (`.vscode/settings.json`):

```json
{
  "git.useConfigOnly": true,
  "git.path": "/usr/bin/git",
  "git.enableSmartCommit": true,
  "git.confirmSync": false
}
```

3. Set up project-specific settings:
   - Open Command Palette (Ctrl+Shift+P)
   - Search for "Preferences: Open Workspace Settings"
   - Add Git configurations for the specific workspace

### Verification

Test the setup:

```bash
# Test personal account
ssh -T git@github.com-personal

# Test work account
ssh -T git@github.com-work
```

Successful configuration will show authentication messages from GitHub.

## Troubleshooting

### Permission Denied

- Ensure SSH agent is running: `eval "$(ssh-agent -s)"`
- Verify keys are added: `ssh-add -l`
- Check key permissions: `chmod 600 ~/.ssh/config`

### Wrong Account Used

- Verify remote URL: `git remote -v`
- Check local git config: `git config --list`
- Ensure correct SSH host in remote URL

### VS Code Issues

- Reload VS Code after configuration changes
- Check Git extension settings
- Verify Git path in VS Code settings

For official documentation and support, visit GitHub's SSH documentation.
