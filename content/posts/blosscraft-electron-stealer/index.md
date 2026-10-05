---
title: "Dissecting BlossCraft: An Electron-Based Infostealer"
date: 2026-10-01
draft: false
description: "A technical breakdown of BlossCraft — a fake game launcher that hides an Electron/Node.js infostealer behind an NSIS installer, an encrypted app.asar payload, and a Python second stage."
Cover: "https://raw.githubusercontent.com/0xAyb3rK/BlossCraft-Electron-Malware-Analysis/main/images/banner.png"
CoverCaption: "BlossCraft — Electron-based stealer technical analysis"
images:
  - "https://raw.githubusercontent.com/0xAyb3rK/BlossCraft-Electron-Malware-Analysis/main/images/banner.png"
toc: true
tags:
  - malware-analysis
  - reverse-engineering
  - electron
  - infostealer
categories:
  - blog
---

> **Disclaimer:** This research is for malware analysis, reverse engineering and educational purposes only. All samples were analyzed inside an isolated lab environment.

## TL;DR

**BlossCraft** is a fake game / launcher application that spreads by impersonating popular indie games, game cheats, beta builds or patch files. It looks like a single `.exe`, but at runtime it unpacks a full **Electron** stack (Chromium, V8, Node.js) into temporary directories and runs a JavaScript-based **information stealer** from inside an `app.asar` archive.

This write-up is a condensed tour of the analysis. The full reports — static analysis, dynamic analysis, YARA rules and MITRE ATT&CK mapping — live in the [GitHub repository](https://github.com/0xAyb3rK/BlossCraft-Electron-Malware-Analysis).

## Infection chain

```text
BlossCraft-Launcher.exe (NSIS)
    │
    ▼
App-64.7z Extraction (nsis7z.dll)
    │
    ▼
Launcher.exe (Electron)
    │
    ▼
app.asar → crypted.js
    │
    ▼
AES-256-GCM + XOR Decryption (In-Memory)
    │
    ├──► Discord Token Theft / Injection
    ├──► Browser Key Extraction (PowerShell + DPAPI)
    ├──► Session Stealer (Steam, Epic, Riot, Roblox...)
    ├──► Wi-Fi Passwords / Screenshot / Webcam
    └──► Python Setup + browser.py (Base64 + zlib + marshal)
                    │
                    ▼
            Browser Data (output.zip) ──► Discord Webhook
```

## How it stays hidden

The threat actors used **NSIS (Nullsoft Scriptable Install System)** to wrap everything into one executable that *looks* like a legitimate game installer. When it runs, the user sees a normal setup flow — while in the background the Electron-based infostealer is deployed.

The main payload is **not** native code. It is JavaScript living inside `app.asar`, which abuses the file-system, networking, process and OS-interaction capabilities that Electron/Node.js provide. The critical logic is shipped as `crypted.js` and only becomes readable **in memory** after an **AES-256-GCM + XOR** decryption step — defeating naive static analysis of the archive on disk.

## What it steals

Once decrypted, the JavaScript orchestrates a broad theft routine:

- **Discord** — token theft and client injection
- **Browsers** — key extraction via PowerShell + DPAPI, then a Python helper (`browser.py`) packs the collected data into `output.zip`
- **Game sessions** — Steam, Epic Games, Riot Games, Roblox and more
- **System** — saved Wi-Fi passwords, screenshots, and webcam capture

Exfiltration is done over a **Discord webhook** — a cheap, disposable channel that blends into normal HTTPS traffic. The Python stage is itself obfuscated with **Base64 + zlib + marshal** to slow down analysts.

## Why it matters

This architecture is **not** unique to BlossCraft. The same Electron/Node.js + JavaScript pattern — often wrapped in NSIS to hide behind a legitimate-looking game or app install — has been reported in variants such as *ScarfaceStealer, SrryStealer, TamperedChef, Iluria, Wave Stealer, MicroStealer* and *Astration*. BlossCraft is best understood as one more variation on a growing family of modern infostealers that abuse the Electron ecosystem.

## Full report

The detailed static/dynamic analysis, IOCs, YARA rules and MITRE ATT&CK mapping are available in both languages:

- **[English report](https://github.com/0xAyb3rK/BlossCraft-Electron-Malware-Analysis/blob/main/reports/blosscraft-electron-malware-analysis-en.md)**
- **[Turkish report](https://github.com/0xAyb3rK/BlossCraft-Electron-Malware-Analysis/blob/main/reports/blosscraft-electron-malware-analysis-tr.md)**

*Analysis by [Ayberk Çataloluk](https://github.com/0xAyb3rK) and [Yavuzhan](https://github.com/Yavuzhanzgen).*
