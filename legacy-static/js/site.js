/* ==========================================================================
   Taste of BC — Shared site behaviour
   Header/footer, icons, cart (localStorage), drawer, countdown, forms.
   ========================================================================== */
(function () {
  const E = window.TOBC.event;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- Icons (24px stroke set) ---------- */
  const P = {
    cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3h2.6l2.3 11.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.5L21.5 7H6.2"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    pin: '<path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    ticket: '<path d="M3.5 8.5V6.5a1.5 1.5 0 0 1 1.5-1.5h14a1.5 1.5 0 0 1 1.5 1.5v2a2.5 2.5 0 0 0 0 5v2a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-2a2.5 2.5 0 0 0 0-5z"/><path d="M14 5v2.5M14 11v2M14 16.5V19" stroke-dasharray="0"/>',
    utensils: '<path d="M7 3v8M4.5 3v5a2.5 2.5 0 0 0 5 0V3M7 11v10M17 21V3c-2.2 1.3-3.5 3.8-3.5 7v3H17"/>',
    wine: '<path d="M8 3h8l.6 5.5A4.6 4.6 0 0 1 12 13.6a4.6 4.6 0 0 1-4.6-5.1L8 3zM12 13.6V20M8.5 20.5h7M7.6 7.5h8.8"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.4-3.4 3-5.5 6-5.5s5.6 2.1 6 5.5"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.6c2.6.1 4.5 2 4.9 4.9"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowL: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    check: '<path d="m5 12.5 4.2 4.2L19 7"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/>',
    phone: '<path d="M5 3.5h3.3l1.7 4.3-2.2 1.4a11 11 0 0 0 7 7l1.4-2.2 4.3 1.7V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.1A1.5 1.5 0 0 1 5 3.5z"/>',
    lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
    shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3z"/><path d="m8.8 12.2 2.3 2.3 4.3-4.5"/>',
    gift: '<rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M5 12v8.5h14V12M12 8v12.5M12 8S10.8 3.5 8 4.2C6 4.7 6.6 8 9 8M12 8s1.2-4.5 4-3.8c2 .5 1.4 3.8-1 3.8"/>',
    download: '<path d="M12 4v11M7 10.5l5 5 5-5M4.5 20h15"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.6v.4"/>',
    access: '<circle cx="12" cy="4.6" r="1.6"/><path d="M5 8.5c2.4.7 4.7 1 7 1s4.6-.3 7-1M12 9.5V14m0 0-3 6.5M12 14l3 6.5"/>',
    car: '<path d="M5 16.5V12l1.8-4.6A2 2 0 0 1 8.7 6h6.6a2 2 0 0 1 1.9 1.4L19 12v4.5M5 16.5h14M5 16.5V19M19 16.5V19M4 12h16"/><circle cx="8" cy="14.2" r=".6"/><circle cx="16" cy="14.2" r=".6"/>',
    train: '<rect x="5.5" y="3.5" width="13" height="13" rx="3"/><path d="M5.5 10.5h13M9 20l-2 1.5M15 20l2 1.5M8.5 13.6v.2M15.5 13.6v.2"/>',
    snow: '<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5 12 6l2.5-1.5M9.5 19.5 12 18l2.5 1.5"/>',
    music: '<path d="M9 18V5.5l11-2V16"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
    flag: '<path d="M5 21V4M5 4.5h11.5l-2 4 2 4H5"/>',
    star: '<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8 6.8 19.6l1-5.8L3.5 9.7l5.9-.8z"/>',
    chev: '<path d="m6 9 6 6 6-6"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 19V7.5A1.5 1.5 0 0 1 5.5 6H10"/>',
    card: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3 10h18M7 15h4"/>',
    nocash: '<rect x="3" y="6.5" width="18" height="11" rx="2"/><circle cx="12" cy="12" r="2.4"/><path d="M3 3l18 18"/>',
    scissors: '<circle cx="6" cy="6.5" r="2.5"/><circle cx="6" cy="17.5" r="2.5"/><path d="M8.2 7.8 20 18M8.2 16.2 20 6"/>',
    book: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5v-13zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5v-13z"/>',
    map: '<path d="m3.5 6.5 5.5-2.5 6 2.5 5.5-2.5v13.5L15 20l-6-2.5-5.5 2.5z"/><path d="M9 4v13.5M15 6.5V20"/>',
    arch: '<path d="M3 21V9.5C3 6 7 3.5 12 3.5S21 6 21 9.5V21M7 21v-9.5C7 9.5 9.2 8 12 8s5 1.5 5 3.5V21"/>',
    banner: '<path d="M5 3.5h14v13l-7-3-7 3z"/>',
    megaphone: '<path d="M4 10v4a1 1 0 0 0 1 1h2l8 4.5V4.5L7 9H5a1 1 0 0 0-1 1zM18.5 9.5a3.5 3.5 0 0 1 0 5M7.5 15l1.2 5"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
    store: '<path d="M4 9.5 5.5 4h13L20 9.5M4 9.5h16M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0M5.5 12v8.5h13V12M10 20.5v-5h4v5"/>',
    tag: '<path d="M3.5 12.6V4.5a1 1 0 0 1 1-1h8.1l8 8a1.5 1.5 0 0 1 0 2.1l-6 6a1.5 1.5 0 0 1-2.1 0z"/><circle cx="8" cy="8" r="1.3"/>',
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.2 6.8v.1"/>',
    facebook: '<path d="M14 21v-7.5h2.6l.4-3H14V8.6c0-.9.3-1.5 1.6-1.5H17V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8.3v3H11V21"/>',
    tiktok: '<path d="M14 3.5v11.2a3.3 3.3 0 1 1-3.3-3.3M14 3.5c.4 2.6 2.2 4.3 5 4.5"/>',
    youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10.2 9.2 4.8 2.8-4.8 2.8z"/>',
    sparkle: '<path d="M12 3c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7zM19 16c.2 1.5.9 2.2 2.4 2.4-1.5.2-2.2.9-2.4 2.4-.2-1.5-.9-2.2-2.4-2.4 1.5-.2 2.2-.9 2.4-2.4z"/>',
    flip: '<path d="M4 8h12.5a3.5 3.5 0 0 1 0 7H8M7 5 4 8l3 3M14 19l3-3"/>',
    reset: '<path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.6M4 4v4.6h4.6"/>'
  };
  const icon = (n, cls = "") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ""}</svg>`;
  /* Wave motif from the logo */
  const wave = (cls = "wave") => `<svg class="${cls}" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 26C60 4 120 4 200 22s140 18 200-6" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M190 36c60-12 120-14 200-4" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/></svg>`;
  const wavesBg = () => `<svg viewBox="0 0 600 260" fill="none" stroke="currentColor" stroke-linecap="round" aria-hidden="true"><path d="M0 120C110 60 220 60 330 105s200 45 270 0" stroke-width="22"/><path d="M200 175c110-30 250-30 400 0" stroke-width="14"/><path d="M0 230c140-40 300-40 600 0" stroke-width="8"/></svg>`;
  const money = (n) => "$" + n.toFixed(2);
  window.TOBC.ui = { icon, wave, wavesBg, money, $, $$ };

  /* ---------- Fill [data-icon] and [data-ev] ---------- */
  function hydrate(root = document) {
    $$("[data-icon]", root).forEach(el => { el.innerHTML = icon(el.dataset.icon) + el.innerHTML; el.removeAttribute("data-icon"); });
    $$("[data-ev]", root).forEach(el => { el.textContent = E[el.dataset.ev]; });
    $$("[data-wave]", root).forEach(el => { el.outerHTML = wave(el.dataset.wave || "wave"); });
    $$("[data-wavesbg]", root).forEach(el => { el.innerHTML = wavesBg(); });
  }
  window.TOBC.ui.hydrate = hydrate;

  /* ---------- Header / footer ---------- */
  const NAV = [
    ["index.html", "Home", "home"],
    ["coupons.html", "Coupons", "coupons"],
    ["restaurants.html", "Restaurants & Menus", "restaurants"],
    ["map.html", "Festival Map", "map"],
    ["visit.html", "Plan Your Visit", "visit"],
    ["sponsors.html", "Sponsors", "sponsors"],
    ["shop.html", "Shop", "shop"],
    ["get-involved.html", "Get Involved", "involved"]
  ];
  const page = document.body.dataset.page || "";

  function header() {
    const links = NAV.filter(n => n[2] !== "home").map(([h, l, k]) => `<a href="${h}"${k === page ? ' aria-current="page"' : ""}>${l}</a>`).join("");
    return `
<a class="skip-link" href="#main">Skip to content</a>
<div class="utility-bar"><div class="container">
  <div class="facts">
    <span>${icon("calendar")}${E.datesShort}</span>
    <span>${icon("pin")}${E.city}</span>
    <span>${icon("ticket")}Free entry</span>
    <span>${icon("card")}Cashless event</span>
  </div>
  <div class="util-links row" style="gap:18px"><a href="booklet.html">Info booklet</a><a href="about.html#faq">FAQ</a><a href="about.html#contact">Contact</a></div>
</div></div>
<header class="site-header" id="siteHeader"><div class="container">
  <a class="brand" href="index.html" aria-label="Taste of BC home"><img src="assets/img/logo-red.png" alt="Taste of BC" width="78" height="40"></a>
  <nav class="nav" aria-label="Main">${links}</nav>
  <div class="header-actions">
    <span class="lang" title="Free entry">FREE ENTRY · ${E.datesShort.toUpperCase()}</span>
    <button class="icon-btn ring" data-open-cart aria-label="Open cart">${icon("cart")}<span class="cart-count" data-cart-count data-n="0">0</span></button>
    <a class="btn btn-sm" href="coupons.html">${icon("ticket")}Buy coupons</a>
    <button class="icon-btn menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileNav" data-open-menu>${icon("menu")}</button>
  </div>
</div></header>
<div class="mobile-nav" id="mobileNav" aria-hidden="true">
  <div class="scrim" data-close-menu></div>
  <div class="panel" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="panel-head"><img src="assets/img/logo-red.png" alt="Taste of BC"><button class="icon-btn" aria-label="Close menu" data-close-menu>${icon("x")}</button></div>
    <nav>${NAV.map(([h, l, k]) => `<a href="${h}"${k === page ? ' aria-current="page"' : ""}>${l}${icon("arrow")}</a>`).join("")}
      <a href="booklet.html"${page === "booklet" ? ' aria-current="page"' : ""}>Info Booklet${icon("arrow")}</a>
      <a href="about.html"${page === "about" ? ' aria-current="page"' : ""}>About, FAQ & Contact${icon("arrow")}</a></nav>
    <div class="panel-foot">
      <a class="btn btn-block" href="coupons.html">${icon("ticket")}Buy coupons</a>
      <p class="small muted mb-0 center">Free entry · ${E.datesShort} · ${E.city}</p>
    </div>
  </div>
</div>`;
  }

  function footer() {
    return `
<footer class="site-footer">
  <div class="footer-cta"><div class="container">
    <div><h3>Get the menu drop first.</h3><p>Lineup news, menus and sponsor reveals. One email a month, max.</p></div>
    <form class="newsletter" data-newsletter novalidate>
      <label class="sr-only" for="nl-email">Email address</label>
      <input id="nl-email" type="email" placeholder="Your email address" required autocomplete="email">
      <button class="btn" type="submit">Subscribe</button>
    </form>
  </div></div>
  <div class="container footer-main">
    <div class="footer-brand">
      <img src="assets/img/logo-red.png" alt="Taste of BC" width="190" height="97">
      <p>A free-entry winter food festival celebrating the restaurants, makers and flavours of British Columbia. ${E.datesShort} in ${E.city}.</p>
      <div class="socials">
        <a href="#" aria-label="Instagram">${icon("instagram")}</a><a href="#" aria-label="Facebook">${icon("facebook")}</a>
        <a href="#" aria-label="TikTok">${icon("tiktok")}</a><a href="#" aria-label="YouTube">${icon("youtube")}</a>
      </div>
    </div>
    <div><h4>Festival</h4><ul>
      <li><a href="coupons.html">Food coupons</a></li><li><a href="restaurants.html">Restaurants & menus</a></li>
      <li><a href="map.html">Festival map</a></li><li><a href="booklet.html">Info booklet</a></li><li><a href="visit.html#schedule">Schedule</a></li></ul></div>
    <div><h4>Visit</h4><ul>
      <li><a href="visit.html">Getting there</a></li><li><a href="visit.html#accessibility">Accessibility</a></li>
      <li><a href="about.html#faq">FAQ</a></li><li><a href="shop.html">Shop merch</a></li></ul></div>
    <div><h4>Partner</h4><ul>
      <li><a href="sponsors.html">Sponsorship</a></li><li><a href="sponsors.html#advertise">Advertise in the booklet</a></li>
      <li><a href="get-involved.html#restaurants">Become a vendor</a></li><li><a href="get-involved.html#volunteer">Volunteer</a></li></ul></div>
    <div><h4>Company</h4><ul>
      <li><a href="about.html">About us</a></li><li><a href="about.html#contact">Contact</a></li>
      <li><a href="${"mailto:" + E.email}">${E.email}</a></li></ul></div>
  </div>
  <div class="footer-bottom"><div class="container">
    <span>© ${E.year} Taste of BC. All rights reserved. · <a href="legal.html#privacy">Privacy</a> · <a href="legal.html#terms">Terms</a> · <a href="legal.html#refunds">Refunds</a></span>
    <span class="stripe-note">${icon("lock")}Payments secured by Stripe</span>
  </div></div>
</footer>
<div class="drawer" id="cartDrawer" aria-hidden="true">
  <div class="scrim" data-close-cart></div>
  <aside class="panel" role="dialog" aria-modal="true" aria-labelledby="cartTitle">
    <div class="drawer-head"><h2 id="cartTitle">Your cart</h2><button class="icon-btn" aria-label="Close cart" data-close-cart>${icon("x")}</button></div>
    <div class="drawer-body" id="cartBody"></div>
    <div class="drawer-foot" id="cartFoot"></div>
  </aside>
</div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>`;
  }

  /* ---------- Cart ---------- */
  const KEY = "tobc-cart-v1";
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return memCart; } },
    set(v) { memCart = v; try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }
  };
  let memCart = [];
  let promo = null;
  const product = (id) => window.TOBC.products.find(p => p.id === id);
  const Cart = {
    items() { return store.get(); },
    add(id, qty = 1, opt = "") {
      const items = store.get(); const key = id + (opt ? "|" + opt : "");
      const ex = items.find(i => i.key === key);
      if (ex) ex.qty = Math.min(99, ex.qty + qty); else items.push({ key, id, qty, opt });
      store.set(items); render(); toast(`${icon("check")}Added to cart — ${product(id).name}${qty > 1 ? " × " + qty : ""}`);
    },
    setQty(key, qty) { let items = store.get(); const it = items.find(i => i.key === key); if (!it) return; it.qty = qty; if (qty <= 0) items = items.filter(i => i.key !== key); store.set(items); render(); },
    remove(key) { store.set(store.get().filter(i => i.key !== key)); render(); },
    clear() { store.set([]); render(); },
    subtotal() { return store.get().reduce((s, i) => s + product(i.id).price * i.qty, 0); },
    count() { return store.get().reduce((s, i) => s + i.qty, 0); }
  };
  window.TOBC.cart = Cart;

  function thumb(p) {
    if (p.img) return `<img src="${p.img}" alt="">`;
    return icon(p.kind === "gift" ? "gift" : "ticket");
  }
  function render() {
    const n = Cart.count();
    $$("[data-cart-count]").forEach(el => { el.textContent = n; el.dataset.n = n; });
    const body = $("#cartBody"), foot = $("#cartFoot"); if (!body) return;
    const items = Cart.items();
    if (!items.length) {
      body.innerHTML = `<div class="drawer-empty"><div class="icon-tile">${icon("cart")}</div><h3>Your cart is empty</h3><p class="muted">Entry is free. Grab a coupon sheet to start tasting.</p><a class="btn" href="coupons.html">Buy coupons</a></div>`;
      foot.innerHTML = ""; return;
    }
    body.innerHTML = items.map(i => { const p = product(i.id); return `
      <div class="line-item">
        <div class="thumb">${thumb(p)}</div>
        <div><h4>${p.name}</h4><div class="sub">${i.opt ? i.opt + " · " : ""}${money(p.price)} each</div>
          <div class="stepper sm" role="group" aria-label="Quantity for ${p.name}">
            <button type="button" data-q="${i.key}" data-d="-1" aria-label="Decrease">${icon("minus")}</button>
            <input type="number" value="${i.qty}" min="1" max="99" aria-label="Quantity" data-qi="${i.key}">
            <button type="button" data-q="${i.key}" data-d="1" aria-label="Increase">${icon("plus")}</button>
          </div></div>
        <div><div class="lp">${money(p.price * i.qty)}</div><button class="rm" data-rm="${i.key}">Remove</button></div>
      </div>`; }).join("");
    const sub = Cart.subtotal();
    const coupons = items.filter(i => i.id === "sheet" || i.id === "egift").reduce((s, i) => s + i.qty * 20, 0);
    foot.innerHTML = `
      <form class="promo" id="promoForm" novalidate><label class="sr-only" for="promoIn">Promo code</label>
        <input class="input" id="promoIn" placeholder="Promo code" autocomplete="off"><button class="btn btn-secondary btn-sm" type="submit">Apply</button></form>
      <div class="promo-msg" id="promoMsg" aria-live="polite"></div>
      <div class="sum-row"><span>Subtotal</span><span>${money(sub)}</span></div>
      ${coupons ? `<div class="sum-row"><span>Coupons included</span><span>${coupons} × $1</span></div>` : ""}
      <div class="sum-row"><span>Taxes & fees</span><span>Calculated at checkout</span></div>
      <div class="sum-row total"><span>Total</span><span>${money(sub)}</span></div>
      <a class="btn btn-block btn-lg" href="checkout.html">${icon("lock")}Secure checkout</a>
      <div class="secure">${icon("shield")}Payments processed securely by Stripe</div>`;
    $("#promoForm").addEventListener("submit", (e) => {
      e.preventDefault(); const v = $("#promoIn").value.trim(); const m = $("#promoMsg");
      $("#promoIn").classList.remove("is-error", "is-success");
      if (!v) { m.className = "promo-msg err"; m.textContent = "Enter a promo code."; $("#promoIn").classList.add("is-error"); return; }
      m.className = "promo-msg err"; m.textContent = `“${v}” isn’t a valid code. Codes are applied in Stripe checkout.`; $("#promoIn").classList.add("is-error");
    });
  }

  /* ---------- Drawers / menu ---------- */
  let lastFocus = null;
  function openLayer(el) { lastFocus = document.activeElement; el.classList.add("open"); el.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; setTimeout(() => { const f = el.querySelector("button, a, input"); f && f.focus(); }, 60); }
  function closeLayer(el) { el.classList.remove("open"); el.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; lastFocus && lastFocus.focus && lastFocus.focus(); }

  function toast(html) {
    const t = $("#toast"); if (!t) return; t.innerHTML = html; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2600);
  }
  window.TOBC.toast = toast;

  /* ---------- Countdown ---------- */
  function countdown() {
    const els = $$("[data-countdown]"); if (!els.length) return;
    const target = new Date(E.start).getTime();
    const tick = () => {
      let d = Math.max(0, target - Date.now());
      const parts = [Math.floor(d / 864e5), Math.floor(d / 36e5) % 24, Math.floor(d / 6e4) % 60, Math.floor(d / 1e3) % 60];
      els.forEach(el => {
        el.innerHTML = ["Days", "Hours", "Mins", "Secs"].map((l, i) => `<div class="unit"><span class="num">${String(parts[i]).padStart(2, "0")}</span><span class="lbl">${l}</span></div>`).join("");
      });
    };
    tick(); setInterval(tick, 1000);
  }

  /* ---------- Forms (client-side validation demo) ---------- */
  function forms() {
    $$("form[data-validate]").forEach(form => {
      form.setAttribute("novalidate", "");
      form.addEventListener("submit", (e) => {
        e.preventDefault(); let ok = true, first = null;
        $$(".field", form).forEach(f => {
          const inp = f.querySelector("input, select, textarea"); if (!inp) return;
          let valid = inp.checkValidity();
          f.classList.toggle("has-error", !valid); inp.setAttribute("aria-invalid", String(!valid));
          if (!valid) { ok = false; first = first || inp; }
        });
        if (!ok) { first.focus(); return; }
        const btn = form.querySelector("[type=submit]"); btn && btn.classList.add("is-loading");
        setTimeout(() => {
          btn && btn.classList.remove("is-loading");
          const succ = document.getElementById(form.dataset.success);
          if (succ) { form.hidden = true; succ.classList.add("show"); succ.scrollIntoView({ block: "center", behavior: "smooth" }); }
          else toast(`${icon("check")}Thanks — we’ll be in touch.`);
        }, 900);
      });
      form.addEventListener("input", (e) => { const f = e.target.closest(".field"); if (f && f.classList.contains("has-error") && e.target.checkValidity()) f.classList.remove("has-error"); });
    });
    $$("form[data-newsletter]").forEach(f => f.addEventListener("submit", (e) => {
      e.preventDefault(); const i = f.querySelector("input");
      if (!i.checkValidity()) { i.focus(); toast(`${icon("info")}Please enter a valid email address.`); return; }
      i.value = ""; toast(`${icon("check")}You’re on the list. See you in December!`);
    }));
  }

  /* ---------- Tabs ---------- */
  function tabs() {
    $$("[role=tablist]").forEach(list => {
      const btns = $$("[role=tab]", list);
      btns.forEach(b => b.addEventListener("click", () => {
        btns.forEach(x => { x.setAttribute("aria-selected", x === b); x.tabIndex = x === b ? 0 : -1; const p = document.getElementById(x.getAttribute("aria-controls")); if (p) p.hidden = x !== b; });
      }));
      list.addEventListener("keydown", (e) => {
        const i = btns.indexOf(document.activeElement); if (i < 0) return;
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); const n = btns[(i + (e.key === "ArrowRight" ? 1 : btns.length - 1)) % btns.length]; n.focus(); n.click(); }
      });
    });
  }

  /* ---------- Reveal ---------- */
  function reveal() {
    const els = $$(".reveal"); if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver((ents) => ents.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach(e => io.observe(e));
    addEventListener("load", () => setTimeout(() => els.forEach(e => e.classList.add("in")), 2500));
  }

  /* ---------- Steppers (page-level) ---------- */
  function steppers() {
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-step]"); if (!b) return;
      const inp = b.parentElement.querySelector("input"); const min = +inp.min || 1, max = +inp.max || 99;
      inp.value = Math.min(max, Math.max(min, (+inp.value || min) + (+b.dataset.step)));
      inp.dispatchEvent(new Event("input", { bubbles: true }));
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const h = $("#site-header"), f = $("#site-footer");
    if (h) h.outerHTML = header();
    if (f) f.outerHTML = footer();
    hydrate();
    render();
    const drawer = $("#cartDrawer"), menu = $("#mobileNav");
    document.addEventListener("click", (e) => {
      const t = e.target;
      if (t.closest("[data-open-cart]")) { menu && menu.classList.contains("open") && closeLayer(menu); openLayer(drawer); }
      else if (t.closest("[data-close-cart]")) closeLayer(drawer);
      else if (t.closest("[data-open-menu]")) { openLayer(menu); $("[data-open-menu]").setAttribute("aria-expanded", "true"); }
      else if (t.closest("[data-close-menu]")) { closeLayer(menu); $("[data-open-menu]").setAttribute("aria-expanded", "false"); }
      const add = t.closest("[data-add]");
      if (add) {
        const src = add.dataset.qtyFrom ? $(add.dataset.qtyFrom) : null;
        const optSrc = add.dataset.optFrom ? $(add.dataset.optFrom) : null;
        Cart.add(add.dataset.add, src ? Math.max(1, +src.value || 1) : 1, optSrc ? optSrc.value : "");
        if (add.dataset.openAfter !== undefined) openLayer(drawer);
      }
      const q = t.closest("[data-q]"); if (q) { const it = Cart.items().find(i => i.key === q.dataset.q); if (it) Cart.setQty(it.key, Math.min(99, it.qty + +q.dataset.d)); }
      const rm = t.closest("[data-rm]"); if (rm) Cart.remove(rm.dataset.rm);
    });
    document.addEventListener("change", (e) => { const qi = e.target.closest("[data-qi]"); if (qi) Cart.setQty(qi.dataset.qi, Math.min(99, Math.max(0, parseInt(qi.value) || 0))); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { drawer.classList.contains("open") && closeLayer(drawer); menu.classList.contains("open") && closeLayer(menu); } });
    const sh = $("#siteHeader"); const onScroll = () => sh && sh.classList.toggle("scrolled", scrollY > 8); onScroll(); addEventListener("scroll", onScroll, { passive: true });
    addEventListener("storage", render);
    countdown(); forms(); tabs(); reveal(); steppers();
    document.dispatchEvent(new CustomEvent("tobc:ready"));
  });
})();
