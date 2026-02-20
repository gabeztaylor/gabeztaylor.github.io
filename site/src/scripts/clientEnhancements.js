import Prism from "prismjs";
import "prismjs/components/prism-python.js";
import "prismjs/components/prism-bash.js";
import "prismjs/components/prism-javascript.js";
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-json.js";
import "prismjs/components/prism-markdown.js";

function highlight() {
  try {
    Prism.highlightAll();
  } catch {
    // no-op
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", highlight, { once: true });
} else {
  highlight();
}

