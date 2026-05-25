/* =====================================================
   CEREMONY SQUAD — services.js
   Services Page · Vanilla JavaScript
   ===================================================== */

"use strict";

/* ──────────────────────────────────────────────────────
   1. STICKY HEADER
────────────────────────────────────────────────────── */
const header = document.getElementById("header");

function handleScroll() {
  header.classList.toggle("scrolled", window.scrollY > 60);
  document.getElementById("backToTop")
    .classList.toggle("visible", window.scrollY > 500);

  updateActiveTabs();
}


/* ──────────────────────────────────────────────────────
   2. HAMBURGER MENU
────────────────────────────────────────────────────── */
const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
  });
});

document.addEventListener("click", e => {
  if (!header.contains(e.target)) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
  }
});


/* ──────────────────────────────────────────────────────
   3. BACK TO TOP
────────────────────────────────────────────────────── */
document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ──────────────────────────────────────────────────────
   4. SCROLL REVEAL — Bulletproof (works on file://)
────────────────────────────────────────────────────── */

// Tell CSS animations are safe to enable
document.body.classList.add("js-ready");

function revealInView() {
  document.querySelectorAll(
    ".reveal-up:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)"
  ).forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 120) el.classList.add("visible");
  });
}

// IntersectionObserver as progressive enhancement
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.01, rootMargin: "120px 0px 120px 0px" }
  );
  document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right")
    .forEach(el => revealObserver.observe(el));
} else {
  // No observer — show everything
  document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right")
    .forEach(el => el.classList.add("visible"));
}

revealInView();
window.addEventListener("scroll", revealInView, { passive: true });
window.addEventListener("load", revealInView);
setTimeout(revealInView, 100);
setTimeout(revealInView, 500);
setTimeout(revealInView, 1200);


/* ──────────────────────────────────────────────────────
   5. STICKY TABS — ACTIVE STATE ON SCROLL
────────────────────────────────────────────────────── */
const svcSections = ["wedding","destination","corporate","birthday","decor","entertainment"];
const tabs = document.querySelectorAll(".svc-tab");

function updateActiveTabs() {
  const navH = header.offsetHeight + document.querySelector(".svc-tabs-bar").offsetHeight + 10;

  let current = "";
  svcSections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.getBoundingClientRect().top <= navH) current = id;
  });

  tabs.forEach(tab => {
    tab.classList.toggle("active", tab.dataset.target === current);
  });
}

// Smooth scroll on tab click
tabs.forEach(tab => {
  tab.addEventListener("click", e => {
    e.preventDefault();
    const target = document.getElementById(tab.dataset.target);
    if (!target) return;
    const offset = header.offsetHeight + document.querySelector(".svc-tabs-bar").offsetHeight + 16;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
  });
});

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();


/* ──────────────────────────────────────────────────────
   6. SMOOTH SCROLL FOR ALL ANCHOR LINKS
────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const offset = header.offsetHeight + 70;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
  });
});


/* ──────────────────────────────────────────────────────
   7. FAQ ACCORDION
────────────────────────────────────────────────────── */
document.querySelectorAll(".faq-item").forEach(item => {
  const btn = item.querySelector(".faq-q");
  btn.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    // Close all
    document.querySelectorAll(".faq-item.open").forEach(openItem => {
      openItem.classList.remove("open");
    });

    // Toggle clicked
    if (!isOpen) item.classList.add("open");
  });
});

// Open first by default
const firstFaq = document.querySelector(".faq-item");
if (firstFaq) firstFaq.classList.add("open");


/* ──────────────────────────────────────────────────────
   8. DECOR STYLE TABS
────────────────────────────────────────────────────── */
const decorDescriptions = {
  romantic:    "Lush florals, candlelight, draped silks, and soft gold — a world designed for love and warmth.",
  minimalist:  "Clean lines, negative space, and single-stem florals. Elegant restraint that lets every detail breathe.",
  maximalist:  "Audacious colour, towering centrepieces, layered textures, and visual drama at every turn.",
  bohemian:    "Macramé, pampas grass, terracotta, and wildflowers — free-spirited and beautifully unconventional."
};

const decorText = document.getElementById("decorStyleText");
const decorContent = document.getElementById("decorContent");

document.querySelectorAll(".dstyle-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".dstyle-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Fade transition
    decorContent.style.opacity = "0";
    decorContent.style.transform = "translateY(6px)";
    setTimeout(() => {
      decorText.textContent = decorDescriptions[btn.dataset.style] || "";
      decorContent.style.opacity = "1";
      decorContent.style.transform = "translateY(0)";
    }, 220);
  });
});

// Style the decor content transition
if (decorContent) {
  decorContent.style.transition = "opacity .22s ease, transform .22s ease";
}


/* ──────────────────────────────────────────────────────
   9. SERVICE IMAGE HOVER — PARALLAX ON MOUSE MOVE
────────────────────────────────────────────────────── */
if (window.matchMedia("(hover: hover) and (min-width: 901px)").matches) {
  document.querySelectorAll(".svc-media").forEach(media => {
    media.addEventListener("mousemove", e => {
      const rect = media.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      const accent = media.querySelector(".svc-img-accent");
      if (accent) {
        accent.style.transform = `translate(${x * 12}px, ${-8 + y * 8}px)`;
      }
    });
    media.addEventListener("mouseleave", () => {
      const accent = media.querySelector(".svc-img-accent");
      if (accent) accent.style.transform = "";
    });
  });
}


/* ──────────────────────────────────────────────────────
   10. WHY CARD HOVER TILT
────────────────────────────────────────────────────── */
if (window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".why-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform =
        `translateY(-7px) perspective(500px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
}


/* ──────────────────────────────────────────────────────
   11. PROCESS STEP ANIMATION — HIGHLIGHT ON SCROLL
────────────────────────────────────────────────────── */
const processObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const num = entry.target.querySelector(".step-num");
        if (num) {
          num.style.transition = "background .4s ease, color .4s ease, border-color .4s ease, box-shadow .4s ease";
          num.style.background    = "var(--gold)";
          num.style.color         = "var(--white)";
          num.style.borderColor   = "var(--gold)";
          num.style.boxShadow     = "0 6px 24px rgba(201,169,110,.4)";
          setTimeout(() => {
            num.style.background  = "";
            num.style.color       = "";
            num.style.borderColor = "";
            num.style.boxShadow   = "";
          }, 1200);
        }
        processObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll(".process-step").forEach(el => processObserver.observe(el));


/* ──────────────────────────────────────────────────────
   12. DESTINATION TAG HOVER RIPPLE
────────────────────────────────────────────────────── */
document.querySelectorAll(".dtag").forEach(tag => {
  tag.addEventListener("click", () => {
    tag.style.transform = "scale(.95)";
    setTimeout(() => { tag.style.transform = ""; }, 150);
  });
});


/* ──────────────────────────────────────────────────────
   13. HERO PILLS — SCROLL TO SECTION
────────────────────────────────────────────────────── */
document.querySelectorAll(".pill[href]").forEach(pill => {
  pill.addEventListener("click", e => {
    const target = document.querySelector(pill.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const offset = header.offsetHeight + 70;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
  });
});


/* ──────────────────────────────────────────────────────
   14. ENTERTAINMENT GENRE CARDS — STAGGER ON ENTER
────────────────────────────────────────────────────── */
const entObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".ent-genre-card").forEach((card, i) => {
          card.style.opacity   = "0";
          card.style.transform = "translateY(16px)";
          card.style.transition = `opacity .4s ease ${i * .08}s, transform .4s ease ${i * .08}s`;
          setTimeout(() => {
            card.style.opacity   = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        });
        entObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

const entGenres = document.querySelector(".ent-genres");
if (entGenres) {
  entGenres.querySelectorAll(".ent-genre-card").forEach(c => { c.style.opacity = "0"; });
  entObserver.observe(entGenres);
}


/* ══════════════════════════════════════════════════════
   QUERY POPUP MODAL
══════════════════════════════════════════════════════ */

const modal        = document.getElementById("queryModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalPanel   = document.getElementById("modalPanel");
const modalClose   = document.getElementById("modalClose");
const modalPrev    = document.getElementById("modalPrev");
const modalNext    = document.getElementById("modalNext");
const modalDots    = document.querySelectorAll(".mdot");
const modalSteps   = document.querySelectorAll(".mstep");
const stepContents = document.querySelectorAll(".modal-step-content");
const modalSuccess = document.getElementById("modalSuccess");
const modalSuccessClose = document.getElementById("modalSuccessClose");
const modalEyebrow = document.getElementById("modalEyebrow");
const mService     = document.getElementById("mService");

let currentStep = 1;
const TOTAL_STEPS = 3;

/* ── Validators per step ── */
const stepValidators = {
  1: [
    { id: "mFirstName", errId: "mFirstNameErr", check: v => v.trim().length >= 2, msg: "Please enter your first name." },
    { id: "mLastName",  errId: "mLastNameErr",  check: v => v.trim().length >= 2, msg: "Please enter your last name."  },
    { id: "mEmail",     errId: "mEmailErr",     check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: "Enter a valid email address." },
    { id: "mPhone",     errId: "mPhoneErr",     check: v => v.trim().length >= 7, msg: "Enter a valid phone number." },
  ],
  2: [
    { id: "mService", errId: "mServiceErr", check: v => v !== "", msg: "Please select a service." },
  ],
  3: [
    { id: "mMessage", errId: "mMessageErr", check: v => v.trim().length >= 15, msg: "Please share a bit more (min 15 characters)." },
  ]
};

function validateStep(step) {
  const rules = stepValidators[step] || [];
  let valid = true;
  rules.forEach(rule => {
    const el  = document.getElementById(rule.id);
    const err = document.getElementById(rule.errId);
    if (!el) return;
    const pass = rule.check(el.value);
    err.textContent = pass ? "" : rule.msg;
    el.classList.toggle("m-error", !pass);
    el.classList.toggle("m-ok", pass && el.value.trim() !== "");
    if (!pass) valid = false;
  });
  return valid;
}

function goToStep(step) {
  // Hide all steps
  stepContents.forEach(c => c.classList.remove("active"));
  modalSteps.forEach((s, i) => {
    s.classList.remove("active", "done");
    if (i + 1 < step) s.classList.add("done");
    if (i + 1 === step) s.classList.add("active");
  });
  modalDots.forEach((d, i) => d.classList.toggle("active", i + 1 === step));

  // Show current step
  const content = document.querySelector(`.modal-step-content[data-step="${step}"]`);
  if (content) content.classList.add("active");

  // Update buttons
  modalPrev.style.visibility = step === 1 ? "hidden" : "visible";
  if (step === TOTAL_STEPS) {
    modalNext.textContent = "Submit Query →";
  } else {
    modalNext.textContent = "Next Step →";
  }

  currentStep = step;

  // Scroll modal to top
  modalPanel.scrollTop = 0;
}

/* ── Open modal ── */
function openModal(serviceName) {
  modal.classList.add("open");
  document.body.style.overflow = "hidden";

  // Pre-select service
  if (serviceName && mService) {
    mService.value = serviceName;
    mService.classList.add("m-ok");
  }
  if (modalEyebrow) modalEyebrow.textContent = serviceName ? `Enquiry — ${serviceName}` : "Service Enquiry";

  goToStep(1);

  // Hide success, show form
  if (modalSuccess) modalSuccess.classList.remove("visible");
  document.getElementById("queryForm").style.display = "";
  const modalNav = document.querySelector(".modal-nav");
  if (modalNav) modalNav.style.display = "";

  // Focus first input
  setTimeout(() => {
    const firstInput = modalPanel.querySelector("input");
    if (firstInput) firstInput.focus();
  }, 420);
}

/* ── Close modal ── */
function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

/* ── Trigger on all query buttons ── */
document.querySelectorAll(".query-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    openModal(btn.dataset.service || "");
  });
});

/* ── Close triggers ── */
modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);
if (modalSuccessClose) modalSuccessClose.addEventListener("click", closeModal);

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

/* ── Prev / Next ── */
modalPrev.addEventListener("click", () => {
  if (currentStep > 1) goToStep(currentStep - 1);
});

modalNext.addEventListener("click", () => {
  if (!validateStep(currentStep)) return;

  if (currentStep < TOTAL_STEPS) {
    goToStep(currentStep + 1);
  } else {
    // Submit
    submitQuery();
  }
});

/* ── Submit ── */
function submitQuery() {
  const btnText = modalNext;
  const spinner = document.createElement("span");
  spinner.className = "mbtn-spinner show";
  btnText.disabled = true;
  btnText.textContent = "Sending…";
  btnText.appendChild(spinner);

  // Simulate API delay
  setTimeout(() => {
    btnText.disabled = false;
    btnText.textContent = "Submit Query →";

    // Show success
    document.getElementById("queryForm").style.display = "none";
    const modalNav = document.querySelector(".modal-nav");
    if (modalNav) modalNav.style.display = "none";

    if (modalSuccess) {
      modalSuccess.classList.add("visible");
      modalPanel.scrollTop = 0;
    }

    // Reset form
    document.getElementById("queryForm").reset();
    document.querySelectorAll(".mform-group input, .mform-group textarea, .mform-group select")
      .forEach(el => el.classList.remove("m-ok", "m-error"));
    document.querySelectorAll(".mform-error").forEach(e => e.textContent = "");
    const mchar = document.getElementById("mCharCount");
    if (mchar) mchar.textContent = "0 / 600";

  }, 1600);
}

/* ── Live validation on blur ── */
Object.values(stepValidators).flat().forEach(rule => {
  const el = document.getElementById(rule.id);
  if (!el) return;
  el.addEventListener("blur", () => {
    const err = document.getElementById(rule.errId);
    const pass = rule.check(el.value);
    err.textContent = pass ? "" : rule.msg;
    el.classList.toggle("m-error", !pass);
    el.classList.toggle("m-ok", pass && el.value.trim() !== "");
  });
  el.addEventListener("input", () => {
    if (el.classList.contains("m-error")) {
      const pass = rule.check(el.value);
      if (pass) { el.classList.remove("m-error"); el.classList.add("m-ok"); document.getElementById(rule.errId).textContent = ""; }
    }
  });
});

/* ── Message char counter ── */
const mMsg   = document.getElementById("mMessage");
const mCount = document.getElementById("mCharCount");
const M_MAX  = 600;

if (mMsg && mCount) {
  mMsg.addEventListener("input", () => {
    const len = mMsg.value.length;
    mCount.textContent = `${len} / ${M_MAX}`;
    mCount.style.color = len > M_MAX * .9 ? (len >= M_MAX ? "#c0392b" : "#e67e22") : "";
    if (len > M_MAX) mMsg.value = mMsg.value.slice(0, M_MAX);
  });
}

