# Ordelo prototype

A front-end-only SaaS prototype for Northline Apparel, built with plain HTML, CSS and JavaScript so it can run without a build step or backend.

## Run it

Open `index.html` in a browser, or serve the folder with any static server:

```bash
python -m http.server 5173
```

Then visit `http://localhost:5173`.

## What works

- Responsive app shell with Inbox, Orders, Customers and Agent Desk.
- Six conversations across Messenger, Instagram, WhatsApp, TikTok and Website.
- Channel filtering, Take over / Back to AI, Done feedback, threaded messages and scripted replies.
- Scripted flow: navy linen shirt → size → saved address → `yes` creates an order; `wrong size` hands over to a teammate.
- Created orders appear in Orders with the originating channel.
- Order filtering, detail drawer, history and status progression.
- Customer profiles and plain-English AI rule publishing / rollback.

## What I would build next

Persist demo state in a small API, add real channel adapters and authentication, then add richer catalog search and analytics.

## Structure

- `data.js` — all demo data in one place.
- `app.js` — browser state, rendering and interaction rules.
- `styles.css` — responsive visual system.
