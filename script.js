/* ============================================================
   KALA HAAT — shared JavaScript (all pages)
   Modules: data, utils, currency, toast, cart, header, widgets,
   services page, bundles, forms, about counters, gallery,
   cart page, scroll reveal
   ============================================================ */
(function () {
  "use strict";

  /* ----------------------------------------------------------
     1. HELPERS
  ---------------------------------------------------------- */
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }
  function img(id, w) { // Pexels URL builder (w = width)
    return "/" + id + "/pexels-photo-" + id +
           ".jpeg?auto=compress&cs=tinysrgb&fit=crop&h=" + Math.round(w * 0.82) + "&w=" + w;
  }

  /* ----------------------------------------------------------
     2. PRODUCT DATA (18 products · 3 bundles · gallery)
  ---------------------------------------------------------- */
  var CAT_LABEL = { bamboo: "Bamboo Art", rugs: "Rugs", wallhangings: "Wall Hangings", pottery: "Pottery / Clay" };
  var ART_LABEL = { madhubani: "Madhubani", warli: "Warli", pattachitra: "Pattachitra", gond: "Gond", kalamkari: "Kalamkari", pichwai: "Pichwai" };

  var PRODUCTS = [
    { id: 1,  name: "Madhubani Bamboo Treasure Basket", cat: "bamboo", art: "madhubani", artist: "Ganga Devi · Madhubani, Bihar", price: 3499, img: img(31047258, 940),
      desc: "A lidded basket hand-painted with double-line Madhubani motifs of fish and lotus — symbols of prosperity in Mithila homes.", size: '14" × 10" × 8"', material: "Natural bamboo, natural dyes" },
    { id: 2,  name: "Warli Bamboo Serving Trays (Set of 3)", cat: "bamboo", art: "warli", artist: "Arjun Sable · Thane, Maharashtra", price: 1899, img: img(37252629, 940),
      desc: "Nested bamboo trays painted in red ochre with white Warli village scenes. Food-safe lacquer finish.", size: "S–M–L nesting set", material: "Bamboo, natural lacquer, pigment" },
    { id: 3,  name: "Gond Peacock Bamboo Table Lamp", cat: "bamboo", art: "gond", artist: "Bhajju Shyam · Bhopal, MP", price: 2799, img: img(35105858, 940),
      desc: "A woven bamboo lamp cast with Gond dot-and-dash patterns; throws dancing light shadows at night.", size: '16" H × 8" dia', material: "Bamboo, cane, LED fitting" },
    { id: 4,  name: "Pattachitra Bamboo Planter Duo", cat: "bamboo", art: "pattachitra", artist: "Raghurajpur Collective · Odisha", price: 1499, img: img(28849646, 940),
      desc: "Two handwoven planters detailed with Pattachitra narrative borders. Includes plant-liner cups.", size: '6" & 8" dia', material: "Bamboo, water-resistant coating" },
    { id: 5,  name: "Kalamkari Hand-Knotted Wool Rug", cat: "rugs", art: "kalamkari", artist: "Srikalahasti Weavers · Andhra Pradesh", price: 6999, img: img(11275299, 940),
      desc: "A dense hand-knotted rug carrying Kalamkari pen-work florals in madder red and indigo.", size: "4' × 6'", material: "Wool, natural dyes" },
    { id: 6,  name: "Warli Village Scene Dhurrie", cat: "rugs", art: "warli", artist: "Arjun Sable · Thane, Maharashtra", price: 3999, img: img(30414818, 940),
      desc: "Flat-weave cotton dhurrie embroidered with a full Warli harvest celebration.", size: "3' × 5'", material: "Handloom cotton, thread embroidery" },
    { id: 7,  name: "Madhubani Fish Motif Carpet", cat: "rugs", art: "madhubani", artist: "Ganga Devi · Madhubani, Bihar", price: 5499, img: img(35134989, 940),
      desc: "Richly patterned carpet built around Madhubani's beloved fish motif — fertility and good fortune.", size: "4' × 5.5'", material: "Wool-cotton blend, natural dyes" },
    { id: 8,  name: "Gond Tree of Life Rug", cat: "rugs", art: "gond", artist: "Bhajju Shyam · Bhopal, MP", price: 7499, img: img(30002536, 940),
      desc: "A statement Gond 'Tree of Life' rug where every branch carries birds and beasts in dotted colour.", size: "5' × 7'", material: "Wool, vegetable dyes" },
    { id: 9,  name: "Pattachitra Krishna Leela Hanging", cat: "wallhangings", art: "pattachitra", artist: "Raghurajpur Collective · Odisha", price: 4299, img: img(38781252, 940),
      desc: "Cloth-based Pattachitra scroll of Krishna's leelas, rendered with tamarind-seed glue and stone colours.", size: '20" × 36"', material: "Cotton cloth, natural colours, lacquer" },
    { id: 10, name: "Pichwai Cow & Lotus Tapestry", cat: "wallhangings", art: "pichwai", artist: "Nathdwara Artisans · Rajasthan", price: 4999, img: img(14132682, 940),
      desc: "A devotional Pichwai of lotus ponds and sacred cows, painted in the Nathdwara tradition.", size: '24" × 36"', material: "Handwoven cotton, natural pigments" },
    { id: 11, name: "Madhubani Peacock Wall Hanging", cat: "wallhangings", art: "madhubani", artist: "Ganga Devi · Madhubani, Bihar", price: 2999, img: img(8425193, 940),
      desc: "Twin peacocks in blooming branches — a classic Madhubani wedding motif, hand-painted on canvas.", size: '18" × 24"', material: "Canvas, acrylic-craft paints" },
    { id: 12, name: "Kalamkari Tree of Life Hanging", cat: "wallhangings", art: "kalamkari", artist: "Srikalahasti Weavers · Andhra Pradesh", price: 3799, img: img(12896827, 940),
      desc: "A wooden-handled wall hanging with Kalamkari's iconic tree full of peacocks and deers.", size: '22" × 30"', material: "Cotton, kalam (bamboo pen), natural dyes" },
    { id: 13, name: "Terracotta Warli Story Vase", cat: "pottery", art: "warli", artist: "Kutch Potters · Gujarat", price: 1299, img: img(37475629, 940),
      desc: "Wheel-thrown terracotta vase etched with a wrap-around Warli daily-life procession.", size: '10" H', material: "Terracotta clay, mineral pigments" },
    { id: 14, name: "Gond Dot-Pattern Clay Pot", cat: "pottery", art: "gond", artist: "Mandla Artisans · Madhya Pradesh", price: 1799, img: img(34004102, 940),
      desc: "Matt clay pot covered in hypnotic Gond dot work, fired to a deep earthy red.", size: '8" H × 7" dia', material: "Clay, natural oxide colours" },
    { id: 15, name: "Madhubani Terracotta Tea Set (6 pc)", cat: "pottery", art: "madhubani", artist: "Kumbhar Studio · Bihar", price: 2499, img: img(10526666, 940),
      desc: "Six hand-painted kulhads with Madhubani borders — chai tastes better in clay.", size: "Set of 6 kulhads", material: "Terracotta, food-safe glaze" },
    { id: 16, name: "Pattachitra Wall Plates (Set of 2)", cat: "pottery", art: "pattachitra", artist: "Raghurajpur Collective · Odisha", price: 1999, img: img(17091890, 940),
      desc: "Paired display plates hand-detailed with Pattachitra Nritya dancers. Hooks included.", size: '10" dia each', material: "Fired clay, natural colours" },
    { id: 17, name: "Pichwai Terracotta Urli Bowl", cat: "pottery", art: "pichwai", artist: "Nathdwara Artisans · Rajasthan", price: 2299, img: img(38047948, 940),
      desc: "A festive urli bowl painted with Pichwai lotus bands — perfect with floating flowers and diyas.", size: '12" dia', material: "Terracotta, hand-paint" },
    { id: 18, name: "Kalamkari Ceramic Wall Plate", cat: "pottery", art: "kalamkari", artist: "Srikalahasti Weavers · Andhra Pradesh", price: 1599, img: img(33367136, 940),
      desc: "Serving-sized ceramic plate etched with a fine Kalamkari border in ink-black and maroon.", size: '11" dia', material: "Ceramic, underglaze print" }
  ];

  var BUNDLES = [
    { id: "b1", name: "Madhubani Heritage Set", pieces: "Set of 4 framed pieces", price: 7999, was: 9996,
      img: img(13130043, 1200), save: 1997,
      desc: "The Peacock hanging plus three coordinating Madhubani frames — a ready-made gallery wall." },
    { id: "b2", name: "Folk Festive Combo", pieces: "Rug + vase + wall plate duo", price: 9499, was: 10797,
      img: img(30002567, 1200), save: 1298,
      desc: "Warli dhurrie, terracotta story vase and two Pattachitra plates for a complete festival home." },
    { id: "b3", name: "Wall Stories Collection", pieces: "Set of 8 mixed folk frames", price: 13999, was: 15992,
      img: img(39656767, 1200), save: 1993,
      desc: "Eight small-format originals across Madhubani, Warli, Gond and Kalamkari — one wall, four traditions." }
  ];

  var ITEMS = {}; // quick lookup of products + bundles by id
  PRODUCTS.forEach(function (p) { ITEMS[p.id] = p; });
  BUNDLES.forEach(function (b) { ITEMS[b.id] = b; });

  var GALLERY = [
    { img: img(27403385, 1100), cap: "Terracotta Market Bounty", meta: "Pottery · Varanasi, UP" },
    { img: img(10143677, 1100), cap: "Festival of Light Arrangement", meta: "Decor · Marigold & Diya" },
    { img: img(35134989, 1100),    cap: "Heritage Carpet Detail", meta: "Kalamkari · Andhra Pradesh" },
    { img: img(17091890, 1100),    cap: "The Potter's Harvest", meta: "Clay Works · Collective" },
    { img: img(5779553, 1100),     cap: "A Jaipur Corner, Styled", meta: "Customer Home · Brass & Wood" },
    { img: img(14132682, 1100),    cap: "Stories in the Hallway", meta: "Pichwai · Framed" },
    { img: img(11275299, 1100),    cap: "Threads of Tradition", meta: "Rugs · Hand-knotted" },
    { img: img(23494589, 1100),    cap: "The Loom at Work", meta: "Handloom · Process" },
    { img: img(8818756, 1100),     cap: "Diwali Table Setting", meta: "Styling · Seasonal" },
    { img: img(30174367, 1100),    cap: "Bamboo Weavers' Circle", meta: "Bamboo Art · Village" },
    { img: img(34431714, 1100),    cap: "Rows of Evening Diyas", meta: "Festive · Clay Lamps" },
    { img: img(13990495, 1100),    cap: "Clay Becoming Art", meta: "Studio · Kolkata" }
  ];

  /* ----------------------------------------------------------
     3. CURRENCY (INR default · USD / AED)
  ---------------------------------------------------------- */
  var RATES = {
    INR: { rate: 1,     code: "INR", locale: "en-IN" },
    USD: { rate: 0.012, code: "USD", locale: "en-US" },
    AED: { rate: 0.044, code: "AED", locale: "en-AE" }
  };
  function getCurrency() {
    var c = localStorage.getItem("kh_currency");
    return RATES[c] ? c : "INR";
  }
  function setCurrency(code) {
    if (!RATES[code]) return;
    localStorage.setItem("kh_currency", code);
    document.dispatchEvent(new CustomEvent("kh:currency"));
  }
  function money(inr) { // formatted price in active currency
    var code = getCurrency();
    var c = RATES[code];
    var val = inr * c.rate;
    try {
      return new Intl.NumberFormat(c.locale, {
        style: "currency", currency: c.code, maximumFractionDigits: 0
      }).format(val);
    } catch (e) { // fallback if Intl currency unsupported
      var sym = code === "INR" ? "₹" : (code === "USD" ? "$" : "د.إ ");
      return sym + Math.round(val).toLocaleString();
    }
  }

  /* ----------------------------------------------------------
     4. TOAST ("Added to cart", form success…)
  ---------------------------------------------------------- */
  function toast(msg) {
    var hold = $(".toast-hold");
    if (!hold) {
      hold = document.createElement("div");
      hold.className = "toast-hold";
      hold.setAttribute("aria-live", "polite");
      document.body.appendChild(hold);
    }
    var t = document.createElement("div");
    t.className = "craft-toast";
    t.innerHTML = '<span class="tick" aria-hidden="true">✓</span><span>' + esc(msg) + "</span>";
    hold.appendChild(t);
    setTimeout(function () { t.classList.add("out"); }, 2400);
    setTimeout(function () { if (t.parentNode) t.remove(); }, 2800);
  }

  /* ----------------------------------------------------------
     5. CART (localStorage · persists across pages & tabs)
  ---------------------------------------------------------- */
  var CART_KEY = "kh_cart";
  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge(true);
    document.dispatchEvent(new CustomEvent("kh:cart"));
  }
  function addToCart(id, qty) {
    qty = qty || 1;
    id = String(id);
    if (!ITEMS[id]) return;
    var cart = getCart();
    var found = null;
    cart.forEach(function (r) { if (String(r.id) === id) found = r; });
    if (found) found.qty += qty;
    else cart.push({ id: id, qty: qty });
    saveCart(cart);
    toast((ITEMS[id].name.length > 28 ? ITEMS[id].name.slice(0, 28) + "…" : ITEMS[id].name) + " added to cart");
  }
  function setQty(id, qty) {
    var cart = getCart();
    cart = cart.filter(function (r) { return String(r.id) !== String(id) || qty > 0; });
    cart.forEach(function (r) { if (String(r.id) === String(id)) r.qty = Math.max(1, qty); });
    saveCart(cart);
  }
  function removeFromCart(id) {
    saveCart(getCart().filter(function (r) { return String(r.id) !== String(id); }));
    toast("Removed from cart");
  }
  function clearCart() { saveCart([]); }
  function cartTotals() {
    var cart = getCart(), subtotal = 0, count = 0;
    cart.forEach(function (r) {
      var it = ITEMS[String(r.id)];
      if (it) { subtotal += it.price * r.qty; count += r.qty; }
    });
    var shipping = (subtotal === 0 || subtotal >= 2999) ? 0 : 149;
    return { subtotal: subtotal, shipping: shipping, total: subtotal + shipping, count: count };
  }
  function updateCartBadge(bump) {
    var n = cartTotals().count;
    $$(".cart-count").forEach(function (el) {
      el.textContent = n;
      if (bump) {
        el.classList.add("bump");
        setTimeout(function () { el.classList.remove("bump"); }, 250);
      }
    });
  }

  /* ----------------------------------------------------------
     6. GLOBAL UI INJECTION (floating buttons + gift modal)
        — identical on every page, keeps HTML lean
  ---------------------------------------------------------- */
  function injectWidgets() {
    // WhatsApp number (single place to change)
    window.KH_WA = "919876543210";
    document.body.insertAdjacentHTML("beforeend",
      '<a class="fab fab-wa" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp" ' +
      'href="https://wa.me/' + window.KH_WA + '?text=' + encodeURIComponent("Namaste! I'd like to know more about your handmade artworks.") + '">' +
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 9.88 9.9c0 5.44-4.45 9.87-9.89 9.87Zm8.42-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.94L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.16-3.47-8.4Z"/></svg></a>' +
      '<button class="fab fab-gift" data-bs-toggle="modal" data-bs-target="#giftModal" aria-label="Get gifting help">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg></button>' +
      '<div class="modal fade" id="giftModal" tabindex="-1" aria-labelledby="giftModalLabel" aria-hidden="true">' +
      '<div class="modal-dialog modal-dialog-centered"><div class="modal-content">' +
      '<div class="modal-header" style="background:var(--sand);border-bottom:1px solid rgba(201,162,75,.4)">' +
      '<h2 class="modal-title h3 mb-0" id="giftModalLabel">Gifting? Let us help 🎁</h2>' +
      '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>' +
      '<div class="modal-body p-4">' +
      '<p class="mb-3" style="font-size:14px;color:var(--muted)">Get help picking an artwork — our art planner will call you back within a few hours.</p>' +
      '<form id="giftForm" class="craft-form" novalidate>' +
      '<div class="mb-2"><label class="form-label mb-1" for="gf-name" style="font-size:13px;font-weight:500">Your name</label>' +
      '<input class="form-control" id="gf-name" type="text" required placeholder="e.g., Priya Sharma"></div>' +
      '<div class="mb-2"><label class="form-label mb-1" for="gf-phone" style="font-size:13px;font-weight:500">Phone / WhatsApp</label>' +
      '<input class="form-control" id="gf-phone" type="tel" inputmode="numeric" required placeholder="10-digit mobile number"></div>' +
      '<div class="mb-3"><label class="form-label mb-1" for="gf-note" style="font-size:13px;font-weight:500">Whom is it for? Occasion? Budget?</label>' +
      '<textarea class="form-control" id="gf-note" rows="3" placeholder="e.g., Anniversary gift for parents, under ₹5,000"></textarea></div>' +
      '<button type="submit" class="btn-rh w-100">Request Gift Advice</button>' +
      '</form></div></div></div></div>');

    // Gift form validation + fake submit
    $("#giftForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("#gf-name"), phone = $("#gf-phone");
      var ok = true;
      [name, phone].forEach(function (f) { f.classList.remove("is-invalid"); });
      if (!name.value.trim()) { name.classList.add("is-invalid"); ok = false; }
      if (!/^[6-9]\d{9}$/.test(phone.value.replace(/\s/g, ""))) { phone.classList.add("is-invalid"); ok = false; }
      if (!ok) return;
      var m = bootstrap.Modal.getInstance($("#giftModal"));
      if (m) m.hide();
      toast("Thank you, " + name.value.trim().split(" ")[0] + "! Our planner will call you soon.");
      e.target.reset();
    });
  }

  /* ----------------------------------------------------------
     7. HEADER (search → services?search=, currency select,
        sticky shadow, sign-in)
  ---------------------------------------------------------- */
  function initHeader() {
    updateCartBadge(false);
    window.addEventListener("storage", function () { updateCartBadge(false); });

    // sticky shadow
    var hdr = $(".site-header");
    function onScroll() { hdr.classList.toggle("is-stuck", window.scrollY > 8); }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // search
    $$("#searchForm, .hdr-search form").forEach(function (f) {
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        var q = (f.querySelector("input[name='search']") || {}).value || "";
        window.location.href = "services.html?search=" + encodeURIComponent(q.trim());
      });
    });

    // currency select
    var sel = $("#currencySelect");
    if (sel) {
      sel.value = getCurrency();
      sel.addEventListener("change", function () { setCurrency(sel.value); });
    }

    // sign-in placeholder
    $$(".hdr-signin").forEach(function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); toast("Sign-in is coming soon."); });
    });

    // newsletter
    $$(".f-news form, .f-news-form").forEach(function (f) {
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        var inp = f.querySelector("input");
        if (!inp || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inp.value)) {
          if (inp) { inp.classList.add("is-invalid"); }
          return;
        }
        if (inp) inp.classList.remove("is-invalid");
        toast("Welcome to the Kala Haat letter!");
        f.reset();
      });
    });
  }

  /* ----------------------------------------------------------
     8. SCROLL REVEAL (IntersectionObserver)
  ---------------------------------------------------------- */
  function initReveal() {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in-view"); io.unobserve(en.target); }
      });
    }, { threshold: .12, rootMargin: "0px 0px -30px 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ----------------------------------------------------------
     9. SERVICES PAGE — filters · URL params · sort · search
  ---------------------------------------------------------- */
  function initServices() {
    var grid = $("#productGrid");
    if (!grid) return;

    var state = { cat: "all", art: "all", search: "", sort: "new" };

    // read URL params on load
    var qs = new URLSearchParams(window.location.search);
    if (CAT_LABEL[qs.get("category")]) { state.cat = qs.get("category"); }
    if (ART_LABEL[qs.get("artform")])  { state.art = qs.get("artform"); }
    if (qs.get("search"))              { state.search = (qs.get("search") || "").toLowerCase(); }

    var searchInput = $("#svcSearch"), sortSel = $("#sortSel");
    if (searchInput) searchInput.value = state.search;

    function syncURL() {
      var p = new URLSearchParams();
      if (state.cat !== "all") p.set("category", state.cat);
      if (state.art !== "all") p.set("artform", state.art);
      if (state.search) p.set("search", state.search);
      var str = p.toString();
      history.replaceState(null, "", "services.html" + (str ? "?" + str : ""));
    }

    function matches(p) {
      if (state.cat !== "all" && p.cat !== state.cat) return false;
      if (state.art !== "all" && p.art !== state.art) return false;
      if (state.search) {
        var hay = (p.name + " " + p.artist + " " + p.desc + " " + CAT_LABEL[p.cat] + " " + ART_LABEL[p.art]).toLowerCase();
        if (hay.indexOf(state.search) === -1) return false;
      }
      return true;
    }

    function sortList(list) {
      var l = list.slice();
      if (state.sort === "price-asc")  l.sort(function (a, b) { return a.price - b.price; });
      if (state.sort === "price-desc") l.sort(function (a, b) { return b.price - a.price; });
      if (state.sort === "name")       l.sort(function (a, b) { return a.name.localeCompare(b.name); });
      if (state.sort === "new")        l.sort(function (a, b) { return b.id - a.id; });
      return l;
    }

    function cardHTML(p) {
      return '<div class="col">' +
        '<article class="p-card">' +
        '<div class="p-media">' +
          '<span class="art-tag">' + ART_LABEL[p.art] + "</span>" +
          '<img src="' + p.img + '" alt="' + esc(p.name) + ' — ' + ART_LABEL[p.art] + " " + CAT_LABEL[p.cat] + '" loading="lazy">' +
          '<button class="quick-view-btn" data-qv="' + p.id + '" aria-label="Quick view ' + esc(p.name) + '">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>' +
          "</button>" +
        "</div>" +
        '<div class="p-body">' +
          '<h3 class="p-name">' + esc(p.name) + "</h3>" +
          '<p class="p-artist mb-2">' + esc(p.artist) + "</p>" +
          '<div class="p-price">' + money(p.price) + "</div>" +
          '<div class="p-actions"><button class="btn-rh" data-add="' + p.id + '">Add to Cart</button></div>' +
        "</div></article></div>";
    }

    function render() {
      grid.classList.add("fading");
      setTimeout(function () {
        var list = sortList(PRODUCTS.filter(matches));
        if (list.length) {
          grid.innerHTML = list.map(cardHTML).join("");
        } else {
          grid.innerHTML =
            '<div class="col-12"><div class="empty-state">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>' +
              '<h2 class="mt-3 mb-1">No artworks found</h2>' +
              '<p class="text-muted" style="color:var(--muted)">Try clearing a filter or searching for something else.</p>' +
              '<button class="btn-ol mt-2" id="clearFilters">Clear all filters</button>' +
            "</div></div>";
          var cb = $("#clearFilters");
          if (cb) cb.addEventListener("click", function () {
            state.cat = "all"; state.art = "all"; state.search = "";
            if (searchInput) searchInput.value = "";
            paintChips(); syncURL(); render();
          });
        }
        var line = $("#resultsLine");
        if (line) line.textContent = "Showing " + list.length + " of " + PRODUCTS.length + " artworks";
        grid.classList.remove("fading");
      }, 240);
    }

    // chip bars
    function paintChips() {
      $$("#catChips .chip").forEach(function (c) { c.classList.toggle("active", c.dataset.cat === state.cat); });
      $$("#artChips .chip").forEach(function (c) { c.classList.toggle("active", c.dataset.art === state.art); });
    }
    $$("#catChips .chip").forEach(function (c) {
      c.addEventListener("click", function () { state.cat = c.dataset.cat; paintChips(); syncURL(); render(); });
    });
    $$("#artChips .chip").forEach(function (c) {
      c.addEventListener("click", function () { state.art = c.dataset.art; paintChips(); syncURL(); render(); });
    });

    // live search input
    if (searchInput) {
      var t;
      searchInput.addEventListener("input", function () {
        clearTimeout(t);
        t = setTimeout(function () {
          state.search = searchInput.value.trim().toLowerCase();
          syncURL(); render();
        }, 300);
      });
    }
    // sort
    if (sortSel) sortSel.addEventListener("change", function () { state.sort = sortSel.value; render(); });

    // delegated add-to-cart + quick view
    grid.addEventListener("click", function (e) {
      var add = e.target.closest("[data-add]");
      if (add) { addToCart(add.dataset.add); return; }
      var qv = e.target.closest("[data-qv]");
      if (qv) openQuickView(qv.dataset.qv);
    });

    // currency change → re-render prices
    document.addEventListener("kh:currency", render);

    paintChips(); syncURL(); render();
    renderBundles("#bundleGrid");

    /* ----- Quick View modal ----- */
    var qvModalEl = document.createElement("div");
    qvModalEl.innerHTML =
      '<div class="modal fade" id="quickViewModal" tabindex="-1" aria-hidden="true">' +
      '<div class="modal-dialog modal-lg modal-dialog-centered"><div class="modal-content">' +
      '<button type="button" class="btn-close position-absolute" style="top:14px;right:14px;z-index:5" data-bs-dismiss="modal" aria-label="Close"></button>' +
      '<div class="row g-0">' +
        '<div class="col-md-6"><img class="qv-img" id="qvImg" src="" alt=""></div>' +
        '<div class="col-md-6"><div class="p-4 d-flex flex-column h-100">' +
          '<span class="art-tag position-static align-self-start mb-2" id="qvTag"></span>' +
          '<h2 class="h3 mb-1" id="qvName"></h2>' +
          '<p style="font-size:13px;color:var(--muted)" id="qvArtist"></p>' +
          '<p id="qvDesc" style="font-size:14px"></p>' +
          '<div class="qv-spec"><span>Art form</span><b id="qvArt"></b></div>' +
          '<div class="qv-spec"><span>Size</span><b id="qvSize"></b></div>' +
          '<div class="qv-spec"><span>Material</span><b id="qvMat"></b></div>' +
          '<div class="d-flex align-items-center justify-content-between mt-3">' +
            '<strong class="h3 mb-0" id="qvPrice" style="color:var(--maroon)"></strong>' +
            '<div class="qty-ctl"><button type="button" id="qvMinus" aria-label="Decrease quantity">−</button><span id="qvQty">1</span><button type="button" id="qvPlus" aria-label="Increase quantity">+</button></div>' +
          "</div>" +
          '<button class="btn-rh mt-3 w-100" id="qvAdd">Add to Cart</button>' +
        "</div></div>" +
      "</div></div></div></div>";
    document.body.appendChild(qvModalEl.firstElementChild);

    var qvId = null, qvQty = 1;
    function openQuickView(id) {
      var p = ITEMS[String(id)];
      if (!p) return;
      qvId = String(id); qvQty = 1;
      $("#qvImg").src = p.img;
      $("#qvImg").alt = p.name + " — " + ART_LABEL[p.art] + " artwork";
      $("#qvTag").textContent = ART_LABEL[p.art];
      $("#qvName").textContent = p.name;
      $("#qvArtist").textContent = p.artist;
      $("#qvDesc").textContent = p.desc;
      $("#qvArt").textContent = ART_LABEL[p.art] + " · " + CAT_LABEL[p.cat];
      $("#qvSize").textContent = p.size;
      $("#qvMat").textContent = p.material;
      $("#qvPrice").textContent = money(p.price);
      $("#qvQty").textContent = qvQty;
      bootstrap.Modal.getOrCreateInstance($("#quickViewModal")).show();
    }
    $("#qvMinus").addEventListener("click", function () {
      qvQty = Math.max(1, qvQty - 1); $("#qvQty").textContent = qvQty;
    });
    $("#qvPlus").addEventListener("click", function () {
      qvQty = Math.min(9, qvQty + 1); $("#qvQty").textContent = qvQty;
    });
    $("#qvAdd").addEventListener("click", function () {
      addToCart(qvId, qvQty);
      bootstrap.Modal.getInstance($("#quickViewModal")).hide();
    });

    /* ----- Custom enquiry form ----- */
    var form = $("#customForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var name = $("#cu-name"), email = $("#cu-email"), phone = $("#cu-phone"), cat = $("#cu-cat"), msg = $("#cu-msg");
        var ok = true;
        [name, email, phone, cat, msg].forEach(function (f) { f.classList.remove("is-invalid"); });
        if (!name.value.trim()) { name.classList.add("is-invalid"); ok = false; }
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) { email.classList.add("is-invalid"); ok = false; }
        if (!/^[6-9]\d{9}$/.test(phone.value.replace(/\s/g, ""))) { phone.classList.add("is-invalid"); ok = false; }
        if (!cat.value) { cat.classList.add("is-invalid"); ok = false; }
        if (msg.value.trim().length < 10) { msg.classList.add("is-invalid"); ok = false; }
        if (!ok) return;
        var wrap = $("#formSuccess");
        if (wrap) wrap.classList.remove("d-none");
        toast("Enquiry sent! We will reach out within 24 hours.");
        form.reset();
      });
    }
  }

  /* ----------------------------------------------------------
     10. BIG ART SETS (bundles) renderer
  ---------------------------------------------------------- */
  function renderBundles(sel) {
    var hold = $(sel || "#bundleGrid");
    if (!hold) return;
    hold.innerHTML = BUNDLES.map(function (b) {
      return '<div class="col-md-6 col-lg-4">' +
        '<article class="bundle-card">' +
          '<div class="bundle-media">' +
            '<span class="bundle-badge">Save ' + money(b.save) + "</span>" +
            '<img src="' + b.img + '" alt="' + esc(b.name) + ' — ' + esc(b.pieces) + '" loading="lazy">' +
          "</div>" +
          '<div class="bundle-body">' +
            '<h3>' + esc(b.name) + "</h3>" +
            '<p class="bundle-meta mb-1">' + esc(b.pieces) + "</p>" +
            '<p style="font-size:13.5px;color:var(--muted)">' + esc(b.desc) + "</p>" +
            '<div class="bundle-price mt-auto"><span class="old">' + money(b.was) + '</span><span class="now">' + money(b.price) + "</span></div>" +
            '<button class="btn-rh mt-2" data-bundle="' + b.id + '">Add set to cart</button>' +
          "</div>" +
        "</article></div>";
    }).join("");
    hold.querySelectorAll("[data-bundle]").forEach(function (btn) {
      btn.addEventListener("click", function () { addToCart(btn.dataset.bundle); });
    });
    // one-time: re-render bundle prices when currency changes
    if (!hold.dataset.khBound) {
      hold.dataset.khBound = "1";
      document.addEventListener("kh:currency", function () { renderBundles(sel); });
    }
  }

  /* ----------------------------------------------------------
     11. ABOUT PAGE — animated counters
  ---------------------------------------------------------- */
  function initCounters() {
    var nums = $$("[data-count]");
    if (!nums.length) return;
    function animate(el) {
      var target = parseInt(el.dataset.count, 10) || 0;
      var suffix = el.dataset.suffix || "";
      var dur = 1500, t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString("en-IN") + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if (!("IntersectionObserver" in window)) { nums.forEach(animate); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animate(en.target); io.unobserve(en.target); }
      });
    }, { threshold: .4 });
    nums.forEach(function (el) { io.observe(el); });
  }

  /* ----------------------------------------------------------
     12. GALLERY PAGE — render grid + lightbox
  ---------------------------------------------------------- */
  function initGallery() {
    var hold = $("#galleryGrid");
    if (!hold) return;
    hold.innerHTML = GALLERY.map(function (g, i) {
      return '<figure tabindex="0" role="button" data-lb="' + i + '" aria-label="View ' + esc(g.cap) + ' larger">' +
        '<img src="' + g.img + '" alt="' + esc(g.cap) + " — " + esc(g.meta) + '" loading="lazy">' +
        "<figcaption><strong>" + esc(g.cap) + "</strong><span>" + esc(g.meta) + "</span></figcaption></figure>";
    }).join("");

    // lightbox modal (injected once)
    var lb = document.createElement("div");
    lb.innerHTML =
      '<div class="modal fade lb-back" id="artLightbox" tabindex="-1" aria-hidden="true">' +
      '<div class="modal-dialog modal-dialog-centered modal-xl">' +
      '<div class="modal-content bg-transparent border-0">' +
      '<button class="lb-close" data-bs-dismiss="modal" aria-label="Close">×</button>' +
      '<div class="lb-stage">' +
      '<img id="lbImg" src="" alt="">' +
      '<button class="lb-btn lb-prev" id="lbPrev" aria-label="Previous">‹</button>' +
      '<button class="lb-btn lb-next" id="lbNext" aria-label="Next">›</button>' +
      "</div>" +
      '<div class="lb-meta"><strong id="lbCap"></strong><span id="lbMeta"></span></div>' +
      "</div></div></div>";
    document.body.appendChild(lb.firstElementChild);

    var cur = 0;
    function open(i) {
      cur = (i + GALLERY.length) % GALLERY.length;
      $("#lbImg").src = GALLERY[cur].img;
      $("#lbImg").alt = GALLERY[cur].cap;
      $("#lbCap").textContent = GALLERY[cur].cap;
      $("#lbMeta").textContent = GALLERY[cur].meta + " · " + (cur + 1) + " / " + GALLERY.length;
      bootstrap.Modal.getOrCreateInstance($("#artLightbox")).show();
    }
    hold.addEventListener("click", function (e) {
      var f = e.target.closest("[data-lb]");
      if (f) open(+f.dataset.lb);
    });
    hold.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      var f = e.target.closest("[data-lb]");
      if (f) open(+f.dataset.lb);
    });
    $("#lbPrev").addEventListener("click", function (e) { e.stopPropagation(); open(cur - 1); });
    $("#lbNext").addEventListener("click", function (e) { e.stopPropagation(); open(cur + 1); });
    document.addEventListener("keydown", function (e) {
      if (!$("#artLightbox").classList.contains("show")) return;
      if (e.key === "ArrowLeft") open(cur - 1);
      if (e.key === "ArrowRight") open(cur + 1);
    });
  }

  /* ----------------------------------------------------------
     13. CART PAGE — items, qty, summary, checkout, WhatsApp order
  ---------------------------------------------------------- */
  function initCartPage() {
    var wrap = $("#cartWrap");
    if (!wrap) return;

    function rowHTML(r) {
      var it = ITEMS[String(r.id)];
      if (!it) return "";
      var line = it.price * r.qty;
      return '<div class="cart-item mb-3" data-row="' + r.id + '">' +
        '<img src="' + it.img + '" alt="' + esc(it.name) + '" loading="lazy">' +
        '<div class="flex-grow-1">' +
          '<div class="ci-name">' + esc(it.name) + "</div>" +
          '<div class="ci-meta mb-2">' + esc(it.artist || it.pieces || "") + "</div>" +
          '<div class="d-flex align-items-center gap-3 flex-wrap">' +
            '<div class="qty-ctl">' +
              '<button type="button" data-dec="' + r.id + '" aria-label="Decrease quantity">−</button>' +
              "<span>" + r.qty + "</span>" +
              '<button type="button" data-inc="' + r.id + '" aria-label="Increase quantity">+</button>' +
            "</div>" +
            '<button class="ci-remove" data-rm="' + r.id + '">Remove</button>' +
          "</div>" +
        "</div>" +
        '<div class="text-end">' +
          '<div class="ci-price">' + money(it.price) + "</div>" +
          '<div class="ci-total">' + money(line) + "</div>" +
        "</div>" +
      "</div>";
    }

    function render() {
      var cart = getCart();
      var itemsEl = $("#cartItems");
      if (!cart.length) {
        wrap.innerHTML =
          '<div class="cart-empty"><svg class="big-bag" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M6 7h12l1 14H5L6 7Z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/></svg>' +
          '<h2 class="mt-3 mb-1">Your cart is empty</h2>' +
          '<p style="color:var(--muted)">Beautiful handmade pieces are waiting for you.</p>' +
          '<a class="btn-rh mt-2" href="services.html">Continue Shopping</a></div>';
        return;
      }
      var t = cartTotals();
      wrap.innerHTML =
        '<div class="row g-4">' +
          '<div class="col-lg-8"><div id="cartItems">' + cart.map(rowHTML).join("") + "</div></div>" +
          '<div class="col-lg-4"><aside class="summary-card" aria-label="Order summary">' +
            "<h3>Order Summary</h3>" +
            '<div class="sum-row"><span>Subtotal (' + t.count + (t.count === 1 ? " item" : " items") + ")</span><strong>" + money(t.subtotal) + "</strong></div>" +
            '<div class="sum-row"><span>Shipping</span><strong>' + (t.shipping === 0 ? "FREE" : money(t.shipping)) + "</strong></div>" +
            '<div class="free-ship-note">' +
              (t.subtotal >= 2999
                ? '<span class="ok">✓ You\'ve unlocked FREE shipping!</span>'
                : "Add " + money(2999 - t.subtotal) + " more for FREE shipping") +
            "</div>" +
            '<div class="sum-row total"><span>Grand Total</span><strong>' + money(t.total) + "</strong></div>" +
            '<button class="btn-rh w-100 mt-3" data-bs-toggle="modal" data-bs-target="#checkoutModal">Proceed to Checkout</button>' +
            '<button class="wa-order mt-2" id="waOrder">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 9.88 9.9c0 5.44-4.45 9.87-9.89 9.87Zm8.42-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.94L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.16-3.47-8.4Z"/></svg>' +
              "Order via WhatsApp</button>" +
            '<a class="btn-ol w-100 mt-2" href="services.html">Continue Shopping</a>' +
          "</aside></div>" +
        "</div>";

      // wire item controls
      $$("#cartItems [data-inc]").forEach(function (b) {
        b.addEventListener("click", function () {
          var r = getCart().filter(function (x) { return String(x.id) === b.dataset.inc; })[0];
          if (r) setQty(r.id, r.qty + 1);
        });
      });
      $$("#cartItems [data-dec]").forEach(function (b) {
        b.addEventListener("click", function () {
          var r = getCart().filter(function (x) { return String(x.id) === b.dataset.dec; })[0];
          if (r) setQty(r.id, r.qty - 1);
        });
      });
      $$("#cartItems [data-rm]").forEach(function (b) {
        b.addEventListener("click", function () { removeFromCart(b.dataset.rm); });
      });

      // WhatsApp order with prefilled items + total (INR)
      var wa = $("#waOrder");
      if (wa) wa.addEventListener("click", function () {
        var lines = getCart().map(function (r) {
          var it = ITEMS[String(r.id)];
          return "• " + it.name + " × " + r.qty + " — " + moneyInr(it.price * r.qty);
        });
        var msg = "Namaste! I'd like to place an order:\n\n" + lines.join("\n") +
                  "\n\nTotal: " + moneyInr(cartTotals().total) +
                  (cartTotals().shipping === 0 ? " (Free shipping)" : " (incl. shipping " + moneyInr(149) + ")");
        window.open("https://wa.me/" + window.KH_WA + "?text=" + encodeURIComponent(msg), "_blank");
      });
    }

    function moneyInr(v) {
      try { return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v); }
      catch (e) { return "₹" + v.toLocaleString(); }
    }

    // re-render on cart / currency change
    document.addEventListener("kh:cart", render);
    document.addEventListener("kh:currency", render);

    /* ----- Checkout modal + success ----- */
    var ck = document.createElement("div");
    ck.innerHTML =
      '<div class="modal fade" id="checkoutModal" tabindex="-1" aria-hidden="true">' +
      '<div class="modal-dialog modal-dialog-centered"><div class="modal-content">' +
      '<div class="modal-header" style="background:var(--sand);border-bottom:1px solid rgba(201,162,75,.4)">' +
      '<h2 class="modal-title h3 mb-0">Delivery Details</h2>' +
      '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>' +
      '<div class="modal-body p-4"><form id="checkoutForm" class="craft-form" novalidate>' +
      '<div class="mb-2"><label class="form-label mb-1" for="ck-name" style="font-size:13px;font-weight:500">Full name</label>' +
      '<input class="form-control" id="ck-name" required placeholder="e.g., Ananya Rao"></div>' +
      '<div class="mb-2"><label class="form-label mb-1" for="ck-phone" style="font-size:13px;font-weight:500">Phone</label>' +
      '<input class="form-control" id="ck-phone" type="tel" inputmode="numeric" required placeholder="10-digit mobile number"></div>' +
      '<div class="mb-2"><label class="form-label mb-1" for="ck-address" style="font-size:13px;font-weight:500">Address</label>' +
      '<textarea class="form-control" id="ck-address" rows="2" required placeholder="House, street, landmark"></textarea></div>' +
      '<div class="row g-2 mb-3"><div class="col-6">' +
      '<label class="form-label mb-1" for="ck-city" style="font-size:13px;font-weight:500">City</label>' +
      '<input class="form-control" id="ck-city" required placeholder="City"></div><div class="col-6">' +
      '<label class="form-label mb-1" for="ck-pin" style="font-size:13px;font-weight:500">Pincode</label>' +
      '<input class="form-control" id="ck-pin" inputmode="numeric" required placeholder="6-digit PIN"></div></div>' +
      '<button class="btn-rh w-100" type="submit">Place Order</button>' +
      '</form></div></div></div></div>';
    document.body.appendChild(ck.firstElementChild);

    $("#checkoutForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("#ck-name"), phone = $("#ck-phone"), addr = $("#ck-address"), city = $("#ck-city"), pin = $("#ck-pin");
      var ok = true;
      [name, phone, addr, city, pin].forEach(function (f) { f.classList.remove("is-invalid"); });
      if (!name.value.trim()) { name.classList.add("is-invalid"); ok = false; }
      if (!/^[6-9]\d{9}$/.test(phone.value.replace(/\s/g, ""))) { phone.classList.add("is-invalid"); ok = false; }
      if (addr.value.trim().length < 8) { addr.classList.add("is-invalid"); ok = false; }
      if (!city.value.trim()) { city.classList.add("is-invalid"); ok = false; }
      if (!/^\d{6}$/.test(pin.value.replace(/\s/g, ""))) { pin.classList.add("is-invalid"); ok = false; }
      if (!ok) return;

      var total = money(cartTotals().total); // capture before clearing
      var m = bootstrap.Modal.getInstance($("#checkoutModal"));
      if (m) m.hide();
      clearCart();
      wrap.innerHTML =
        '<div class="order-success">' +
          '<div class="ok-ring"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></div>' +
          "<h2>Order placed, thank you!</h2>" +
          '<p style="color:var(--muted);max-width:420px;margin:0 auto">Your order of <b>' + total + "</b> is confirmed. Our team will call you shortly to arrange shipping. Handmade with love, shipped with care.</p>" +
          '<a class="btn-rh mt-3" href="services.html">Continue Shopping</a>' +
        "</div>";
      toast("Order placed successfully!");
      e.target.reset();
    });

    render();
  }

  /* ----------------------------------------------------------
     14. BOOT
  ---------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    injectWidgets();   // floating WA + gift modal (every page)
    initHeader();      // search, currency, sticky, newsletter
    initReveal();      // scroll animations
    initServices();    // services.html (no-op elsewhere)
    initCounters();    // about.html counters
    initGallery();     // gallery.html
    initCartPage();    // cart.html
    renderBundles();   // if a #bundleGrid exists on home too
  });
})();
