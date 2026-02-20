import fs from "node:fs";
import path from "node:path";

const SITE_DIR = process.cwd();
const REPO_ROOT = path.resolve(SITE_DIR, "..");
const DOCS_DIR = path.resolve(REPO_ROOT, "docs");
const STUDYING_DIR = path.resolve(DOCS_DIR, "studying");

function listJsonFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((n) => n.toLowerCase().endsWith(".json"))
    .map((n) => path.join(dir, n))
    .filter((p) => fs.statSync(p).isFile());
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function slugifyTag(tagName) {
  return String(tagName || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function toMdDate(dateISO) {
  const m = String(dateISO || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const yy = m[1].slice(-2);
  const mo = String(Number(m[2]));
  const d = String(Number(m[3]));
  return `${mo}/${d}/${yy}`;
}

function dayIdFromMdDate(mdDate) {
  return `d-${String(mdDate).trim().replace(/\s+/g, "").replace(/\//g, "-")}`;
}

function parseLocalStamp(stamp) {
  // YYYY-MM-DDTHH:MM (local, no timezone)
  const m = String(stamp || "").match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
  if (!m) return null;
  return {
    y: Number(m[1]),
    mo: Number(m[2]),
    d: Number(m[3]),
    hh: Number(m[4]),
    mm: Number(m[5]),
  };
}

function formatTime12h({ hh, mm }) {
  let h = Number(hh);
  const m = pad2(mm);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${ampm}`;
}

function formatMinutes(totalMinutes) {
  const mins = Math.max(0, Math.round(Number(totalMinutes) || 0));
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

function inlineifyDisplayMathInText(s) {
  // Convert inline `$$O(1)$$` in a sentence to `\(...\)` so it stays inline.
  // Keep standalone `$$...$$` lines as display math.
  const str = String(s || "");
  if (!str.includes("$$")) return str;
  const trimmed = str.trim();
  const isOnlyMath = /^\$\$[^$]+?\$\$$/.test(trimmed);
  if (isOnlyMath) return str;
  return str.replace(/\$\$([^\n$]+?)\$\$/g, (_m, inner) => {
    const expr = String(inner || "").trim();
    if (!expr) return _m;
    if (expr.length > 80) return _m;
    if (expr.includes("\\begin{") || expr.includes("\\\\")) return _m;
    return `\\(${expr}\\)`;
  });
}

function computeDurationMinutes(session) {
  const provided = Number(session?.durationMinutes);
  if (Number.isFinite(provided) && provided > 0) return Math.round(provided);
  const s = parseLocalStamp(session?.start);
  const e = parseLocalStamp(session?.end);
  if (!s || !e) return 0;
  // treat as same-day local; good enough for our use
  const start = new Date(s.y, s.mo - 1, s.d, s.hh, s.mm, 0, 0).getTime();
  const end = new Date(e.y, e.mo - 1, e.d, e.hh, e.mm, 0, 0).getTime();
  const mins = Math.max(0, Math.round((end - start) / 60_000));
  return mins;
}

export function loadStudyJournalDays() {
  const files = listJsonFiles(STUDYING_DIR);
  const days = [];

  for (const f of files) {
    const raw = fs.readFileSync(f, "utf8");
    let obj;
    try {
      obj = JSON.parse(raw);
    } catch {
      continue;
    }

    const dateISO = String(obj?.date || "").trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateISO)) continue;

    const mdDate = toMdDate(dateISO);
    const dayId = mdDate ? dayIdFromMdDate(mdDate) : dateISO;

    const sessionsRaw = Array.isArray(obj?.sessions) ? obj.sessions : [];
    const sessions = sessionsRaw
      .map((s) => {
        const startP = parseLocalStamp(s?.start);
        const endP = parseLocalStamp(s?.end);
        const durationMinutes = computeDurationMinutes(s);
        const tags = Array.isArray(s?.tags) ? s.tags.map(slugifyTag).filter(Boolean) : [];
        return {
          start: String(s?.start || "").trim(),
          end: String(s?.end || "").trim(),
          startLabel: startP ? formatTime12h(startP) : "",
          endLabel: endP ? formatTime12h(endP) : "",
          durationMinutes,
          durationLabel: formatMinutes(durationMinutes),
          description: String(s?.description || "").trim(),
          tags,
          sources: Array.isArray(s?.sources) ? s.sources.map((x) => String(x).trim()).filter(Boolean) : [],
          notes: Array.isArray(s?.notes)
            ? s.notes.map((x) => inlineifyDisplayMathInText(String(x).trim())).filter(Boolean)
            : [],
          screenshots: Array.isArray(s?.screenshots)
            ? s.screenshots.map((x) => String(x).trim()).filter(Boolean)
            : [],
        };
      })
      .sort((a, b) => String(b.end).localeCompare(String(a.end)));

    days.push({
      dateISO,
      mdDate: mdDate || dateISO,
      id: dayId,
      sessions,
    });
  }

  // newest date first
  days.sort((a, b) => String(b.dateISO).localeCompare(String(a.dateISO)));
  return days;
}

export function computeStudyTagIndex(days) {
  const tagToDates = new Map(); // tag -> Set(dateISO)
  const tagTotals = new Map(); // tag -> minutes

  for (const d of days) {
    for (const s of d.sessions) {
      const mins = Number(s.durationMinutes) || 0;
      for (const t of s.tags || []) {
        tagTotals.set(t, (tagTotals.get(t) || 0) + mins);
        const set = tagToDates.get(t) || new Set();
        set.add(d.dateISO);
        tagToDates.set(t, set);
      }
    }
  }

  const tags = Array.from(tagToDates.keys()).sort((a, b) => a.localeCompare(b));
  const entries = tags.map((tag) => {
    const dateSet = tagToDates.get(tag) || new Set();
    const dateISOs = Array.from(dateSet).sort((a, b) => String(b).localeCompare(String(a)));
    return {
      tag,
      id: `tag-${tag}`,
      totalMinutes: tagTotals.get(tag) || 0,
      totalLabel: formatMinutes(tagTotals.get(tag) || 0),
      dayCount: dateISOs.length,
      dateISOs,
    };
  });

  return { tags: entries };
}

