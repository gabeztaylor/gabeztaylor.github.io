import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = "/Users/gabrieltaylor/Desktop/gabeztaylor.github.io";
const DOCS_DIR = path.join(REPO_ROOT, "docs");
const POSTS_DIR = path.join(DOCS_DIR, "_posts");
const TAGS_DIR = path.join(DOCS_DIR, "_tags");

function readText(p) {
  return fs.readFileSync(p, "utf8");
}

function listFiles(dir, filterFn) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((n) => !n.startsWith("."))
    .map((n) => path.join(dir, n))
    .filter((p) => fs.statSync(p).isFile())
    .filter((p) => (filterFn ? filterFn(p) : true));
}

function parseFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { data: {}, body: md };
  const raw = m[1];
  const data = {};
  for (const line of raw.split("\n")) {
    // ultra-light YAML: "key: value" lines only (enough for our use)
    const mm = line.match(/^([A-Za-z0-9_]+):\s*(.*?)\s*$/);
    if (!mm) continue;
    const key = mm[1];
    const val = mm[2];
    data[key] = val;
  }
  return { data, body: md.slice(m[0].length) };
}

function normalizeTrailing(url) {
  if (url === "/") return { noSlash: "/", slash: "/" };
  const noSlash = url.endsWith("/") ? url.slice(0, -1) : url;
  const slash = url.endsWith("/") ? url : url + "/";
  return { noSlash, slash };
}

function parsePostUrlFromFile(filePath) {
  const base = path.basename(filePath);
  const name = base.replace(/\.md$/i, "");
  const parts = name.split("-");
  if (parts.length < 4) return null;
  const slug = parts.slice(3).join("-");

  const { data } = parseFrontmatter(readText(filePath));
  const date = (data.date || "").trim();
  const dm = date.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!dm) return null;
  const year = dm[1];
  const month = dm[2];
  const day = dm[3];
  return `/${year}/${month}/${day}/${slug}.html`;
}

function parsePermalinkFromFile(filePath) {
  const { data } = parseFrontmatter(readText(filePath));
  const permalink = (data.permalink || "").trim();
  return permalink || null;
}

function buildParity() {
  const urls = new Set();

  // Home
  urls.add("/");

  // Pages in docs root (About/Studying/Fighting/etc.)
  for (const f of listFiles(DOCS_DIR, (p) => p.endsWith(".md"))) {
    // ignore checkpoints
    if (f.includes(`${path.sep}.ipynb_checkpoints${path.sep}`)) continue;
    const pl = parsePermalinkFromFile(f);
    if (!pl) continue;
    const { noSlash, slash } = normalizeTrailing(pl);
    urls.add(noSlash);
    urls.add(slash);
  }

  // Tag pages
  for (const f of listFiles(TAGS_DIR, (p) => p.endsWith(".md"))) {
    const pl = parsePermalinkFromFile(f);
    if (!pl) continue;
    const { noSlash, slash } = normalizeTrailing(pl);
    urls.add(noSlash);
    urls.add(slash);
  }

  // Posts
  for (const f of listFiles(POSTS_DIR, (p) => p.endsWith(".md"))) {
    const u = parsePostUrlFromFile(f);
    if (u) urls.add(u);
  }

  return Array.from(urls).sort((a, b) => a.localeCompare(b));
}

const parity = {
  generatedAt: new Date().toISOString(),
  source: "docs/ Jekyll frontmatter",
  urls: buildParity(),
};

if (process.argv.includes("--write")) {
  const outPath = path.join(REPO_ROOT, "url-parity.json");
  fs.writeFileSync(outPath, JSON.stringify(parity, null, 2) + "\n", "utf8");
  console.log(`Wrote ${outPath}`);
} else {
  process.stdout.write(JSON.stringify(parity, null, 2));
}

