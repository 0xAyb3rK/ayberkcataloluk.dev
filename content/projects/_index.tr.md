---
title: "[~] $ ls ./projeler"
---

<p class="section-intro">// Malware analizi, tersine mühendislik ve tehdit istihbaratı öğrenirken geliştirdiğim araçlar ve araştırmalar.</p>

<div class="projects-grid">

  <div class="project-card">
    <div class="project-card__head">
      <h3 class="project-card__title"><span class="prompt">❯</span> TorScraper</h3>
      <span class="project-card__lang">Go</span>
    </div>
    <p class="project-card__desc">
      <code>.onion</code> servislerinden veri toplamayı otomatikleştiren bir Siber Tehdit İstihbaratı (CTI) aracı. Tüm trafiği Tor ağı üzerinden anonim olarak yönlendirir; tam sayfa ekran görüntüsü alır, çevrimdışı analiz için ham HTML'i yedekler ve worker-pool deseniyle birden fazla hedefi eş zamanlı tarar.
    </p>
    <div class="project-card__tags">
      <span>Golang</span><span>Tor / SOCKS5</span><span>chromedp</span><span>CTI</span><span>YAML hedefler</span>
    </div>
    <div class="project-card__links">
      <a class="primary" href="https://github.com/0xAyb3rK/TorScraper" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Kaynak</a>
    </div>
  </div>

  <div class="project-card">
    <div class="project-card__head">
      <h3 class="project-card__title"><span class="prompt">❯</span> go-web-scraper</h3>
      <span class="project-card__lang">Go</span>
    </div>
    <p class="project-card__desc">
      Go ile yazılmış basit, platform bağımsız bir CLI web kazıyıcı. Sayfa HTML'ini indirip saklar, bağlantıları bir metin dosyasına çıkarır ve <code>chromedp</code> üzerinden gerçek bir Chromium tabanlı tarayıcıyla tam sayfa ekran görüntüsü alır — işletim sistemleri arasında otomatik tarayıcı keşfiyle.
    </p>
    <div class="project-card__tags">
      <span>Golang</span><span>chromedp</span><span>CLI</span><span>Ekran görüntüsü</span>
    </div>
    <div class="project-card__links">
      <a class="primary" href="https://github.com/0xAyb3rK/go-web-scraper" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Kaynak</a>
    </div>
  </div>

  <div class="project-card">
    <div class="project-card__head">
      <h3 class="project-card__title"><span class="prompt">❯</span> BlossCraft Analizi</h3>
      <span class="project-card__lang lang-report">Rapor</span>
    </div>
    <p class="project-card__desc">
      Sahte bir oyun launcher'ı kılığına girmiş, Electron tabanlı bir infostealer olan <strong>BlossCraft</strong>'ın tam teknik analizi. NSIS kurulumunu, şifreli <code>app.asar</code> JavaScript payload'unu (AES-256-GCM + XOR), Discord ve tarayıcı kimlik bilgisi hırsızlığını ve Python ikinci aşama stealer'ını kapsar — YARA kuralları ve MITRE ATT&CK eşlemesiyle birlikte.
    </p>
    <div class="project-card__tags">
      <span>Malware Analizi</span><span>Tersine Mühendislik</span><span>Electron</span><span>YARA</span><span>MITRE ATT&CK</span>
    </div>
    <div class="project-card__links">
      <a class="primary" href="https://github.com/0xAyb3rK/BlossCraft-Electron-Malware-Analysis" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Depo</a>
      <a href="/tr/posts/blosscraft-electron-stealer/">Yazıyı oku →</a>
    </div>
  </div>

</div>
