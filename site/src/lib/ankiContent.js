import fs from "node:fs";
import path from "node:path";

const SITE_DIR = process.cwd();
const REPO_ROOT = path.resolve(SITE_DIR, "..");
const DOCS_DIR = path.resolve(REPO_ROOT, "docs");
const ANKI_EXPORT_PATH = path.resolve(DOCS_DIR, "anki", "master-deck.json");

export function loadAnkiMasterDeck() {
  if (!fs.existsSync(ANKI_EXPORT_PATH)) {
    return { ok: false, error: "Anki export not found.", exportPath: ANKI_EXPORT_PATH };
  }
  try {
    const raw = fs.readFileSync(ANKI_EXPORT_PATH, "utf8");
    const obj = JSON.parse(raw);
    if (!obj || !Array.isArray(obj.cards)) {
      return { ok: false, error: "Invalid export format.", exportPath: ANKI_EXPORT_PATH };
    }
    return { ok: true, exportPath: ANKI_EXPORT_PATH, data: obj };
  } catch (e) {
    return { ok: false, error: String(e?.message || e), exportPath: ANKI_EXPORT_PATH };
  }
}

export function groupCardsByDeck(cards) {
  const byDeck = new Map(); // deckName -> cards[]
  for (const c of cards || []) {
    const deck = String(c.deckName || "Unknown");
    const arr = byDeck.get(deck) || [];
    arr.push(c);
    byDeck.set(deck, arr);
  }
  // stable sort decks alphabetically, with root first if present
  const decks = Array.from(byDeck.keys()).sort((a, b) => a.localeCompare(b));
  return decks.map((deckName) => ({
    deckName,
    cards: (byDeck.get(deckName) || []).slice().sort((a, b) => String(a.frontText || "").localeCompare(String(b.frontText || ""))),
  }));
}

export function countStates(cards) {
  const counts = new Map();
  for (const c of cards || []) {
    const s = String(c.state || "Unknown");
    counts.set(s, (counts.get(s) || 0) + 1);
  }
  return counts;
}

