import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const SITE_DIR = process.cwd();
const REPO_ROOT = path.resolve(SITE_DIR, "..");
const DOCS_DIR = path.resolve(REPO_ROOT, "docs");

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

function slugifyHeading(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

md.core.ruler.push("collect_headings", (state) => {
  const env = state.env || {};
  if (!env.headings) env.headings = [];
  if (!env.slugCounts) env.slugCounts = new Map();

  for (let i = 0; i < state.tokens.length; i++) {
    const tok = state.tokens[i];
    if (tok.type !== "heading_open") continue;
    const level = Number(tok.tag.replace("h", ""));
    const inline = state.tokens[i + 1];
    let text = inline && inline.type === "inline" ? inline.content : "";
    if (!text) continue;

    // Support kramdown-style explicit heading IDs: "Title {#some-id}"
    const explicit = text.match(/^(.*?)\s*\{#([A-Za-z0-9_-]+)\}\s*$/);
    if (explicit) {
      text = explicit[1].trim();
      if (inline && inline.type === "inline") {
        inline.content = text;
        // Also update children tokens so rendered text doesn't include "{#...}"
        const Token = state.Token;
        const t = new Token("text", "", 0);
        t.content = text;
        inline.children = [t];
      }
      tok.attrSet("id", explicit[2]);
      if (level === 2 || level === 3) env.headings.push({ level, text, id: explicit[2] });
      continue;
    }

    const base = slugifyHeading(text) || "section";
    const count = (env.slugCounts.get(base) || 0) + 1;
    env.slugCounts.set(base, count);
    const id = count === 1 ? base : `${base}-${count}`;

    tok.attrSet("id", id);
    if (level === 2 || level === 3) {
      env.headings.push({ level, text, id });
    }
  }
});

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((n) => !n.startsWith("."))
    .map((n) => path.join(dir, n))
    .filter((p) => fs.statSync(p).isFile());
}

export function slugifyTag(tagName) {
  return String(tagName || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function preprocessJekyll(source) {
  // Replace a subset of Jekyll/Liquid includes we use.
  return String(source || "")
    // markdown-it does not parse markdown inside HTML blocks; strip our kramdown wrappers.
    .replace(/^\s*<section class="study-day"[^>]*>\s*$/gm, "")
    .replace(/^\s*<\/section>\s*$/gm, "")
    .replace(
    /\{\%\s*include\s+youtube\.html\s+id="([^"]+)"\s*\%\}/g,
    (_, id) =>
      `<div class="youtube"><iframe src="https://www.youtube.com/embed/${id}" title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe></div>`,
    );
}

function protectMathForMathJax(markdownSource) {
  // markdown-it will happily interpret `_` and `*` inside TeX as emphasis, which breaks MathJax.
  // We "protect" TeX regions by replacing them with placeholders *before* markdown-it runs,
  // then restore the original TeX delimiters in the final HTML output.
  const mathBlocks = [];
  const tokenFor = (i) => `@@MATH_${i}@@`;

  function isEscaped(s, idx) {
    // true if char at idx is escaped by an odd number of preceding backslashes
    let bs = 0;
    for (let i = idx - 1; i >= 0 && s[i] === "\\"; i--) bs++;
    return bs % 2 === 1;
  }

  function protectInText(s) {
    let out = "";
    let i = 0;
    let inCode = false; // inline code span using single backticks

    while (i < s.length) {
      const ch = s[i];

      if (ch === "`") {
        inCode = !inCode;
        out += ch;
        i++;
        continue;
      }
      if (inCode) {
        out += ch;
        i++;
        continue;
      }

      // Block math: $$ ... $$ (may span lines)
      if (ch === "$" && s[i + 1] === "$" && !isEscaped(s, i)) {
        let j = i + 2;
        while (j < s.length - 1) {
          if (s[j] === "$" && s[j + 1] === "$" && !isEscaped(s, j)) break;
          j++;
        }
        if (j < s.length - 1) {
          const raw = s.slice(i, j + 2);
          const idx = mathBlocks.push(raw) - 1;
          out += tokenFor(idx);
          i = j + 2;
          continue;
        }
      }

      // Inline math: $ ... $ (single-line)
      if (ch === "$" && s[i + 1] !== "$" && !isEscaped(s, i)) {
        let j = i + 1;
        let hitNewline = false;
        while (j < s.length) {
          if (s[j] === "\n") {
            hitNewline = true;
            break;
          }
          if (s[j] === "$" && s[j - 1] !== "$" && !isEscaped(s, j)) break;
          j++;
        }
        if (!hitNewline && j < s.length && s[j] === "$") {
          const raw = s.slice(i, j + 1);
          const idx = mathBlocks.push(raw) - 1;
          out += tokenFor(idx);
          i = j + 1;
          continue;
        }
      }

      out += ch;
      i++;
    }

    return out;
  }

  // Avoid touching fenced code blocks entirely.
  const lines = String(markdownSource || "").split("\n");
  const outLines = [];
  let buf = [];
  let inFence = false;

  function flush() {
    if (buf.length) {
      outLines.push(protectInText(buf.join("\n")));
      buf = [];
    }
  }

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      flush();
      inFence = !inFence;
      outLines.push(line);
      continue;
    }
    if (inFence) outLines.push(line);
    else buf.push(line);
  }
  flush();

  const protectedText = outLines.join("\n");
  const restore = (html) => {
    let s = String(html || "");
    for (let i = 0; i < mathBlocks.length; i++) {
      const tok = tokenFor(i);
      // Using split/join for Node compatibility across versions
      s = s.split(tok).join(mathBlocks[i]);
    }
    return s;
  };

  return { protectedText, restore, mathBlocksCount: mathBlocks.length };
}

function inlineifyStudyingDisplayMath(source) {
  // In the study journal notes, it's common to type `$$O(1)$$` or `$$A$$` inside a sentence.
  // MathJax always treats `$$...$$` as display math, so we convert *inline occurrences* to `\(...\)`.
  // We keep lines that are only `$$...$$` untouched (still display math), and skip fenced code blocks.
  const out = [];
  let inFence = false;
  for (const line of String(source || "").split("\n")) {
    const fence = line.match(/^\s*```/);
    if (fence) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    if (inFence || !line.includes("$$")) {
      out.push(line);
      continue;
    }

    const trimmed = line.trim();
    const isOnlyMath = /^\$\$[^$]+?\$\$$/.test(trimmed);
    if (isOnlyMath) {
      out.push(line);
      continue;
    }

    const replaced = line.replace(/\$\$([^\n$]+?)\$\$/g, (_m, inner) => {
      const expr = String(inner || "").trim();
      if (!expr) return _m;
      if (expr.length > 80) return _m;
      if (expr.includes("\\begin{") || expr.includes("\\\\")) return _m;
      return `\\\\(${expr}\\\\)`;
    });
    out.push(replaced);
  }
  return out.join("\n");
}

function wrapStudyingDays(html) {
  const s = String(html || "");
  const re = /<h3 id="d-[^"]+">[\s\S]*?<\/h3>/g;
  const matches = Array.from(s.matchAll(re));
  if (matches.length === 0) return s;

  let out = "";
  let cursor = 0;
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index ?? 0;
    const end = i + 1 < matches.length ? (matches[i + 1].index ?? s.length) : s.length;
    if (i === 0) out += s.slice(0, start);
    const chunk = s.slice(start, end).trim();
    out += `\n<section class="study-day">\n${chunk}\n</section>\n`;
    cursor = end;
  }
  if (cursor < s.length) out += s.slice(cursor);
  return out;
}

function stripHtmlTags(s) {
  return String(s || "").replace(/<[^>]*>/g, "");
}

function parseDurationToMinutes(s) {
  const str = String(s || "").trim();
  const h = str.match(/(\d+)\s*h\b/i);
  const m = str.match(/(\d+)\s*m\b/i);
  const hours = h ? Number(h[1]) : 0;
  const mins = m ? Number(m[1]) : 0;
  const total = hours * 60 + mins;
  return Number.isFinite(total) && total > 0 ? total : null;
}

function formatMinutes(totalMinutes) {
  const mins = Math.max(0, Math.round(Number(totalMinutes) || 0));
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

function computeStudyingTagTotals(preprocessedMarkdown) {
  const totals = new Map(); // tag -> minutes

  const lines = String(preprocessedMarkdown || "").split("\n");
  let curMinutes = null;
  let curTags = new Set();
  let inTags = false;

  function flush() {
    if (curMinutes && curTags.size) {
      for (const t of curTags) {
        totals.set(t, (totals.get(t) || 0) + curMinutes);
      }
    }
    curMinutes = null;
    curTags = new Set();
    inTags = false;
  }

  for (const line of lines) {
    const entry = line.match(/^\s*-\s+\*\*.*?\*\*\s+\(([^)]+)\):\s+/);
    if (entry) {
      flush();
      curMinutes = parseDurationToMinutes(entry[1]);
      continue;
    }

    if (/^\s{2}-\s+\*\*Tags\*\*\s*$/.test(line)) {
      inTags = true;
      continue;
    }

    if (inTags) {
      if (/^\s{2}-\s+\*\*/.test(line) || /^\s*-\s+\*\*/.test(line)) {
        inTags = false;
        continue;
      }
      const m = line.match(/#([A-Za-z0-9_-]+)/);
      if (m) {
        const t = slugifyTag(m[1]);
        if (t) curTags.add(t);
      }
    }
  }
  flush();

  return totals;
}

function makeTagIndexCollapsible(html, tagTotals) {
  let s = String(html || "");
  // Drop the redundant top "Tags" header + list-of-tags (keep the per-tag sections).
  // Matches:
  // <h2 id="tags">Tags</h2><ul>...<a href="#tag-...">...</a>...</ul>
  s = s.replace(/<h2 id="tags">Tags<\/h2>\s*<ul>[\s\S]*?<\/ul>/, "");
  // Stable anchor for jumping to the tag index from the homepage hero.
  s = s.replace(/<h3 id="tag-/, `<div id="tag-index"></div><h3 id="tag-`);

  // Transform:
  // <h3 id="tag-foo">#foo</h3><ul>...</ul>
  // into a <details> accordion while preserving the same anchor id.
  return s.replace(
    /<h3 id="(tag-[^"]+)">([\s\S]*?)<\/h3>\s*<ul>([\s\S]*?)<\/ul>/g,
    (_m, id, titleHtml, ulInner) => {
      const title = stripHtmlTags(titleHtml).trim() || id;
      const count = (ulInner.match(/<li>/g) || []).length;
      const tagSlug = String(id).replace(/^tag-/, "");
      const totalMinutes = tagTotals?.get?.(tagSlug) || 0;
      const totalLabel = formatMinutes(totalMinutes);
      return (
        `<details class="tagGroup" id="${id}">` +
        `<summary>` +
        `<span class="tagTitle">${title}</span>` +
        `<span class="tagMeta">` +
        `<span class="tagTotal">${totalLabel}</span>` +
        `<span class="tagCount">${count}</span>` +
        `</span>` +
        `</summary>` +
        `<ul>${ulInner}</ul>` +
        `</details>`
      );
    },
  );
}

function estimateReadingTimeMinutes(markdownSource) {
  const s = String(markdownSource || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\$\$[\s\S]*?\$\$/g, " ")
    .replace(/\$[^$]+\$/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = s ? s.split(" ").length : 0;
  return Math.max(1, Math.round(words / 220));
}

function renderMarkdown(source) {
  const env = { headings: [], slugCounts: new Map() };
  const pre = preprocessJekyll(source);
  const { protectedText, restore } = protectMathForMathJax(pre);
  const html = restore(md.render(protectedText, env));
  return {
    html,
    toc: Array.isArray(env.headings) ? env.headings : [],
    readingTimeMinutes: estimateReadingTimeMinutes(pre),
    preprocessed: pre,
  };
}

function parsePostSlugFromFilename(filename) {
  const name = filename.replace(/\.md$/i, "");
  const parts = name.split("-");
  if (parts.length < 4) return null;
  return parts.slice(3).join("-");
}

function parseIsoDate(s) {
  const normalized =
    s instanceof Date
      ? s.toISOString().slice(0, 10)
      : typeof s === "number"
        ? new Date(s).toISOString().slice(0, 10)
        : String(s || "");
  const m = normalized.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  return { year: m[1], month: m[2], day: m[3] };
}

export function getRepoPaths() {
  return {
    repoRoot: REPO_ROOT,
    docsDir: DOCS_DIR,
    postsDir: path.join(DOCS_DIR, "_posts"),
    tagsDir: path.join(DOCS_DIR, "_tags"),
    pagesDir: DOCS_DIR,
  };
}

export function loadTagDefinitions() {
  const { tagsDir } = getRepoPaths();
  const out = new Map(); // slug -> { slug, name, permalink }
  for (const f of listFiles(tagsDir).filter((p) => p.endsWith(".md"))) {
    const raw = fs.readFileSync(f, "utf8");
    const fm = matter(raw);
    const name = fm.data.tag || path.basename(f, ".md");
    const slug = slugifyTag(name);
    const permalink = fm.data.permalink || `/tags/${slug}/`;
    out.set(slug, { slug, name, permalink });
  }
  return out;
}

export function loadPosts() {
  const { postsDir } = getRepoPaths();
  const posts = [];
  for (const f of listFiles(postsDir).filter((p) => p.endsWith(".md"))) {
    const raw = fs.readFileSync(f, "utf8");
    const fm = matter(raw);

    const slug = parsePostSlugFromFilename(path.basename(f));
    const dateParts = parseIsoDate(fm.data.date);
    if (!slug || !dateParts) continue;

    const tagsRaw = Array.isArray(fm.data.tags) ? fm.data.tags : [];
    const tags = tagsRaw.map((t) => String(t));
    const tagSlugs = tags.map(slugifyTag).filter(Boolean);

    const url = `/${dateParts.year}/${dateParts.month}/${dateParts.day}/${slug}.html`;
    const rendered = renderMarkdown(fm.content);

    posts.push({
      sourcePath: f,
      url,
      slug,
      ...dateParts,
      title: String(fm.data.title || slug),
      subtitle: fm.data.subtitle ? String(fm.data.subtitle) : "",
      description: fm.data.description ? String(fm.data.description) : "",
      mathjax: Boolean(fm.data.mathjax),
      comments: fm.data.comments !== false && Boolean(fm.data.comments),
      tags,
      tagSlugs,
      html: rendered.html,
      toc: rendered.toc,
      readingTimeMinutes: rendered.readingTimeMinutes,
      dateISO:
        fm.data.date instanceof Date
          ? fm.data.date.toISOString().slice(0, 10)
          : String(fm.data.date),
    });
  }

  posts.sort((a, b) => String(b.dateISO).localeCompare(String(a.dateISO)));
  return posts;
}

export function loadPageByPermalink(permalinkNoTrailing) {
  const { pagesDir } = getRepoPaths();
  const candidates = listFiles(pagesDir).filter((p) => p.endsWith(".md"));

  const matches = [];
  for (const f of candidates) {
    if (f.includes(`${path.sep}.ipynb_checkpoints${path.sep}`)) continue;
    const raw = fs.readFileSync(f, "utf8");
    const fm = matter(raw);
    const pl = String(fm.data.permalink || "").trim();
    if (!pl) continue;
    const noTrailing = pl.endsWith("/") && pl !== "/" ? pl.slice(0, -1) : pl;
    if (noTrailing === permalinkNoTrailing) {
      matches.push({ f, fm, pl });
    }
  }

  if (matches.length === 0) return null;

  // If multiple files claim the same permalink, prefer the one whose filename matches the permalink.
  // Example: /Studying -> Studying.md (not Coursework.md).
  const expectedName = `${permalinkNoTrailing.replace(/^\//, "")}.md`.toLowerCase();
  const preferred =
    matches.find((m) => path.basename(m.f).toLowerCase() === expectedName) || matches[0];

  const isStudying = path.basename(preferred.f).toLowerCase() === "studying.md";
  const pageMarkdown = isStudying
    ? inlineifyStudyingDisplayMath(preferred.fm.content)
    : preferred.fm.content;
  const rendered = renderMarkdown(pageMarkdown);
  const tagTotals = isStudying ? computeStudyingTagTotals(rendered.preprocessed) : null;
  return {
    sourcePath: preferred.f,
    title: String(preferred.fm.data.title || ""),
    permalink: preferred.pl,
    html: isStudying
      ? wrapStudyingDays(makeTagIndexCollapsible(rendered.html, tagTotals))
      : rendered.html,
    toc: rendered.toc,
  };
}

