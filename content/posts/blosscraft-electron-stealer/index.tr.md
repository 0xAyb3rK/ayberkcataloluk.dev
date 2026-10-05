---
title: "BlossCraft'ı Parçalara Ayırmak: Electron Tabanlı Bir Infostealer"
date: 2026-10-01
draft: false
description: "BlossCraft'ın teknik incelemesi — NSIS kurulumu, şifreli bir app.asar payload'u ve Python ikinci aşamasının arkasına gizlenmiş, sahte bir oyun launcher'ı kılığındaki Electron/Node.js infostealer'ı."
Cover: "https://raw.githubusercontent.com/0xAyb3rK/BlossCraft-Electron-Malware-Analysis/main/images/banner.png"
CoverCaption: "BlossCraft — Electron tabanlı stealer teknik analizi"
images:
  - "https://raw.githubusercontent.com/0xAyb3rK/BlossCraft-Electron-Malware-Analysis/main/images/banner.png"
toc: true
tags:
  - malware-analizi
  - tersine-muhendislik
  - electron
  - infostealer
categories:
  - blog
---

> **Yasal Uyarı:** Bu araştırma yalnızca zararlı yazılım analizi, tersine mühendislik ve eğitim amaçlıdır. Tüm örnekler izole bir laboratuvar ortamında analiz edilmiştir.

## Özet

**BlossCraft**, popüler indie oyunları, oyun hilelerini, beta sürümlerini veya yama dosyalarını taklit ederek yayılan sahte bir oyun / launcher uygulamasıdır. Tek bir `.exe` gibi görünür; ancak çalışma anında tam bir **Electron** yığınını (Chromium, V8, Node.js) geçici dizinlere çıkarır ve bir `app.asar` arşivi içindeki JavaScript tabanlı **information stealer**'ı çalıştırır.

Bu yazı, analizin kısa bir turudur. Statik analiz, dinamik analiz, YARA kuralları ve MITRE ATT&CK eşlemesini içeren tam raporlar [GitHub deposunda](https://github.com/0xAyb3rK/BlossCraft-Electron-Malware-Analysis) bulunuyor.

## Enfeksiyon zinciri

```text
BlossCraft-Launcher.exe (NSIS)
    │
    ▼
App-64.7z Çıkarımı (nsis7z.dll)
    │
    ▼
Launcher.exe (Electron)
    │
    ▼
app.asar → crypted.js
    │
    ▼
AES-256-GCM + XOR Şifre Çözme (Bellek İçinde)
    │
    ├──► Discord Token Hırsızlığı / Injection
    ├──► Tarayıcı Anahtarı Çıkarımı (PowerShell + DPAPI)
    ├──► Oturum Hırsızı (Steam, Epic, Riot, Roblox...)
    ├──► Wi-Fi Şifreleri / Ekran Görüntüsü / Webcam
    └──► Python Kurulumu + browser.py (Base64 + zlib + marshal)
                    │
                    ▼
            Tarayıcı Verisi (output.zip) ──► Discord Webhook
```

## Nasıl gizleniyor

Tehdit aktörleri, her şeyi meşru bir oyun kurulumu *gibi görünen* tek bir yürütülebilir dosyada paketlemek için **NSIS (Nullsoft Scriptable Install System)** kullanmış. Dosya çalıştırıldığında kullanıcı normal bir kurulum akışı görürken, arka planda Electron tabanlı infostealer devreye giriyor.

Ana payload **native kod değil**. `app.asar` içinde yaşayan, Electron/Node.js'in sunduğu dosya sistemi, ağ, süreç ve işletim sistemi etkileşim yeteneklerini kötüye kullanan JavaScript. Kritik mantık `crypted.js` olarak dağıtılıyor ve yalnızca bir **AES-256-GCM + XOR** şifre çözme adımından sonra **bellekte** okunabilir hale geliyor — bu da diskteki arşivin basit statik analizini etkisiz kılıyor.

## Neleri çalıyor

Şifresi çözüldüğünde JavaScript geniş bir hırsızlık rutinini yönetiyor:

- **Discord** — token hırsızlığı ve istemci injection'ı
- **Tarayıcılar** — PowerShell + DPAPI ile anahtar çıkarımı; ardından bir Python yardımcısı (`browser.py`) toplanan veriyi `output.zip` içine paketliyor
- **Oyun oturumları** — Steam, Epic Games, Riot Games, Roblox ve daha fazlası
- **Sistem** — kayıtlı Wi-Fi şifreleri, ekran görüntüleri ve webcam yakalama

Dışarı sızdırma, normal HTTPS trafiğine karışan ucuz ve tek kullanımlık bir kanal olan **Discord webhook** üzerinden yapılıyor. Python aşaması ise analistleri yavaşlatmak için **Base64 + zlib + marshal** ile gizlenmiş durumda.

## Neden önemli

Bu mimari BlossCraft'a özgü **değil**. Aynı Electron/Node.js + JavaScript deseni — çoğu zaman meşru görünen bir oyun/uygulama kurulumunun arkasına gizlenmek için NSIS'e sarılmış halde — *ScarfaceStealer, SrryStealer, TamperedChef, Iluria, Wave Stealer, MicroStealer* ve *Astration* gibi varyantlarda da raporlanmıştır. BlossCraft, Electron ekosistemini kötüye kullanan modern infostealer ailesinin büyüyen bir varyasyonu olarak değerlendirilebilir.

## Tam rapor

Detaylı statik/dinamik analiz, IOC'ler, YARA kuralları ve MITRE ATT&CK eşlemesi her iki dilde de mevcut:

- **[Türkçe rapor](https://github.com/0xAyb3rK/BlossCraft-Electron-Malware-Analysis/blob/main/reports/blosscraft-electron-malware-analysis-tr.md)**
- **[İngilizce rapor](https://github.com/0xAyb3rK/BlossCraft-Electron-Malware-Analysis/blob/main/reports/blosscraft-electron-malware-analysis-en.md)**

*Analiz: [Ayberk Çataloluk](https://github.com/0xAyb3rK) ve [Yavuzhan](https://github.com/Yavuzhanzgen).*
