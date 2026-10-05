---
title: "[~] $ ls ./projects"
---

<p class="section-intro">// Tools and research I build while learning malware analysis, reverse engineering and threat intelligence.</p>

<div class="projects-grid">

  <div class="project-card">
    <div class="project-card__head">
      <h3 class="project-card__title"><span class="prompt">❯</span> TorScraper</h3>
      <span class="project-card__lang">Go</span>
    </div>
    <p class="project-card__desc">
      A Cyber Threat Intelligence tool that automates data collection from <code>.onion</code> services, routing all traffic anonymously through the Tor network. It captures full-page screenshots, backs up raw HTML for offline analysis, and scans multiple targets concurrently using a worker-pool pattern.
    </p>
    <div class="project-card__tags">
      <span>Golang</span><span>Tor / SOCKS5</span><span>chromedp</span><span>CTI</span><span>YAML targets</span>
    </div>
    <div class="project-card__links">
      <a class="primary" href="https://github.com/0xAyb3rK/TorScraper" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Source</a>
    </div>
  </div>

  <div class="project-card">
    <div class="project-card__head">
      <h3 class="project-card__title"><span class="prompt">❯</span> go-web-scraper</h3>
      <span class="project-card__lang">Go</span>
    </div>
    <p class="project-card__desc">
      A simple cross-platform CLI web scraper written in Go. It downloads and stores page HTML, extracts links to a text file, and takes a full-page screenshot using a real Chromium-based browser via <code>chromedp</code> — with automatic browser discovery across operating systems.
    </p>
    <div class="project-card__tags">
      <span>Golang</span><span>chromedp</span><span>CLI</span><span>Screenshots</span>
    </div>
    <div class="project-card__links">
      <a class="primary" href="https://github.com/0xAyb3rK/go-web-scraper" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Source</a>
    </div>
  </div>

  <div class="project-card">
    <div class="project-card__head">
      <h3 class="project-card__title"><span class="prompt">❯</span> BlossCraft Analysis</h3>
      <span class="project-card__lang lang-report">Report</span>
    </div>
    <p class="project-card__desc">
      A full technical analysis of <strong>BlossCraft</strong>, an Electron-based infostealer disguised as a fake game launcher. Covers the NSIS installer, the encrypted <code>app.asar</code> JavaScript payload (AES-256-GCM + XOR), Discord & browser credential theft, and the Python second-stage stealer — complete with YARA rules and MITRE ATT&CK mapping.
    </p>
    <div class="project-card__tags">
      <span>Malware Analysis</span><span>Reverse Engineering</span><span>Electron</span><span>YARA</span><span>MITRE ATT&CK</span>
    </div>
    <div class="project-card__links">
      <a class="primary" href="https://github.com/0xAyb3rK/BlossCraft-Electron-Malware-Analysis" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Repository</a>
      <a href="/posts/blosscraft-electron-stealer/">Read write-up →</a>
    </div>
  </div>

</div>
