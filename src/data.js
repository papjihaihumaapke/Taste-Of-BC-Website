/* ==========================================================================
   Taste of BC — Site content & configuration
   Edit this file to update dates, venue, food lineup, schedule and products.
   ========================================================================== */

export const event = {
  name: "Taste of BC",
  year: 2027,
  // TENTATIVE dates — to be confirmed. Countdown + all date text read from here.
  datesConfirmed: false,
  start: "2027-08-19T11:00:00-07:00",
  datesShort: "Aug 19–22, 2027",
  datesLong: "Thursday to Sunday, August 19–22, 2027",
  days: 4,
  hours: "11 AM – 10 PM daily",
  // TBC: fill these in when confirmed. `null` renders a subtle [TBC] tag on the site.
  venue: null,            // TBC: venue name
  address: null,          // TBC: venue street address, Surrey, BC
  mapQuery: "Surrey, BC", // TBC: switch to the venue address so the embedded map points at the site
  city: "Surrey, BC",
  email: "hello@tasteofbc.ca",
  phone: null,            // TBC: phone number
  office: null,           // TBC: office address
  admission: "Free, all ages, subject to capacity",
  pets: "Welcome on a leash",
  couponValue: 1,
  couponRange: "2 to 8",  // TBC: coupons per sample-size dish
  couponsPerSheet: 20,
  sheetPrice: 20
};

/* Social links — TBC: paste the real profile URLs. Empty string = placeholder link. */
export const socials = [
  { id: "instagram", label: "Instagram", url: "" },
  { id: "facebook", label: "Facebook", url: "" },
  { id: "tiktok", label: "TikTok", url: "" },
  { id: "youtube", label: "YouTube", url: "" }
];

/* Menu — vendor lineup by category. Leave `vendors` empty to show the "Menus announced soon" state.
   Vendor shape (add real vendors only once confirmed):
   { name: "Vendor name", logo: "/assets/img/vendors/logo.png", dishes: [{ name: "Dish name", coupons: 4, diet: ["V", "GF"] }] }
   Diet codes: V, VG, GF, Halal, Nuts */
export const menuAnnounce = null; // TBC: month menus are announced, e.g. "June 2027"
export const menuCategories = [
  { slug: "restaurants", title: "Restaurants", text: "Sample-size dishes from local restaurants, from street food to fine dining.",
    img: "/assets/img/stock/grilled-salmon.jpg", alt: "Grilled salmon with vegetables", vendors: [] },
  { slug: "food-trucks", title: "Food Trucks", text: "BC food trucks serving festival favourites straight off the grill.",
    img: "/assets/img/stock/skewers.jpg", alt: "Skewers sizzling on a grill", vendors: [] },
  { slug: "drinks", title: "Breweries, Wineries & Distilleries", text: "BC craft beer, wine, cider and spirits in the 19+ BC Wine Garden.",
    img: "/assets/img/stock/beer-pour.jpg", alt: "Craft beer being poured from a tap", vendors: [] }
];
export const DIET_LABELS = { V: "Vegetarian", VG: "Vegan", GF: "Gluten-free", Halal: "Halal", Nuts: "Contains nuts" };

/* Hero slideshow — swap in real festival photos (put files in public/assets/img/) */
export const heroSlides = [
  { img: "/assets/img/stock/skewers.jpg", alt: "Skewers sizzling on a grill", title: "Taste local.", text: "Dozens of BC restaurants, food trucks and dessert makers in one place." },
  { img: "/assets/img/stock/crowd-lawn.jpg", alt: "Festival crowd relaxing on a sunny lawn", title: "Bring the whole community.", text: "Free entry for every family, all four days." },
  { img: "/assets/img/stock/wine-tasting.jpg", alt: "Wine glasses lined up at a tasting bar", title: "Sip BC wines.", text: "Wineries, craft brewers and cideries from across the province in the 19+ garden." },
  { img: "/assets/img/stock/concert.jpg", alt: "Crowd enjoying a live concert", title: "Four days of live entertainment.", text: "Live bands, dance troupes, chef demos and local artists, all free to watch." }
];

/* Photo gallery — stock images (CC0, see public/assets/img/stock/CREDITS.md). Swap for real festival photos later. */
export const gallery = [
  { img: "/assets/img/stock/festival-crowd.jpg", alt: "Friends at an outdoor music festival", label: "Live Music" },
  { img: "/assets/img/stock/grilled-salmon.jpg", alt: "Grilled salmon with vegetables", label: "BC Seafood" },
  { img: "/assets/img/stock/wine-cheese.jpg", alt: "Red wine with cheese and charcuterie", label: "Wine & Cheese" },
  { img: "/assets/img/stock/donut.jpg", alt: "Hands holding a sugared donut", label: "Sweet Treats" },
  { img: "/assets/img/stock/picnic-pizza.jpg", alt: "Pizza and dumplings on the grass", label: "Picnic on the Field" },
  { img: "/assets/img/stock/beer-pour.jpg", alt: "Craft beer being poured from a tap", label: "Craft Beer" },
  { img: "/assets/img/stock/stage-lights.jpg", alt: "Band on an illuminated stage at night", label: "Evening Headliners" },
  { img: "/assets/img/stock/grilled-chicken.jpg", alt: "Chicken on a hot grill", label: "Off the Grill" }
];

/* What's on — festival highlights */
export const highlights = [
  { icon: "utensils", title: "Local Restaurants", text: "Signature dishes in tasting-size portions, from street food to fine dining.", to: "/menu/restaurants",
    img: "/assets/img/stock/picnic-pizza.jpg", alt: "Pizza and dumplings shared on the grass" },
  { icon: "wine", title: "BC Wine Garden", tag: "19+", text: "Pours from Okanagan, Fraser Valley and Island wineries, plus craft beer and cider. 19+.", to: "/whats-on",
    img: "/assets/img/stock/wine-cheese.jpg", alt: "Red wine with cheese and charcuterie" },
  { icon: "music", title: "Live Entertainment", text: "Two stages of music, dance and comedy from noon until close, all four days.", to: "/entertainment",
    img: "/assets/img/stock/concert.jpg", alt: "Crowd enjoying a live concert" },
  { icon: "sparkle", title: "Local Artists", text: "BC painters and artists creating live art around the field.", to: "/entertainment",
    img: "/assets/img/stock/festival-crowd.jpg", alt: "Friends enjoying an outdoor festival" },
  { icon: "flag", title: "Chef Demos", text: "Cooking demos and tastings with local chefs in the Demo Kitchen.", to: "/entertainment",
    img: "/assets/img/stock/grilled-salmon.jpg", alt: "Grilled salmon with vegetables" },
  { icon: "heart", title: "Family Zone", text: "Face painting, games and kid-sized portions. Everyone is welcome.", to: "/whats-on",
    img: "/assets/img/stock/crowd-lawn.jpg", alt: "Families relaxing on a sunny festival lawn" }
];

/* Food & drink lineup — generic placeholders until vendors are confirmed.
   name = descriptive booth title (no business names), price = number of $1 coupons */
export const restaurants = [
  { id: 1,  name: "Smokehouse BBQ", cuisine: "BBQ & Grill", group: "food", booth: "A1", diet: ["GF"],
    menu: [["Brisket sandwich", 12], ["Pulled pork sliders (2)", 9], ["Smoked corn cup", 5]] },
  { id: 2,  name: "Punjabi Kitchen", cuisine: "Punjabi", group: "food", booth: "A2", diet: ["V", "Halal"],
    menu: [["Butter chicken bowl", 12], ["Paneer tikka skewer", 8], ["Samosa chaat", 7]] },
  { id: 3,  name: "West Coast Oyster Bar", cuisine: "Seafood", group: "food", booth: "A3", diet: ["GF"],
    menu: [["Fresh oysters (3)", 12], ["Smoked salmon bannock", 10], ["Clam chowder cup", 7]] },
  { id: 4,  name: "Fish & Chips Shack", cuisine: "Seafood", group: "food", booth: "A4", diet: [],
    menu: [["Halibut & chips", 16], ["Cod bites", 9], ["Hand-cut fries", 5]] },
  { id: 5,  name: "Korean Street Food", cuisine: "Korean", group: "food", booth: "B1", diet: ["V"],
    menu: [["Bulgogi rice bowl", 12], ["Korean fried chicken", 10], ["Kimchi pancake", 7]] },
  { id: 6,  name: "Taqueria", cuisine: "Mexican", group: "food", booth: "B2", diet: ["V", "GF"],
    menu: [["Birria tacos (2)", 11], ["Veggie tacos (2)", 9], ["Elote", 6]] },
  { id: 7,  name: "Dumpling Bar", cuisine: "Chinese", group: "food", booth: "B3", diet: ["V"],
    menu: [["Pork & chive dumplings (6)", 9], ["Veg potstickers (6)", 8], ["Scallion pancake", 6]] },
  { id: 8,  name: "Burger Grill", cuisine: "Burgers", group: "food", booth: "B4", diet: ["Halal"],
    menu: [["BC beef smash burger", 13], ["Halal chicken burger", 12], ["Poutine", 8]] },
  { id: 9,  name: "Plant-Based Kitchen", cuisine: "Plant-based", group: "food", booth: "C1", diet: ["V", "VG", "GF"],
    menu: [["Jackfruit 'pulled pork' bun", 11], ["Buddha bowl", 11], ["Gazpacho cup", 6]] },
  { id: 10, name: "Vietnamese Kitchen", cuisine: "Vietnamese", group: "food", booth: "C2", diet: ["GF", "Halal"],
    menu: [["Lemongrass chicken banh mi", 10], ["Vermicelli bowl", 12], ["Fresh rolls (2)", 7]] },
  { id: 11, name: "Kebab Grill", cuisine: "Pakistani", group: "food", booth: "C3", diet: ["Halal"],
    menu: [["Chicken seekh kebab plate", 13], ["Chapli kebab wrap", 11], ["Garlic naan", 4]] },
  { id: 12, name: "Orchard Desserts", cuisine: "Desserts", group: "sweets", booth: "C4", diet: ["V"],
    menu: [["Mini donuts (6)", 7], ["Nanaimo bar", 5], ["Peach cobbler cup", 7]] },
  { id: 13, name: "Ice Cream & Kulfi", cuisine: "Frozen treats", group: "sweets", booth: "D1", diet: ["V", "GF"],
    menu: [["Kulfi", 5], ["Gelato cup", 6], ["Mango sorbet", 5]] },
  { id: 14, name: "Lemonade & Iced Tea", cuisine: "Cold drinks", group: "drinks", booth: "D2", diet: ["V", "VG", "GF"],
    menu: [["Fresh lemonade", 5], ["Iced chai", 5], ["Cold brew", 5]] },
  { id: 15, name: "Craft Beer & Cider", cuisine: "BC craft beer & cider", group: "licensed", booth: "BG1", diet: ["GF"],
    menu: [["Craft lager (16 oz)", 8], ["Dry apple cider", 8], ["Tasting flight (4)", 12]] },
  { id: 16, name: "BC Wine Pavilion", cuisine: "BC wine", group: "licensed", booth: "BG2", diet: ["V", "GF"],
    menu: [["Okanagan red (5 oz)", 10], ["BC rosé (5 oz)", 9], ["Wine tasting flight (3)", 12]] }
];

/* Shop */
export const products = [
  { id: "sheet",  name: "Coupon sheet (20 × $1)", price: 20, img: null, kind: "coupon", note: "Pick up at any Coupon Booth" },
  { id: "egift",  name: "Gift coupon sheet (e-gift)", price: 20, img: null, kind: "gift", note: "Emailed to the recipient" },
  { id: "tote-n", name: "Canvas tote — Natural", price: 25, img: "/assets/img/p-tote-natural.jpg", kind: "merch", note: "Heavy cotton canvas" },
  { id: "tote-r", name: "Canvas tote — Festival Red", price: 25, img: "/assets/img/p-tote-red.jpg", kind: "merch", note: "Heavy cotton canvas" },
  { id: "mug-w",  name: "Ceramic mug — White", price: 18, img: "/assets/img/p-mug-white.jpg", kind: "merch", note: "12 oz · dishwasher safe" },
  { id: "mug-r",  name: "Ceramic mug — Red", price: 18, img: "/assets/img/p-mug-red.jpg", kind: "merch", note: "12 oz · dishwasher safe" },
  { id: "tee-w",  name: "Logo tee — White", price: 30, img: "/assets/img/p-tee-white.jpg", kind: "merch", note: "Unisex · S–XXL" },
  { id: "tee-r",  name: "Logo tee — Red", price: 30, img: "/assets/img/p-tee-red.jpg", kind: "merch", note: "Unisex · S–XXL" }
];

/* Entertainment schedule — placeholder programming, acts announced later.
   [time, title, description, stage] */
export const schedule = {
  Thursday: [
    ["11:00 AM", "Gates open", "Free entry at every arch", "All gates"],
    ["12:00 PM", "Opening ceremony", "Welcome from the festival team and community", "Main Stage"],
    ["2:00 PM", "Chef demo", "Summer on the grill with BC produce", "Demo Kitchen"],
    ["4:00 PM", "Acoustic sessions", "Local singer-songwriters", "Community Stage"],
    ["7:00 PM", "Evening headliner", "Act to be announced", "Main Stage"],
    ["10:00 PM", "Gates close", "", "All gates"]
  ],
  Friday: [
    ["11:00 AM", "Gates open", "Free entry at every arch", "All gates"],
    ["1:00 PM", "BC wine tasting", "Guided tasting with local winemakers", "Wine Garden"],
    ["3:00 PM", "Cultural dance showcase", "Bhangra, folk and more", "Community Stage"],
    ["5:00 PM", "Live art", "Local painters at work on the field", "Live Art Zone"],
    ["8:00 PM", "Friday night party", "Live band, act to be announced", "Main Stage"],
    ["10:00 PM", "Gates close", "", "All gates"]
  ],
  Saturday: [
    ["11:00 AM", "Gates open", "Free entry at every arch", "All gates"],
    ["12:00 PM", "Family fun hour", "Games, face painting and a kids’ cooking class", "Family Zone"],
    ["2:00 PM", "Chef demo", "Street food of the Fraser Valley", "Demo Kitchen"],
    ["4:00 PM", "Comedy on the field", "Local stand-up", "Community Stage"],
    ["8:00 PM", "Saturday headliner", "Act to be announced", "Main Stage"],
    ["10:00 PM", "Gates close", "", "All gates"]
  ],
  Sunday: [
    ["11:00 AM", "Gates open", "Free entry at every arch", "All gates"],
    ["12:00 PM", "Sunday brunch set", "Jazz and soul", "Community Stage"],
    ["2:00 PM", "BC wine & food pairing", "Pairing session with local chefs", "Wine Garden"],
    ["4:00 PM", "Youth talent showcase", "Young performers from across BC", "Main Stage"],
    ["7:00 PM", "Closing celebration", "Festival finale", "Main Stage"],
    ["10:00 PM", "Gates close", "", "All gates"]
  ]
};
