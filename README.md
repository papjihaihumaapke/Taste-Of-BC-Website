# Taste of BC 2027 — Website (React)

React + Vite + React Router. Four-day, not-for-profit food, beverage & entertainment festival in Surrey, BC.

```
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # serve the build
```

## Pages (routes)
| Route | Page |
|---|---|
| `/` | Home (hero slideshow, highlights, countdown) |
| `/whats-on` | Festival overview: food, BC wine, entertainment, artists, family |
| `/food-and-drink` | Food & drink booths with menus, search and dietary filters |
| `/entertainment` | Stages and 4-day schedule |
| `/entertainers` | Apply to perform + entertainer sign in |
| `/coupons` | 20 × $1 coupon sheet, buy online |
| `/map` | Interactive festival map |
| `/visit` | Getting there, accessibility, tips |
| `/get-involved` | Vendor application + volunteer sign-up |
| `/sponsors` | Sponsorship opportunities and enquiry form |
| `/shop` | Merch and gift sheets |
| `/booklet` | Info booklet preview + ad rates |
| `/about` | About, FAQ, contact |
| `/checkout` → `/thank-you` | Demo Stripe redirect and order confirmation |
| `/legal` | Privacy, terms, refunds (template) |

## Editing content
Almost everything lives in **`src/data.js`**: dates (tentative **Aug 19–22, 2027** — set `datesConfirmed: true` once final), venue, hero slides, highlights, food booths and menus, products and the entertainment schedule.

Images go in `public/assets/img/`. Replace the hero slides with real festival photos when available.
Design tokens: `src/styles/tokens.css`. Styles: `src/styles/site.css`.

## Hosting
This uses client-side routing. On Netlify/Vercel, add a rewrite of all paths to `/index.html` (Vercel does this automatically for Vite; on Netlify add `public/_redirects` with `/* /index.html 200`).

## Before launch
- Confirm dates, venue, vendor lineup, performers, `$XX` sponsor rates and `[X]` refund days.
- Stripe: replace the demo redirect in `src/pages/Checkout.jsx` with a server endpoint that creates a Stripe Checkout Session.
- Forms (vendors, volunteers, entertainers, sponsors, contact, newsletter) validate and show success states only — connect them to email/CRM.
- Entertainer sign in needs a real authentication backend.
- Have the legal page reviewed by counsel.

`legacy-static/` holds the previous plain-HTML version for reference and can be deleted.
