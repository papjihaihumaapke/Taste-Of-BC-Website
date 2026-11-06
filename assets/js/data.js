/* ==========================================================================
   Taste of BC — Site content & configuration
   Edit this file to update dates, venue, restaurants, menus and products.
   ========================================================================== */
window.TOBC = {
  /* ---- Event ---- */
  event: {
    name: "Taste of BC",
    year: 2026,
    // PLACEHOLDER dates — update once confirmed. Countdown + all date text read from here.
    start: "2026-12-12T11:00:00-08:00",
    datesShort: "Dec 12–13, 2026",
    datesLong: "Saturday & Sunday, December 12–13, 2026",
    hours: "11 AM – 9 PM daily",
    venue: "[Venue name]",
    city: "Surrey, BC",
    address: "[Street address], Surrey, BC",
    email: "hello@tasteofbc.ca",
    phone: "(604) 000-0000",
    couponValue: 1,
    couponsPerSheet: 20,
    sheetPrice: 20
  },

  /* ---- Participating restaurants (2026 lineup preview — placeholder names) ----
     price = number of $1 coupons */
  restaurants: [
    { id: 1,  name: "Fraser Valley Smokehouse", cuisine: "BBQ & Grill", group: "food", booth: "A1", diet: ["GF"],
      menu: [["Brisket sandwich", 12], ["Pulled pork sliders (2)", 9], ["Smoked corn cup", 5]] },
    { id: 2,  name: "Tandoori Junction", cuisine: "Punjabi", group: "food", booth: "A2", diet: ["V", "Halal"],
      menu: [["Butter chicken bowl", 12], ["Paneer tikka skewer", 8], ["Samosa chaat", 7]] },
    { id: 3,  name: "Salt Spring Oyster Co.", cuisine: "Seafood", group: "food", booth: "A3", diet: ["GF"],
      menu: [["Fresh oysters (3)", 12], ["Smoked salmon bannock", 10], ["Clam chowder cup", 7]] },
    { id: 4,  name: "Harbour Fish & Chips", cuisine: "Seafood", group: "food", booth: "A4", diet: [],
      menu: [["Halibut & chips", 16], ["Cod bites", 9], ["Hand-cut fries", 5]] },
    { id: 5,  name: "Seoul Street Kitchen", cuisine: "Korean", group: "food", booth: "B1", diet: ["V"],
      menu: [["Bulgogi rice bowl", 12], ["Korean fried chicken", 10], ["Kimchi pancake", 7]] },
    { id: 6,  name: "Mama Lola's Tacos", cuisine: "Mexican", group: "food", booth: "B2", diet: ["V", "GF"],
      menu: [["Birria tacos (2)", 11], ["Veggie tacos (2)", 9], ["Elote", 6]] },
    { id: 7,  name: "Dragon Dumpling House", cuisine: "Chinese", group: "food", booth: "B3", diet: ["V"],
      menu: [["Pork & chive dumplings (6)", 9], ["Veg potstickers (6)", 8], ["Scallion pancake", 6]] },
    { id: 8,  name: "Coast Mountain Burgers", cuisine: "Burgers", group: "food", booth: "B4", diet: ["Halal"],
      menu: [["BC beef smash burger", 13], ["Halal chicken burger", 12], ["Poutine", 8]] },
    { id: 9,  name: "Green Table Plant Kitchen", cuisine: "Plant-based", group: "food", booth: "C1", diet: ["V", "VG", "GF"],
      menu: [["Jackfruit 'pulled pork' bun", 11], ["Buddha bowl", 11], ["Lentil soup", 6]] },
    { id: 10, name: "Pho Saigon Corner", cuisine: "Vietnamese", group: "food", booth: "C2", diet: ["GF", "Halal"],
      menu: [["Beef pho (regular)", 12], ["Lemongrass chicken banh mi", 10], ["Fresh rolls (2)", 7]] },
    { id: 11, name: "Lahore Grill", cuisine: "Pakistani", group: "food", booth: "C3", diet: ["Halal"],
      menu: [["Chicken seekh kebab plate", 13], ["Beef nihari cup", 11], ["Garlic naan", 4]] },
    { id: 12, name: "Okanagan Orchard Sweets", cuisine: "Desserts", group: "sweets", booth: "C4", diet: ["V"],
      menu: [["Apple cider mini donuts (6)", 7], ["Nanaimo bar", 5], ["Peach cobbler cup", 7]] },
    { id: 13, name: "Mithai Mahal", cuisine: "Indian Sweets", group: "sweets", booth: "D1", diet: ["V", "GF"],
      menu: [["Hot jalebi", 6], ["Gulab jamun (3)", 6], ["Kulfi", 5]] },
    { id: 14, name: "Rainforest Roasters", cuisine: "Coffee & Hot Drinks", group: "drinks", booth: "D2", diet: ["V", "VG", "GF"],
      menu: [["Hot chocolate", 5], ["Masala chai", 4], ["Latte", 5]] },
    { id: 15, name: "Fraser Valley Craft Collective", cuisine: "Craft Beer & Cider", group: "licensed", booth: "BG1", diet: ["GF"],
      menu: [["Craft lager (16 oz)", 8], ["Dry apple cider", 8], ["Tasting flight (4)", 12]] },
    { id: 16, name: "BC Wine Cellar Pavilion", cuisine: "BC Wine", group: "licensed", booth: "BG2", diet: ["V", "GF"],
      menu: [["Okanagan red (5 oz)", 10], ["Mulled wine", 8], ["Icewine taster", 9]] }
  ],

  /* ---- Shop ---- */
  products: [
    { id: "sheet",   name: "Coupon sheet (20 × $1)", price: 20, img: null, kind: "coupon", note: "Pick up at any Coupon Booth" },
    { id: "egift",   name: "Gift coupon sheet (e-gift)", price: 20, img: null, kind: "gift", note: "Emailed to the recipient" },
    { id: "tote-n",  name: "Canvas tote — Natural", price: 25, img: "assets/img/p-tote-natural.jpg", kind: "merch", note: "Heavy cotton canvas" },
    { id: "tote-r",  name: "Canvas tote — Festival Red", price: 25, img: "assets/img/p-tote-red.jpg", kind: "merch", note: "Heavy cotton canvas" },
    { id: "mug-w",   name: "Ceramic mug — White", price: 18, img: "assets/img/p-mug-white.jpg", kind: "merch", note: "12 oz · dishwasher safe" },
    { id: "mug-r",   name: "Ceramic mug — Red", price: 18, img: "assets/img/p-mug-red.jpg", kind: "merch", note: "12 oz · dishwasher safe" },
    { id: "tee-w",   name: "Logo tee — White", price: 30, img: "assets/img/p-tee-white.jpg", kind: "merch", note: "Unisex · S–XXL" },
    { id: "tee-r",   name: "Logo tee — Red", price: 30, img: "assets/img/p-tee-red.jpg", kind: "merch", note: "Unisex · S–XXL" }
  ],

  /* ---- Stage schedule (placeholder programming) ---- */
  schedule: {
    "Saturday": [
      ["11:00 AM", "Gates open", "All entrances · free entry", "All gates"],
      ["12:00 PM", "Welcome & ribbon cutting", "With festival partners and community leaders", "Main Stage"],
      ["1:00 PM", "Chef demo: BC Salmon three ways", "Live cooking + tasting samples", "Demo Kitchen"],
      ["2:30 PM", "Bhangra & folk showcase", "Local dance groups", "Main Stage"],
      ["4:30 PM", "Lights on", "The festival lights switch on at dusk", "Whole site"],
      ["6:00 PM", "Live band", "Headline local act", "Main Stage"],
      ["9:00 PM", "Gates close", "", "All gates"]
    ],
    "Sunday": [
      ["11:00 AM", "Gates open", "All entrances · free entry", "All gates"],
      ["12:00 PM", "Family morning", "Kids Zone crafts & cookie decorating", "Kids Zone"],
      ["1:30 PM", "Chef demo: Street food of Surrey", "Live cooking + tasting samples", "Demo Kitchen"],
      ["3:00 PM", "Acoustic sessions", "Singer-songwriters from the Fraser Valley", "Main Stage"],
      ["4:30 PM", "Lights on", "The festival lights switch on at dusk", "Whole site"],
      ["7:00 PM", "Closing set", "Festival finale", "Main Stage"],
      ["9:00 PM", "Gates close", "", "All gates"]
    ]
  }
};
