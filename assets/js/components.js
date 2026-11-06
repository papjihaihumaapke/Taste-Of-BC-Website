/* ==========================================================================
   Taste of BC — Reusable UI components rendered from data.js
   ========================================================================== */
(function () {
  const { icon, wave } = TOBC.ui;
  const E = TOBC.event;
  const DIET = { V: "Vegetarian", VG: "Vegan", GF: "Gluten-free options", Halal: "Halal" };
  const GROUP = { food: "Food", sweets: "Sweets", drinks: "Hot drinks", licensed: "Beer & Wine (19+)" };

  /* ---- Coupon sheet: front (20 × $1) + back (sponsors) ---- */
  function sheet(el, opts = {}) {
    if (!el) return;
    const coupons = Array.from({ length: E.couponsPerSheet }, (_, i) => `
      <button type="button" class="coupon" ${opts.interactive ? "" : 'tabindex="-1"'} aria-label="Tear off $1 coupon ${i + 1}">
        <img class="mk" src="assets/img/mark-circle.png" alt="">
        <span class="val">$${E.couponValue}</span><span class="lbl">Taste of BC</span>
        <span class="no">No. ${String(i + 1).padStart(2, "0")}</span>
      </button>`).join("");
    el.innerHTML = `
      <div class="sheet-face front">
        <div class="sheet-top"><img src="assets/img/logo-red.png" alt="Taste of BC">
          <div class="meta"><b>20 × $1 COUPONS</b>${E.datesShort}<br>${E.city}</div></div>
        <div class="coupons">${coupons}</div>
        <div class="sheet-foot"><span>Tear along perforation · Valid both festival days</span><span>No cash value · Sheet #000000</span></div>
      </div>
      <div class="sheet-face back" aria-hidden="true">
        <div class="sheet-back-head"><span class="tagline">Food<span>•</span>Beverage<span>•</span>Entertainment</span><h4>Thank you to our partners</h4></div>
        <div class="sponsor-slots">
          <div class="sponsor-slot big">Presenting partner</div>
          <div class="sponsor-slot med">Gate partner</div><div class="sponsor-slot med">Stage partner</div>
          ${Array.from({ length: 8 }, () => '<div class="sponsor-slot">Sponsor logo</div>').join("")}
        </div>
        <div class="sheet-foot"><span>Advertise here: tasteofbc.ca/sponsors</span><span>${E.email}</span></div>
      </div>`;
    if (!opts.interactive) el.querySelectorAll(".coupon").forEach(c => c.disabled = true);
  }

  /* ---- Restaurant card (mirrors the on-site booth banner) ---- */
  function restaurantCard(r, opts = {}) {
    const items = (opts.full ? r.menu : r.menu.slice(0, 3)).map(([n, p]) =>
      `<li><span>${n}</span><span class="dots"></span><span class="pr">${p} <small>coupons</small></span></li>`).join("");
    const tags = r.diet.map(d => `<span class="diet" title="${DIET[d]}">${d}</span>`).join("");
    const lic = r.group === "licensed" ? `<span class="badge dark">19+</span>` : "";
    return `
      <article class="r-card" data-id="${r.id}">
        <div class="r-banner">
          <span class="booth">Booth ${r.booth}</span>
          <span class="cat">${r.cuisine}</span>
          <h3>${r.name}</h3>
          <p>${GROUP[r.group]}</p>
          ${wave("w")}
        </div>
        <div class="r-body">
          <ul class="r-menu" aria-label="Menu">${items}</ul>
          <div class="r-tags">${lic}${tags}</div>
          <div class="r-foot"><span>1 coupon = $1</span><a href="map.html?booth=${r.booth}">${icon("pin")}Find on map</a></div>
        </div>
      </article>`;
  }

  /* ---- Festival site map (SVG) ---- */
  const BOOTHS = {
    A1: [120, 128], A2: [194, 128], A3: [268, 128], A4: [342, 128],
    B1: [594, 128], B2: [668, 128], B3: [742, 128], B4: [816, 128],
    C1: [120, 236], C2: [194, 236], C3: [268, 236], C4: [342, 236],
    D1: [652, 236], D2: [726, 236],
    BG1: [668, 382], BG2: [762, 382]
  };
  function gate(x, y, label, rot = 0, sub = "") {
    return `<g transform="translate(${x} ${y}) rotate(${rot})">
      <rect x="-46" y="-13" width="92" height="26" rx="13" fill="#BC0214"/>
      <path d="M-30 13V0c0-10 13-17 30-17s30 7 30 17v13" fill="none" stroke="#BC0214" stroke-width="5"/>
      <text x="0" y="5" text-anchor="middle" font-size="11.5" font-weight="800" fill="#fff" letter-spacing=".04em">${label}</text>
      ${sub ? `<text x="0" y="34" text-anchor="middle" font-size="10.5" font-weight="700" fill="#6B6661">${sub}</text>` : ""}
    </g>`;
  }
  const poi = (x, y, ch, fill, lbl) => `<g><circle cx="${x}" cy="${y}" r="13" fill="${fill}"/><text x="${x}" y="${y + 4.5}" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">${ch}</text>${lbl ? `<text x="${x}" y="${y + 28}" text-anchor="middle" font-size="10" font-weight="700" fill="#3D3A38">${lbl}</text>` : ""}</g>`;
  const zone = (x, y, w, h, title, sub, fill = "#fff", stroke = "#D6CEC5", tc = "#1A1A1A") => `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/><text x="${x + w / 2}" y="${y + h / 2 - (sub ? 2 : -4)}" text-anchor="middle" font-size="13" font-weight="800" fill="${tc}">${title}</text>${sub ? `<text x="${x + w / 2}" y="${y + h / 2 + 15}" text-anchor="middle" font-size="10.5" font-weight="600" fill="${tc}" opacity=".75">${sub}</text>` : ""}</g>`;

  function siteMap(opts = {}) {
    const byBooth = Object.fromEntries(TOBC.restaurants.map(r => [r.booth, r]));
    const booths = Object.entries(BOOTHS).map(([id, [x, y]]) => {
      const r = byBooth[id];
      return `<g class="booth-g" data-booth="${id}" ${opts.interactive ? `tabindex="0" role="button" aria-label="Booth ${id}${r ? ": " + r.name : ""}"` : ""}>
        <rect class="booth-r" x="${x}" y="${y}" width="64" height="44" rx="8" fill="${id.startsWith("BG") ? "#7A0410" : "#BC0214"}"/>
        <text x="${x + 32}" y="${y + 27}" text-anchor="middle" font-size="13" font-weight="800" fill="#fff" pointer-events="none">${id}</text></g>`;
    }).join("");
    return `<svg class="map-svg" viewBox="0 0 1000 620" role="img" aria-label="Festival site map showing three entrance arches, coupon booths, restaurant booths, stage, dining tent, beer and wine garden, kids zone and facilities">
      <rect width="1000" height="620" fill="#F4EDE4" rx="16"/>
      <text x="500" y="30" text-anchor="middle" font-size="12" font-weight="800" fill="#6B6661" letter-spacing=".14em">PARKING · RIDESHARE · TRANSIT ↑</text>
      <rect x="60" y="70" width="880" height="490" rx="28" fill="#FCF8F3" stroke="#D6CEC5" stroke-width="2"/>
      <rect x="48" y="58" width="904" height="514" rx="36" fill="none" stroke="#BC0214" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round"/>
      <text x="500" y="595" text-anchor="middle" font-size="11" font-weight="700" fill="#BC0214" letter-spacing=".12em">· · · SPONSOR BANNERS AROUND THE FIELD PERIMETER · · ·</text>
      <!-- walkways -->
      <path d="M500 84V560M74 315H926" stroke="#EDE5DA" stroke-width="34" stroke-linecap="round"/>
      ${zone(420, 196, 160, 96, "Heated Dining Tent", "Seating · warm-up")}
      ${zone(400, 440, 200, 90, "MAIN STAGE", "Music · demos", "#1A1A1A", "#1A1A1A", "#fff")}
      ${zone(110, 350, 170, 70, "Demo Kitchen", "Chef sessions")}
      ${zone(110, 448, 190, 86, "Kids Zone", "Family seating")}
      <g><rect x="630" y="345" width="250" height="185" rx="14" fill="#FBEAEC" stroke="#BC0214" stroke-width="2" stroke-dasharray="7 5"/>
        <text x="755" y="370" text-anchor="middle" font-size="13" font-weight="800" fill="#7A0410">Beer & Wine Garden · 19+</text>
        <text x="755" y="470" text-anchor="middle" font-size="10.5" font-weight="600" fill="#7A0410">Licensed seating · ID checked at entry</text></g>
      <text x="268" y="116" text-anchor="middle" font-size="10.5" font-weight="800" fill="#6B6661" letter-spacing=".12em">ROW A</text>
      <text x="742" y="116" text-anchor="middle" font-size="10.5" font-weight="800" fill="#6B6661" letter-spacing=".12em">ROW B</text>
      <text x="268" y="300" text-anchor="middle" font-size="10.5" font-weight="800" fill="#6B6661" letter-spacing=".12em">ROW C</text>
      <text x="726" y="300" text-anchor="middle" font-size="10.5" font-weight="800" fill="#6B6661" letter-spacing=".12em">ROW D</text>
      ${booths}
      ${poi(560, 110, "i", "#1A1A1A", "Info")}
      ${poi(440, 110, "C", "#BC0214", "Coupons")}
      ${poi(110, 290, "C", "#BC0214", "")}
      ${poi(890, 290, "C", "#BC0214", "")}
      ${poi(620, 470, "+", "#1E7A46", "First aid")}
      ${poi(345, 395, "W", "#3D3A38", "Washrooms")}
      ${poi(880, 220, "W", "#3D3A38", "Washrooms")}
      ${poi(90, 205, "♿", "#3D3A38", "")}
      ${gate(500, 70, "NORTH GATE", 0, "")}
      ${gate(60, 315, "WEST GATE", -90)}
      ${gate(940, 315, "EAST GATE", 90)}
      <text x="500" y="46" text-anchor="middle" font-size="10.5" font-weight="800" fill="#BC0214">MAIN ENTRANCE</text>
    </svg>`;
  }

  TOBC.components = { sheet, restaurantCard, siteMap, DIET, GROUP };
})();
