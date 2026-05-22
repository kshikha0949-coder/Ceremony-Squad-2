/* =====================================================
   CEREMONY SQUAD — contact.js
   Contact Page · Vanilla JavaScript
   ===================================================== */

"use strict";

/* ──────────────────────────────────────────────────────
   1. STICKY HEADER + BACK TO TOP
────────────────────────────────────────────────────── */
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 60);
  document.getElementById("backToTop")
    .classList.toggle("visible", window.scrollY > 500);
  revealInView();
}, { passive: true });

document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


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
   3. SCROLL REVEAL — Robust
────────────────────────────────────────────────────── */
function revealInView() {
  document.querySelectorAll(
    ".reveal-up:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)"
  ).forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 80) el.classList.add("visible");
  });
}

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.05, rootMargin: "80px 0px 80px 0px" }
);

document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right")
  .forEach(el => revealObserver.observe(el));

revealInView();
window.addEventListener("load", revealInView);


/* ──────────────────────────────────────────────────────
   4. SMOOTH SCROLL FOR ANCHORS
────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - header.offsetHeight - 16,
      behavior: "smooth"
    });
  });
});


/* ──────────────────────────────────────────────────────
   5. CONTACT FORM
────────────────────────────────────────────────────── */
const form       = document.getElementById("contactForm");
const submitBtn  = document.getElementById("submitBtn");
const btnText    = submitBtn.querySelector(".btn-text");
const btnSpinner = document.getElementById("btnSpinner");
const formSuccess = document.getElementById("formSuccess");

/* ── Validation helpers ── */
const validators = {
  firstName: {
    el: "firstName", err: "firstNameError",
    check: v => v.trim().length >= 2,
    msg: "Please enter at least 2 characters."
  },
  lastName: {
    el: "lastName", err: "lastNameError",
    check: v => v.trim().length >= 2,
    msg: "Please enter at least 2 characters."
  },
  email: {
    el: "email", err: "emailError",
    check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    msg: "Please enter a valid email address."
  },
  eventType: {
    el: "eventType", err: "eventTypeError",
    check: v => v !== "",
    msg: "Please select an event type."
  },
  message: {
    el: "message", err: "messageError",
    check: v => v.trim().length >= 20,
    msg: "Please share a bit more about your event (min. 20 characters)."
  }
};

function validateField(key) {
  const rule  = validators[key];
  const el    = document.getElementById(rule.el);
  const errEl = document.getElementById(rule.err);
  const val   = el.value;
  const pass  = rule.check(val);

  errEl.textContent = pass ? "" : rule.msg;
  el.classList.toggle("error", !pass);
  el.classList.toggle("success", pass && val.trim() !== "");
  return pass;
}

/* Live validation on blur */
Object.keys(validators).forEach(key => {
  const el = document.getElementById(validators[key].el);
  if (el) {
    el.addEventListener("blur",  () => validateField(key));
    el.addEventListener("input", () => {
      if (el.classList.contains("error")) validateField(key);
    });
  }
});

/* Submit */
form.addEventListener("submit", e => {
  e.preventDefault();

  const allValid = Object.keys(validators)
    .map(key => validateField(key))
    .every(Boolean);

  if (!allValid) {
    // Scroll to first error
    const firstErr = form.querySelector(".error");
    if (firstErr) {
      firstErr.scrollIntoView({ behavior: "smooth", block: "center" });
      firstErr.focus();
    }
    return;
  }

  // Show loading state
  btnText.textContent = "Sending…";
  btnSpinner.classList.add("active");
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    btnText.textContent = "Send Enquiry";
    btnSpinner.classList.remove("active");
    submitBtn.disabled = false;
    form.reset();
    document.querySelectorAll(".form-group input, .form-group textarea, .form-group select")
      .forEach(el => el.classList.remove("success", "error"));
    document.getElementById("charCount").textContent = "0 / 1000";
    formSuccess.classList.add("visible");
    formSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });

    // Hide success after 8s
    setTimeout(() => formSuccess.classList.remove("visible"), 8000);
  }, 1600);
});


/* ──────────────────────────────────────────────────────
   6. CHARACTER COUNTER
────────────────────────────────────────────────────── */
const messageEl  = document.getElementById("message");
const charCount  = document.getElementById("charCount");
const MAX_CHARS  = 1000;

messageEl.addEventListener("input", () => {
  const len = messageEl.value.length;
  charCount.textContent = `${len} / ${MAX_CHARS}`;
  charCount.style.color = len > MAX_CHARS * 0.9
    ? (len >= MAX_CHARS ? "#c0392b" : "#e67e22")
    : "";
  if (len > MAX_CHARS) messageEl.value = messageEl.value.slice(0, MAX_CHARS);
});


/* ──────────────────────────────────────────────────────
   7. MAP PIN CARD CLOSE
────────────────────────────────────────────────────── */
const mapPinClose = document.getElementById("mapPinClose");
const mapPinCard  = document.getElementById("mapPinCard");

if (mapPinClose && mapPinCard) {
  mapPinClose.addEventListener("click", () => {
    mapPinCard.style.opacity = "0";
    mapPinCard.style.transform = "translateY(10px)";
    mapPinCard.style.transition = "opacity .3s ease, transform .3s ease";
    setTimeout(() => { mapPinCard.style.display = "none"; }, 300);
  });
}

/* Map iframe load error fallback */
const mapIframe  = document.getElementById("mapIframe");
const mapFallback = document.getElementById("mapFallback");
const mapContainer = document.getElementById("mapContainer");

if (mapIframe && mapFallback) {
  mapIframe.addEventListener("error", () => {
    mapContainer.style.display = "none";
    mapFallback.classList.add("active");
  });

  // Additional CSP/block detection
  setTimeout(() => {
    try {
      const iframeDoc = mapIframe.contentDocument || mapIframe.contentWindow?.document;
      if (!iframeDoc || iframeDoc.URL === "about:blank") {
        // iframe may be blocked
      }
    } catch {
      // Cross-origin — iframe loaded successfully, do nothing
    }
  }, 3000);
}


/* ──────────────────────────────────────────────────────
   8. FAQ ACCORDION
────────────────────────────────────────────────────── */
document.querySelectorAll(".faq-item").forEach(item => {
  item.querySelector(".faq-q").addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach(o => o.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  });
});

// Open first FAQ
const firstFaq = document.querySelector(".faq-item");
if (firstFaq) firstFaq.classList.add("open");


/* ──────────────────────────────────────────────────────
   9. WHATSAPP CHAT ANIMATION
────────────────────────────────────────────────────── */
const chatTyping = document.getElementById("chatTyping");
const chatMsg2   = document.getElementById("chatMsg2");
const chatMsg3   = document.getElementById("chatMsg3");

// Start messages hidden
if (chatMsg2) { chatMsg2.style.opacity = "0"; chatMsg2.style.transform = "translateY(10px)"; }
if (chatMsg3) { chatMsg3.style.opacity = "0"; chatMsg3.style.transform = "translateY(10px)"; }
if (chatTyping) chatTyping.style.display = "none";

function showChatAnim() {
  const msgStyle = "opacity .5s ease, transform .5s ease";

  setTimeout(() => {
    if (!chatMsg2) return;
    chatMsg2.style.transition = msgStyle;
    chatMsg2.style.opacity = "1";
    chatMsg2.style.transform = "translateY(0)";
  }, 800);

  setTimeout(() => {
    if (!chatTyping) return;
    chatTyping.style.display = "flex";
    chatTyping.style.opacity = "0";
    chatTyping.style.transition = "opacity .3s";
    setTimeout(() => { chatTyping.style.opacity = "1"; }, 50);
  }, 1600);

  setTimeout(() => {
    if (!chatTyping) return;
    chatTyping.style.opacity = "0";
    setTimeout(() => { chatTyping.style.display = "none"; }, 300);
  }, 3000);

  setTimeout(() => {
    if (!chatMsg3) return;
    chatMsg3.style.transition = msgStyle;
    chatMsg3.style.opacity = "1";
    chatMsg3.style.transform = "translateY(0)";
  }, 3200);
}

// Trigger when WhatsApp section enters view
const waObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        showChatAnim();
        waObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

const waSection = document.querySelector(".wa-section");
if (waSection) waObserver.observe(waSection);


/* ──────────────────────────────────────────────────────
   10. WHATSAPP BUTTON — SHOW AFTER DELAY
────────────────────────────────────────────────────── */
const waBtnFloat = document.getElementById("whatsappBtn");
if (waBtnFloat) {
  waBtnFloat.style.opacity    = "0";
  waBtnFloat.style.transform  = "translateY(20px)";
  waBtnFloat.style.transition = "opacity .5s ease, transform .5s ease";
  setTimeout(() => {
    waBtnFloat.style.opacity   = "1";
    waBtnFloat.style.transform = "translateY(0)";
  }, 1500);
}


/* ──────────────────────────────────────────────────────
   11. CONTACT CARD HOVER — TILT
────────────────────────────────────────────────────── */
if (window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".contact-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform =
        `translateY(-3px) perspective(500px) rotateY(${x * 4}deg) rotateX(${-y * 3}deg)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
}


/* ──────────────────────────────────────────────────────
   12. INPUT FOCUS LABEL FLOAT EFFECT
────────────────────────────────────────────────────── */
document.querySelectorAll(".form-group input, .form-group textarea").forEach(input => {
  const group = input.closest(".form-group");
  const label = group?.querySelector("label");
  if (!label) return;

  input.addEventListener("focus",  () => label.style.color = "var(--gold-dark)");
  input.addEventListener("blur",   () => label.style.color = "");
});

document.querySelectorAll(".select-wrap select").forEach(select => {
  const group = select.closest(".form-group");
  const label = group?.querySelector("label");
  if (!label) return;

  select.addEventListener("focus",  () => label.style.color = "var(--gold-dark)");
  select.addEventListener("blur",   () => label.style.color = "");
});


/* ──────────────────────────────────────────────────────
   13. PHONE FIELD — AUTO FORMAT
────────────────────────────────────────────────────── */
const phoneInput = document.getElementById("phone");
if (phoneInput) {
  phoneInput.addEventListener("input", () => {
    let val = phoneInput.value.replace(/[^\d+\s-]/g, "");
    phoneInput.value = val;
  });
}


/* ──────────────────────────────────────────────────────
   14. SOCIAL CARD STAGGER ON SCROLL
────────────────────────────────────────────────────── */
const socialObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".social-card").forEach((card, i) => {
          setTimeout(() => {
            card.style.opacity   = "1";
            card.style.transform = "translateY(0)";
          }, i * 80);
        });
        socialObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

const socialSection = document.querySelector(".social-section");
if (socialSection) {
  socialSection.querySelectorAll(".social-card").forEach(card => {
    card.style.opacity   = "0";
    card.style.transform = "translateY(14px)";
    card.style.transition = "opacity .4s ease, transform .4s ease";
  });
  socialObserver.observe(socialSection);
}
