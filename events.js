/* =====================================================
   CEREMONY SQUAD — events.js
   Events Page · Vanilla JavaScript
   ===================================================== */
"use strict";

/* ══════════════════════════════════════════
   EVENT DATA
══════════════════════════════════════════ */
const EVENTS = [
  {
    id: 1, title: "The Kapoor–Mehta Grand Wedding Gala",
    type: "Wedding", city: "Udaipur", month: 6,
    date: "14–16 June 2026", price: 4500, seats: 350, seatsLeft: 48,
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80",
    desc: "Three days of curated ceremonies, floral pavilions, and live orchestral performances at the Leela Palace.",
    venue: "Leela Palace, Udaipur"
  },
  {
    id: 2, title: "Horizon Tech Annual Gala 2026",
    type: "Corporate", city: "Mumbai", month: 7,
    date: "22 July 2026", price: 3200, seats: 400, seatsLeft: 120,
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    desc: "A black-tie awards evening celebrating innovation with a curated tasting menu and bespoke entertainment.",
    venue: "The Oberoi, Mumbai"
  },
  {
    id: 3, title: "Maldives Sunset Soirée",
    type: "Luxury Event", city: "Maldives", month: 9,
    date: "5 September 2026", price: 12000, seats: 80, seatsLeft: 12,
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80",
    desc: "An over-water gathering with floating floral arrangements, a DJ set under the stars and Michelin-chef dinner.",
    venue: "Velaa Private Island, Maldives"
  },
  {
    id: 4, title: "Sunita's Grand 50th Soirée",
    type: "Birthday", city: "Jaipur", month: 8,
    date: "18 August 2026", price: 2800, seats: 120, seatsLeft: 35,
    img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80",
    desc: "An extravagant milestone birthday celebration with live performers, custom décor and a 5-course gala dinner.",
    venue: "ITC Grand Bharat, Jaipur"
  },
  {
    id: 5, title: "Tuscany Destination Wedding — The Ranas",
    type: "Destination", city: "Tuscany", month: 10,
    date: "8 October 2026", price: 18500, seats: 60, seatsLeft: 20,
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    desc: "A breathtaking vineyard ceremony at sunset with a 3-day wedding weekend in the heart of Tuscany.",
    venue: "Castello di Ama, Tuscany"
  },
  {
    id: 6, title: "Bangalore New Year's Eve Gala",
    type: "Gala", city: "Bangalore", month: 12,
    date: "31 December 2026", price: 5500, seats: 200, seatsLeft: 88,
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
    desc: "Ring in 2027 with a world-class New Year's Eve celebration: live bands, fireworks and a luxury 5-course dinner.",
    venue: "The Leela Palace, Bangalore"
  },
  {
    id: 7, title: "Delhi Spring Wedding Fair",
    type: "Wedding", city: "Delhi", month: 6,
    date: "21 June 2026", price: 1200, seats: 500, seatsLeft: 210,
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80",
    desc: "India's premier wedding showcase featuring top vendors, décor installations, catering tastings and bridal experiences.",
    venue: "Jawaharlal Nehru Stadium, Delhi"
  },
  {
    id: 8, title: "Goa Beach Corporate Retreat",
    type: "Corporate", city: "Goa", month: 9,
    date: "14 September 2026", price: 6800, seats: 80, seatsLeft: 0,
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
    desc: "A 3-day all-inclusive corporate retreat combining team-building, strategy sessions and beachside luxury.",
    venue: "Taj Exotica, Goa"
  },
  {
    id: 9, title: "Mumbai Rooftop Birthday Gala",
    type: "Birthday", city: "Mumbai", month: 8,
    date: "30 August 2026", price: 3800, seats: 90, seatsLeft: 42,
    img: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=600&q=80",
    desc: "An ultra-chic rooftop celebration with panoramic city views, cocktails and a live DJ performance.",
    venue: "Trident Nariman Point, Mumbai"
  },
  {
    id: 10, title: "Udaipur Royal Anniversary Gala",
    type: "Luxury Event", city: "Udaipur", month: 11,
    date: "15 November 2026", price: 9500, seats: 100, seatsLeft: 55,
    img: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600&q=80",
    desc: "Celebrate love and milestones in a palace setting with traditional folk performances and a royal banquet.",
    venue: "City Palace, Udaipur"
  },
  {
    id: 11, title: "Jaipur Heritage Wedding Walk",
    type: "Destination", city: "Jaipur", month: 10,
    date: "20 October 2026", price: 7200, seats: 45, seatsLeft: 18,
    img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",
    desc: "A heritage walk-style destination wedding through Jaipur's old city, culminating in a candlelit palace reception.",
    venue: "Samode Palace, Jaipur"
  },
  {
    id: 12, title: "Delhi Corporate Awards Night",
    type: "Corporate", city: "Delhi", month: 11,
    date: "8 November 2026", price: 4200, seats: 300, seatsLeft: 145,
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80",
    desc: "A prestigious black-tie awards ceremony honouring industry excellence with keynote speakers and entertainment.",
    venue: "Hyatt Regency, Delhi"
  }
];

/* ══════════════════════════════════════════
   GLOBALS
══════════════════════════════════════════ */
const ITEMS_PER_PAGE = 6;
let visibleCount     = ITEMS_PER_PAGE;
let filteredEvents   = [...EVENTS];
let activeTicketData = null;
let ticketStep       = 1;
let selectedTicketType = "standard";
let ticketQty        = 1;
const TICKET_MULTIPLIERS = { standard: 1, premium: 1.6, vip: 2.5 };
const TICKET_LABELS      = { standard: "Standard", premium: "Premium", vip: "VIP Table" };

/* ══════════════════════════════════════════
   1. JS-READY + SCROLL REVEAL
══════════════════════════════════════════ */
document.body.classList.add("js-ready");

function revealInView() {
  document.querySelectorAll(
    ".reveal-up:not(.visible),.reveal-left:not(.visible),.reveal-right:not(.visible)"
  ).forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight + 120)
      el.classList.add("visible");
  });
}

if ("IntersectionObserver" in window) {
  const ro = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); ro.unobserve(e.target); } }),
    { threshold: 0.01, rootMargin: "120px 0px 120px 0px" }
  );
  document.querySelectorAll(".reveal-up,.reveal-left,.reveal-right").forEach(el => ro.observe(el));
} else {
  document.querySelectorAll(".reveal-up,.reveal-left,.reveal-right").forEach(el => el.classList.add("visible"));
}

revealInView();
window.addEventListener("scroll", revealInView, { passive: true });
window.addEventListener("load", revealInView);
setTimeout(revealInView, 100);
setTimeout(revealInView, 600);

/* ══════════════════════════════════════════
   2. HEADER + BACK TO TOP
══════════════════════════════════════════ */
const header   = document.getElementById("header");
const bttBtn   = document.getElementById("backToTop");
const waFloat  = document.getElementById("waFloat");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 60);
  bttBtn.classList.toggle("visible",  window.scrollY > 500);
}, { passive: true });

bttBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* WhatsApp float fade-in */
setTimeout(() => {
  if (waFloat) { waFloat.style.opacity = "1"; waFloat.style.transition = "opacity .6s ease, transform .38s ease, box-shadow .38s ease"; }
}, 1400);

/* ══════════════════════════════════════════
   3. HAMBURGER
══════════════════════════════════════════ */
const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  hamburger.classList.remove("active"); navLinks.classList.remove("open");
}));
document.addEventListener("click", e => {
  if (!header.contains(e.target)) { hamburger.classList.remove("active"); navLinks.classList.remove("open"); }
});

/* ══════════════════════════════════════════
   4. SMOOTH SCROLL ANCHORS
══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const t = document.querySelector(a.getAttribute("href"));
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - header.offsetHeight - 16, behavior: "smooth" });
  });
});

/* ══════════════════════════════════════════
   5. RENDER EVENTS
══════════════════════════════════════════ */
function formatPrice(n) { return "₹" + n.toLocaleString("en-IN"); }

function buildCard(ev) {
  const soldOut  = ev.seatsLeft === 0;
  const fewLeft  = ev.seatsLeft > 0 && ev.seatsLeft <= 20;
  const badge    = soldOut  ? `<div class="ev-card-sold-badge">Sold Out</div>`
                 : fewLeft  ? `<div class="ev-card-few-badge">Only ${ev.seatsLeft} left!</div>`
                 : "";
  const bookBtn  = soldOut
    ? `<button class="btn-sm" disabled style="opacity:.5;cursor:not-allowed">Sold Out</button>`
    : `<button class="btn-sm book-btn"
        data-event="${ev.title}" data-price="${ev.price}"
        data-date="${ev.date}" data-city="${ev.city}"
        data-type="${ev.type}" data-seats="${ev.seatsLeft}"
        data-img="${ev.img}">Book →</button>`;

  return `
    <div class="ev-card" data-id="${ev.id}">
      <div class="ev-card-img">
        <img src="${ev.img}" alt="${ev.title}" loading="lazy" />
        <div class="ev-card-date-pill">${ev.date}</div>
        ${badge}
      </div>
      <div class="ev-card-body">
        <span class="ev-tag ${ev.type.toLowerCase().replace(/\s/g,'-').replace('luxury-event','luxury')}">${ev.type}</span>
        <h3>${ev.title}</h3>
        <p>${ev.desc}</p>
        <div class="ev-card-meta">
          <span>&#128205; ${ev.venue}</span>
          <span>&#127891; ${soldOut ? "Sold Out" : ev.seatsLeft + " seats available"}</span>
        </div>
        <div class="ev-card-footer">
          <div class="ev-card-price">
            <span class="price">${formatPrice(ev.price)}</span>
            <span class="price-label">per person</span>
          </div>
          ${bookBtn}
        </div>
      </div>
    </div>`;
}

function renderGrid() {
  const grid    = document.getElementById("eventsGrid");
  const noRes   = document.getElementById("noResults");
  const lmWrap  = document.getElementById("loadMoreWrap");
  const resCount = document.getElementById("resultsCount");

  if (!grid) return;

  const toShow = filteredEvents.slice(0, visibleCount);

  if (filteredEvents.length === 0) {
    grid.innerHTML = "";
    noRes.style.display = "block";
    lmWrap.style.display = "none";
    resCount.textContent = "No events found";
    return;
  }

  noRes.style.display = "none";
  grid.innerHTML = toShow.map(buildCard).join("");
  resCount.textContent = `Showing ${toShow.length} of ${filteredEvents.length} event${filteredEvents.length !== 1 ? "s" : ""}`;
  lmWrap.style.display = filteredEvents.length > visibleCount ? "block" : "none";

  // Re-attach book buttons
  grid.querySelectorAll(".book-btn").forEach(btn => btn.addEventListener("click", () => openTicketModal(btn.dataset)));

  // Reveal cards
  setTimeout(() => grid.querySelectorAll(".ev-card").forEach(c => c.classList.add("visible")), 60);
}

/* ══════════════════════════════════════════
   6. FILTERS
══════════════════════════════════════════ */
let activeType  = "all";
let activeCity  = "all";
let activeMonth = "all";
let activePrice = "all";
let activeSort  = "date-asc";
let searchQ     = "";

function applyFilters() {
  visibleCount = ITEMS_PER_PAGE;
  filteredEvents = EVENTS.filter(ev => {
    const typeOk  = activeType  === "all" || ev.type === activeType;
    const cityOk  = activeCity  === "all" || ev.city === activeCity;
    const monthOk = activeMonth === "all" || ev.month === parseInt(activeMonth);
    const searchOk = !searchQ || ev.title.toLowerCase().includes(searchQ) || ev.city.toLowerCase().includes(searchQ) || ev.type.toLowerCase().includes(searchQ);

    let priceOk = true;
    if (activePrice !== "all") {
      const [lo, hi] = activePrice.split("-").map(x => x === "15000+" ? Infinity : parseInt(x));
      priceOk = ev.price >= lo && ev.price <= (hi || Infinity);
    }
    return typeOk && cityOk && monthOk && priceOk && searchOk;
  });

  // Sort
  filteredEvents.sort((a, b) => {
    if (activeSort === "date-asc")   return a.month - b.month || a.id - b.id;
    if (activeSort === "date-desc")  return b.month - a.month || b.id - a.id;
    if (activeSort === "price-asc")  return a.price - b.price;
    if (activeSort === "price-desc") return b.price - a.price;
    return 0;
  });

  renderGrid();
}

/* Type pills */
document.querySelectorAll(".fpill").forEach(pill => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".fpill").forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
    activeType = pill.dataset.type;
    applyFilters();
  });
});

/* Selects */
document.getElementById("cityFilter").addEventListener("change",  e => { activeCity  = e.target.value; applyFilters(); });
document.getElementById("monthFilter").addEventListener("change", e => { activeMonth = e.target.value; applyFilters(); });
document.getElementById("priceFilter").addEventListener("change", e => { activePrice = e.target.value; applyFilters(); });
document.getElementById("sortFilter").addEventListener("change",  e => { activeSort  = e.target.value; applyFilters(); });

/* Search */
const searchInput = document.getElementById("searchInput");
const searchClear = document.getElementById("searchClear");
let searchTimer;

searchInput.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchQ = searchInput.value.toLowerCase().trim();
  searchClear.classList.toggle("show", searchQ.length > 0);
  searchTimer = setTimeout(applyFilters, 280);
});

searchClear.addEventListener("click", () => {
  searchInput.value = "";
  searchQ = "";
  searchClear.classList.remove("show");
  applyFilters();
});

/* Reset */
function resetAllFilters() {
  activeType  = "all"; activeCity = "all";
  activeMonth = "all"; activePrice = "all";
  activeSort  = "date-asc"; searchQ = "";
  searchInput.value = "";
  searchClear.classList.remove("show");
  document.querySelectorAll(".fpill").forEach((p, i) => p.classList.toggle("active", i === 0));
  document.getElementById("cityFilter").value  = "all";
  document.getElementById("monthFilter").value = "all";
  document.getElementById("priceFilter").value = "all";
  document.getElementById("sortFilter").value  = "date-asc";
  applyFilters();
}

document.getElementById("resetFilters").addEventListener("click", resetAllFilters);
const resetEmpty = document.getElementById("resetFromEmpty");
if (resetEmpty) resetEmpty.addEventListener("click", resetAllFilters);

/* Load more */
document.getElementById("loadMoreBtn").addEventListener("click", () => {
  visibleCount += ITEMS_PER_PAGE;
  renderGrid();
  setTimeout(revealInView, 100);
});

/* View toggle */
const evGrid = document.getElementById("eventsGrid");
document.getElementById("gridView").addEventListener("click", function () {
  evGrid.classList.remove("list-view");
  document.getElementById("gridView").classList.add("active");
  document.getElementById("listView").classList.remove("active");
});
document.getElementById("listView").addEventListener("click", function () {
  evGrid.classList.add("list-view");
  document.getElementById("listView").classList.add("active");
  document.getElementById("gridView").classList.remove("active");
});

/* ══════════════════════════════════════════
   7. CALENDAR STRIP
══════════════════════════════════════════ */
function buildCalendar() {
  const strip = document.getElementById("calStrip");
  if (!strip) return;

  const months = [
    { n: "June 2026",     m: 6  },
    { n: "July 2026",     m: 7  },
    { n: "August 2026",   m: 8  },
    { n: "September 2026",m: 9  },
    { n: "October 2026",  m: 10 },
    { n: "November 2026", m: 11 },
    { n: "December 2026", m: 12 },
  ];

  strip.innerHTML = months.map(mo => {
    const evs = EVENTS.filter(e => e.month === mo.m);
    const evList = evs.slice(0, 3).map(e =>
      `<div class="cal-month-event">${e.title.length > 28 ? e.title.slice(0,28)+"…" : e.title}</div>`
    ).join("");
    const more = evs.length > 3 ? `<div class="cal-month-event" style="color:var(--gold)">+${evs.length-3} more</div>` : "";

    return `
      <div class="cal-month" data-month="${mo.m}" title="Click to filter by ${mo.n}">
        <div class="cal-month-name">${mo.n}</div>
        <div class="cal-month-count">${evs.length} event${evs.length !== 1 ? "s" : ""}</div>
        <div class="cal-month-events">${evList}${more}</div>
      </div>`;
  }).join("");

  /* Click to filter */
  strip.querySelectorAll(".cal-month").forEach(card => {
    card.addEventListener("click", () => {
      activeMonth = card.dataset.month;
      document.getElementById("monthFilter").value = activeMonth;
      applyFilters();
      document.getElementById("events-grid").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* ══════════════════════════════════════════
   8. SPOTLIGHT BOOK BUTTONS
══════════════════════════════════════════ */
document.querySelectorAll(".book-btn").forEach(btn => {
  btn.addEventListener("click", () => openTicketModal(btn.dataset));
});

/* ══════════════════════════════════════════
   9. TICKET MODAL
══════════════════════════════════════════ */
const ticketModal  = document.getElementById("ticketModal");
const tmBackdrop   = document.getElementById("tmBackdrop");
const tmPanel      = document.getElementById("tmPanel");
const tmCloseBtn   = document.getElementById("tmClose");
const tmPrevBtn    = document.getElementById("tmPrev");
const tmNextBtn    = document.getElementById("tmNext");
const tmSuccessEl  = document.getElementById("tmSuccess");
const tmSuccessClose = document.getElementById("tmSuccessClose");
const tmForm       = document.getElementById("tmForm");

/* Validators */
const tmRules = {
  1: [
    { id:"tFirstName", errId:"tFirstNameErr", check: v => v.trim().length >= 2, msg:"Enter your first name."   },
    { id:"tLastName",  errId:"tLastNameErr",  check: v => v.trim().length >= 2, msg:"Enter your last name."    },
    { id:"tEmail",     errId:"tEmailErr",     check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg:"Enter a valid email." },
    { id:"tPhone",     errId:"tPhoneErr",     check: v => v.trim().length >= 7, msg:"Enter a valid phone number." },
  ],
  3: [
    { id:"tTerms", errId:"tTermsErr", check: () => document.getElementById("tTerms").checked, msg:"Please accept the terms." },
  ]
};

function validateTmStep(step) {
  const rules = tmRules[step] || [];
  let ok = true;
  rules.forEach(rule => {
    const el  = document.getElementById(rule.id);
    const err = document.getElementById(rule.errId);
    if (!el || !err) return;
    const pass = rule.check(el.value);
    err.textContent = pass ? "" : rule.msg;
    if (el.type !== "checkbox") {
      el.classList.toggle("t-err", !pass);
      el.classList.toggle("t-ok",   pass && el.value.trim() !== "");
    }
    if (!pass) ok = false;
  });
  return ok;
}

function goTicketStep(n) {
  n = Math.max(1, Math.min(3, n));

  document.querySelectorAll(".tm-step-content").forEach(c => c.classList.remove("active"));
  const pane = document.querySelector(`.tm-step-content[data-step="${n}"]`);
  if (pane) pane.classList.add("active");

  document.querySelectorAll(".tm-step").forEach((s, i) => {
    s.classList.remove("active","done");
    if (i+1 < n) s.classList.add("done");
    if (i+1 === n) s.classList.add("active");
  });

  document.querySelectorAll(".tdot").forEach((d, i) => d.classList.toggle("active", i+1 === n));

  if (tmPrevBtn) tmPrevBtn.style.visibility = n === 1 ? "hidden" : "visible";
  if (tmNextBtn) tmNextBtn.textContent = n === 3 ? "Confirm Booking →" : "Next →";

  ticketStep = n;

  /* On step 3 fill confirm summary */
  if (n === 3) buildConfirmSummary();

  /* Scroll panel top */
  const right = tmPanel?.querySelector(".tm-right");
  if (right) right.scrollTop = 0;
}

function buildConfirmSummary() {
  const summary = document.getElementById("confirmSummary");
  if (!summary || !activeTicketData) return;
  const unitPrice = Math.round(activeTicketData.price * (TICKET_MULTIPLIERS[selectedTicketType] || 1));
  const total     = unitPrice * ticketQty;
  const name      = (document.getElementById("tFirstName")?.value || "") + " " + (document.getElementById("tLastName")?.value || "");
  const email     = document.getElementById("tEmail")?.value || "";

  summary.innerHTML = `
    <div class="cs-row"><span>Event</span><span>${activeTicketData.event}</span></div>
    <div class="cs-row"><span>Date</span><span>${activeTicketData.date}</span></div>
    <div class="cs-row"><span>City</span><span>${activeTicketData.city}</span></div>
    <div class="cs-row"><span>Guest</span><span>${name.trim()}</span></div>
    <div class="cs-row"><span>Email</span><span>${email}</span></div>
    <div class="cs-row"><span>Ticket Type</span><span>${TICKET_LABELS[selectedTicketType]}</span></div>
    <div class="cs-row"><span>Quantity</span><span>${ticketQty}</span></div>
    <div class="cs-row cs-total"><span>Total</span><span>${formatPrice(total)}</span></div>`;
}

function openTicketModal(data) {
  activeTicketData   = data;
  ticketStep         = 1;
  selectedTicketType = "standard";
  ticketQty          = 1;

  /* Populate left panel */
  const img = document.getElementById("tmImg");
  if (img) { img.src = data.img || ""; img.alt = data.event || ""; }
  el("tmTag").textContent   = data.type  || "";
  el("ticketModalTitle").textContent = data.event || "";
  el("tmDate").textContent  = "📅 " + (data.date || "");
  el("tmCity").textContent  = "📍 " + (data.city || "");
  el("tmPrice").textContent = formatPrice(parseInt(data.price) || 0);
  el("tmSeats").textContent = data.seats > 0 ? `${data.seats} seats available` : "Sold out";

  /* Tag colour */
  const tag = document.getElementById("tmTag");
  if (tag) {
    tag.className = "ev-tag " + (data.type || "").toLowerCase().replace(/\s/g,"").replace("luxuryevent","luxury");
  }

  /* WhatsApp link */
  const waLink = document.getElementById("tmWaLink");
  if (waLink) waLink.href = `https://wa.me/919876543210?text=Hello!%20I%20am%20interested%20in%20booking%20tickets%20for%20${encodeURIComponent(data.event || "")}`;

  /* Set ticket prices */
  const base = parseInt(data.price) || 0;
  el("stdPrice").textContent  = formatPrice(base);
  el("premPrice").textContent = formatPrice(Math.round(base * 1.6));
  el("vipPrice").textContent  = formatPrice(Math.round(base * 2.5));

  /* Reset form */
  if (tmForm) tmForm.reset();
  document.querySelectorAll(".tm-err").forEach(e => e.textContent = "");
  document.querySelectorAll(".tm-group input, .tm-group textarea").forEach(e => e.classList.remove("t-ok","t-err"));
  document.querySelectorAll(".ticket-type-card").forEach((c, i) => c.classList.toggle("selected", i === 0));
  el("qtyNum").textContent = "1";
  updateOrderSummary();

  /* Hide success, show form */
  if (tmSuccessEl) tmSuccessEl.classList.remove("show");
  if (tmForm) tmForm.style.display = "";
  const nav = document.querySelector(".tm-nav");
  if (nav) nav.style.display = "";

  goTicketStep(1);

  ticketModal.classList.add("open");
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    const first = ticketModal.querySelector("input[type='text']");
    if (first) first.focus();
  }, 420);
}

function closeTicketModal() {
  ticketModal.classList.remove("open");
  document.body.style.overflow = "";
}

function el(id) { return document.getElementById(id) || { textContent:"", className:"" }; }

if (tmCloseBtn)    tmCloseBtn.addEventListener("click", closeTicketModal);
if (tmBackdrop)    tmBackdrop.addEventListener("click", closeTicketModal);
if (tmSuccessClose) tmSuccessClose.addEventListener("click", closeTicketModal);
document.addEventListener("keydown", e => { if (e.key === "Escape" && ticketModal.classList.contains("open")) closeTicketModal(); });

if (tmPrevBtn) tmPrevBtn.addEventListener("click", () => { if (ticketStep > 1) goTicketStep(ticketStep - 1); });

if (tmNextBtn) {
  tmNextBtn.addEventListener("click", () => {
    if (!validateTmStep(ticketStep)) return;
    if (ticketStep < 3) {
      goTicketStep(ticketStep + 1);
    } else {
      submitBooking();
    }
  });
}

function submitBooking() {
  if (!tmNextBtn) return;
  tmNextBtn.disabled = true;
  tmNextBtn.textContent = "Processing…";

  setTimeout(() => {
    tmNextBtn.disabled = false;
    tmNextBtn.textContent = "Confirm Booking →";

    /* Hide form + nav */
    if (tmForm) tmForm.style.display = "none";
    const nav = document.querySelector(".tm-nav");
    if (nav) nav.style.display = "none";

    /* Success */
    const ref  = "CS-2026-" + Math.floor(1000 + Math.random() * 9000);
    el("tmsRef").textContent = ref;

    const email = document.getElementById("tEmail")?.value || "your email";
    const base  = parseInt(activeTicketData?.price) || 0;
    const unit  = Math.round(base * (TICKET_MULTIPLIERS[selectedTicketType] || 1));
    const total = unit * ticketQty;
    el("tmsMsg").textContent = `Your ${ticketQty} ${TICKET_LABELS[selectedTicketType]} ticket${ticketQty > 1 ? "s" : ""} for "${activeTicketData?.event}" (${formatPrice(total)}) are confirmed. A receipt will be sent to ${email}.`;

    /* WhatsApp share */
    const tmsWa = document.getElementById("tmsWa");
    if (tmsWa) tmsWa.href = `https://wa.me/?text=${encodeURIComponent(`🎉 Just booked ${ticketQty} ticket(s) for "${activeTicketData?.event}" on ${activeTicketData?.date} via Ceremony Squad! Ref: ${ref}`)}`;

    if (tmSuccessEl) tmSuccessEl.classList.add("show");
    const right = tmPanel?.querySelector(".tm-right");
    if (right) right.scrollTop = 0;
  }, 1800);
}

/* Ticket type selection */
document.querySelectorAll(".ticket-type-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".ticket-type-card").forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");
    selectedTicketType = card.dataset.ticket;
    updateOrderSummary();
  });
});

/* Qty */
const qtyMinus = document.getElementById("qtyMinus");
const qtyPlus  = document.getElementById("qtyPlus");
const qtyNum   = document.getElementById("qtyNum");

if (qtyMinus) qtyMinus.addEventListener("click", () => { if (ticketQty > 1) { ticketQty--; qtyNum.textContent = ticketQty; updateOrderSummary(); } });
if (qtyPlus)  qtyPlus.addEventListener("click",  () => { if (ticketQty < 10) { ticketQty++; qtyNum.textContent = ticketQty; updateOrderSummary(); } });

function updateOrderSummary() {
  const base   = parseInt(activeTicketData?.price) || 0;
  const mult   = TICKET_MULTIPLIERS[selectedTicketType] || 1;
  const unit   = Math.round(base * mult);
  const total  = unit * ticketQty;
  el("osTtype").textContent = TICKET_LABELS[selectedTicketType] || "Standard";
  el("osQty").textContent   = ticketQty;
  el("osUnit").textContent  = formatPrice(unit);
  el("osTotal").textContent = formatPrice(total);
}

/* Live blur validation step 1 */
Object.values(tmRules).flat().forEach(rule => {
  const inp = document.getElementById(rule.id);
  const err = document.getElementById(rule.errId);
  if (!inp || !err || inp.type === "checkbox") return;
  inp.addEventListener("blur", () => {
    const pass = rule.check(inp.value);
    err.textContent = pass ? "" : rule.msg;
    inp.classList.toggle("t-err", !pass);
    inp.classList.toggle("t-ok",   pass && inp.value.trim() !== "");
  });
  inp.addEventListener("input", () => {
    if (inp.classList.contains("t-err") && rule.check(inp.value)) {
      inp.classList.remove("t-err"); inp.classList.add("t-ok"); err.textContent = "";
    }
  });
});

/* ══════════════════════════════════════════
   10. NOTIFY FORM
══════════════════════════════════════════ */
const notifyForm = document.getElementById("notifyForm");
const notifySuccess = document.getElementById("notifySuccess");

if (notifyForm) {
  notifyForm.addEventListener("submit", e => {
    e.preventDefault();
    const btn = notifyForm.querySelector("button[type='submit']");
    btn.textContent = "Subscribing…";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = "Subscribe to Events";
      btn.disabled = false;
      notifyForm.reset();
      notifySuccess.classList.add("show");
      setTimeout(() => notifySuccess.classList.remove("show"), 5000);
    }, 1200);
  });
}

/* ══════════════════════════════════════════
   11. INIT
══════════════════════════════════════════ */
renderGrid();
buildCalendar();
