---
title: "Setting Up ADALM-M2K Without Root Permissions"
description: "Configure Linux systems to use ADALM-M2K and Scopy without sudo privileges"
tags: ["scopy", "m2k", "linux", "udev", "usb"]
date: "2024-12-24"
author: "Alisa Dariana"
slug: "analogdevices-scopy-setup"
disclaimer: "ADALM-M2K and Scopy are trademarks of Analog Devices, Inc. This tutorial is user-contributed content and is not affiliated with Analog Devices."
---

# Setting Up ADALM-M2K Without Root Permissions

The ADALM-M2K device requires specific USB permissions to operate without sudo privileges. This guide outlines the necessary system configuration steps.

For official documentation and support, visit Analog Devices' official documentation.

## Prerequisites

- ADALM-M2K device
- Linux system
- Scopy installed via Flatpak

## Steps

### 1. Find Device IDs

To list all USB devices and locate the M2K:

```bash
lsusb
```

The output should contain a line similar to:

```bash
Bus 002 Device 004: ID 0456:b673 Analog Devices, Inc.
```

The important values are:

- Vendor ID: 0456
- Product ID: b673

### 2. Create udev Rule

Create a new rule file with:

```bash
sudo nano /etc/udev/rules.d/99-adi-m2k.rules
```

Insert the following line in the file:

```bash
SUBSYSTEM=="usb", ATTR{idVendor}=="0456", ATTR{idProduct}=="b673", MODE="0666", GROUP="plugdev"
```

### 3. Apply Changes

Reload the rules and set permissions:

```bash
sudo udevadm control --reload-rules
sudo udevadm trigger
sudo usermod -aG plugdev $USER
```

A system logout and login is required for the changes to take effect.

### 4. Verify Setup

Start Scopy using:

```bash
flatpak run org.adi.Scopy
```

The M2K device should now be accessible without sudo privileges.
