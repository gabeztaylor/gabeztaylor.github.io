## Anki export (public)

This directory contains **exported snapshots** of my local Anki decks for the website to render.

GitHub Pages cannot access my local Anki database directly, so a local exporter (via AnkiConnect) writes JSON here and then commits/pushes it.

### Files

- `master-deck.json`: export of the top-level deck **Master Deck** (including subdecks), excluding suspended cards.
- Media (images referenced by cards) are exported to `site/public/assets/anki-media/` and referenced as `/assets/anki-media/<filename>`.

