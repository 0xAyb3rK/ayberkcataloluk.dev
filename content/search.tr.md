---
title: "[~] $ grep -r"
type: "page"
hideTitle: false
---

<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<div id="search" class="pagefind-search"></div>
<script src="/pagefind/pagefind-ui.js"></script>
<script>
  window.addEventListener("DOMContentLoaded", () => {
    if (window.PagefindUI) {
      new PagefindUI({ element: "#search", showImages: false, showSubResults: true, translations: { placeholder: "Sitede ara..." } });
    } else {
      document.getElementById("search").innerHTML =
        "<p style='font-family:var(--rev-mono-font);opacity:.7'>Arama indeksi deploy sırasında oluşturulur — canlı sitede çalışır.</p>";
    }
  });
</script>
