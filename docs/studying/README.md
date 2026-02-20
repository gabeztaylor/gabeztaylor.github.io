## Studying journal data (source of truth)

This directory stores the public study journal as structured data so the website can render it directly (no Markdown scraping).

### File layout

- **One file per day**: `YYYY-MM-DD.json`
- Each file contains all sessions for that day.

### JSON shape

```json
{
  "date": "2026-02-20",
  "sessions": [
    {
      "start": "2026-02-20T07:14",
      "end": "2026-02-20T08:08",
      "durationMinutes": 54,
      "description": "clues by sam and dailyintegral logic puzzle",
      "tags": ["puzzle"],
      "sources": ["https://cluesbysam.com/", "https://dailyintegral.com/"],
      "notes": [],
      "screenshots": ["/assets/study-journal/<filename>.png"]
    }
  ]
}
```

Notes:

- `start` / `end` are **local timestamps** in `YYYY-MM-DDTHH:MM` (no timezone suffix).
- `tags` are stored as normalized slugs (no leading `#`).
