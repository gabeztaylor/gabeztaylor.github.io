import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve(process.cwd(), "dist");

function walk(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function rmDirIfEmpty(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir);
  if (entries.length === 0) fs.rmdirSync(dir);
}

if (!fs.existsSync(distDir)) {
  console.error(`dist not found at ${distDir}`);
  process.exit(1);
}

const files = walk(distDir);
const targets = files.filter((p) => p.endsWith(`${path.sep}index.html`) && p.includes(".html" + path.sep));

let rewritten = 0;
for (const indexPath of targets) {
  // Example:
  // dist/2025/01/15/Gittins.html/index.html  -> dist/2025/01/15/Gittins.html
  const htmlDir = path.dirname(indexPath);
  const htmlFilePath = htmlDir; // the directory name ends with ".html"
  if (!htmlFilePath.endsWith(".html")) continue;

  const content = fs.readFileSync(indexPath);
  // Remove the directory wrapper (and its index.html), then write a real .html file.
  fs.rmSync(htmlDir, { recursive: true, force: true });
  fs.writeFileSync(htmlFilePath, content);

  rewritten++;
}

console.log(`postbuild: rewrote ${rewritten} legacy .html routes`);

