---
title: "Installing and Setting Up Docker on Ubuntu 24.04"
description: "A comprehensive guide to installing Docker and setting up your development environment on Ubuntu 24.04"
tags: ["docker", "ubuntu", "installation", "development", "containers"]
date: "2024-12-28"
author: "Alisa-Dariana"
slug: "docker-setup"
---

# Installing and Setting Up Docker on Ubuntu 24.04

This guide walks through the complete process of installing Docker and configuring your development environment on Ubuntu 24.04 (Noble Numbat).

## Prerequisites

- Ubuntu 24.04 LTS installed
- Administrator (sudo) privileges
- Terminal access
- Active internet connection
- Basic command line knowledge
- Sufficient disk space (at least 2GB free)

## Steps

### 1. Prepare Your System

First, ensure any old Docker installations are removed:

```bash
# Remove legacy Docker versions
sudo apt remove docker docker-engine docker.io containerd runc
```

### 2. Install Dependencies

Install required system packages:

```bash
# Update package index
sudo apt update

# Install prerequisites
sudo apt install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

### 3. Configure Docker Repository

Set up Docker's official package repository:

```bash
# Create directory for keyrings
sudo install -m 0755 -d /etc/apt/keyrings

# Download and add Docker's GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set proper permissions
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add Docker repository
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  jammy stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### 4. Install Docker

Install the Docker packages:

```bash
# Update package index
sudo apt update

# Install Docker packages
sudo apt install -y \
    docker-ce \
    docker-ce-cli \
    containerd.io \
    docker-buildx-plugin \
    docker-compose-plugin
```

### 5. Configure User Permissions

Set up non-root access:

```bash
# Add current user to docker group
sudo usermod -aG docker $USER

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Apply group changes
newgrp docker
```

### 6. Configure Development Environment

Set up VS Code integration:

```bash
# Install VS Code Dev Containers extension via command line
code --install-extension ms-vscode-remote.remote-containers

# Test Docker installation
docker run hello-world
```

### 7. Configure Docker Settings

Create or modify Docker daemon configuration:

```bash
# Create daemon.json if it doesn't exist
sudo mkdir -p /etc/docker
sudo nano /etc/docker/daemon.json

# Add basic configuration
{
    "log-driver": "json-file",
    "log-opts": {
        "max-size": "10m",
        "max-file": "3"
    }
}
```

## Verification

Verify your Docker installation:

1. Check Docker version:

```bash
docker --version
```

2. Verify Docker service status:

```bash
sudo systemctl status docker
```

3. Test non-root access:

```bash
docker ps
```

4. Verify Docker Compose:

```bash
docker compose version
```

5. Test container functionality:

```bash
docker run hello-world
```

## Troubleshooting

### Permission Denied Errors

- Cause: User not in docker group
- Solution: Run `sudo usermod -aG docker $USER` and log out/in
- Prevention: Always verify group membership after installation

### Repository Configuration Fails

- Cause: GPG key or repository setup issues
- Solution: Verify key installation and repository configuration
- Prevention: Double-check commands and ensure proper internet connectivity

### Docker Service Won't Start

- Cause: System conflicts or configuration issues
- Solution: Check system logs with `journalctl -u docker.service`
- Prevention: Ensure clean removal of old Docker versions before installation

### VS Code Integration Issues

- Cause: Missing extensions or permissions
- Solution: Reinstall Dev Containers extension and verify Docker permissions
- Prevention: Follow installation steps in order and verify each step

### Container Network Issues

- Cause: Docker network configuration problems
- Solution: Restart Docker service and check network settings
- Prevention: Configure proper network settings in daemon.json

For more detailed information, consult the official Docker documentation or Ubuntu community resources.
