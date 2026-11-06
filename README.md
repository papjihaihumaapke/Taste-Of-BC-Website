# Taste of BC 2026 — Website

Static website (HTML/CSS/JS, no build step). Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Pages
| File | Page |
|---|---|
| `index.html` | Home |
| `coupons.html` | Food & drink coupons (20 × $1 sheet, buy online) |
| `restaurants.html` | Restaurants & menus (search + dietary filters) |
| `map.html` | Interactive festival map (gates, booths, facilities) |
| `booklet.html` | Info booklet preview + advertising rates |
| `visit.html` | Plan your visit, schedule, accessibility |
| `sponsors.html` | Sponsorship opportunities, packages, enquiry form |
| `shop.html` | Merch, product detail, gift sheets |
| `get-involved.html` | Vendor application + volunteer sign-up |
| `about.html` | About, FAQ, contact |
| `checkout.html` → `thank-you.html` | Stripe redirect screen and order confirmation |
| `legal.html` | Privacy, terms, refunds (template) |

## Editing content
Everything that changes often lives in **`assets/js/data.js`**:
- `event` — **dates (placeholder: Dec 12–13, 2026)**, hours, venue, address, contact
- `restaurants` — names, booth numbers, menus and coupon prices (placeholder lineup)
- `products` — shop items and prices
- `schedule` — stage programme

Design tokens (colours, type, spacing) are in `assets/css/tokens.css`.

## Before launch
- Replace placeholder dates, venue, restaurant lineup, `$XX` sponsor rates and `[X]` refund days.
- Stripe: replace the demo redirect in `checkout.html` with a server endpoint that creates a Stripe Checkout Session (see the comment in that file). Prices must be looked up server-side.
- Forms currently validate and show success states only — connect them to email/CRM (e.g. Formspree, HubSpot, or your own API).
- Have `legal.html` reviewed by counsel.
