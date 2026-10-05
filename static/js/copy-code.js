/**
 * Adds a "copy" button to every code block.
 * Works with Hugo's Chroma output (div.highlight > pre.chroma) and bare <pre>.
 */
document.addEventListener("DOMContentLoaded", () => {
  // Prefer the chroma wrapper; fall back to any <pre> not already handled.
  const blocks = new Set();
  document.querySelectorAll("div.highlight").forEach((el) => blocks.add(el));
  document.querySelectorAll("pre").forEach((pre) => {
    if (!pre.closest("div.highlight")) blocks.add(pre);
  });

  blocks.forEach((block) => {
    if (block.classList.contains("has-copy-btn")) return;
    block.classList.add("has-copy-btn");

    const btn = document.createElement("button");
    btn.className = "copy-code-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "Copy code");
    btn.innerHTML = '<i class="fa-regular fa-copy"></i>';

    btn.addEventListener("click", async () => {
      const codeEl = block.querySelector("code") || block.querySelector("pre") || block;
      const text = codeEl.innerText.replace(/\n$/, "");
      try {
        await navigator.clipboard.writeText(text);
      } catch (e) {
        // Fallback for older/insecure contexts
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (_) {}
        document.body.removeChild(ta);
      }
      btn.classList.add("copied");
      btn.innerHTML = '<i class="fa-solid fa-check"></i>';
      setTimeout(() => {
        btn.classList.remove("copied");
        btn.innerHTML = '<i class="fa-regular fa-copy"></i>';
      }, 1600);
    });

    block.appendChild(btn);
  });
});
