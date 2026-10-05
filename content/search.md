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
      new PagefindUI({ element: "#search", showImages: false, showSubResults: true });
    } else {
      document.getElementById("search").innerHTML =
        "<p style='font-family:var(--rev-mono-font);opacity:.7'>Search index is built at deploy time — it works on the live site.</p>";
    }
  });
</script>
