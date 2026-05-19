/* =====================================================
   CEREMONY SQUAD — about.js
   About Page · Vanilla JavaScript
   ===================================================== */

"use strict";

/* ──────────────────────────────────────────────────────
   1. STICKY HEADER
────────────────────────────────────────────────────── */
const header = document.getElementById("header");

function handleScroll() {
  // Sticky nav
  header.classList.toggle("scrolled", window.scrollY > 60);

  // Back to top
  document.getElementById("backToTop")
    .classList.toggle("visible", window.scrollY > 500);
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll(); // run once on load


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
   4. SCROLL REVEAL
────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right")
  .forEach(el => revealObserver.observe(el));


/* ──────────────────────────────────────────────────────
   5. COUNTER ANIMATION
────────────────────────────────────────────────────── */
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

function animateCounter(el, target, duration = 1800) {
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    el.textContent = Math.floor(easeOutCubic(p) * target);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".exp-num")
  .forEach(el => counterObserver.observe(el));


/* ──────────────────────────────────────────────────────
   6. TIMELINE ITEMS — STAGGERED REVEAL
────────────────────────────────────────────────────── */
// Timeline items already use .reveal-up so they're handled
// by the scroll observer above. No extra JS needed.


/* ──────────────────────────────────────────────────────
   7. SMOOTH SCROLL FOR ANCHOR LINKS
────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const offset = header.offsetHeight + 16;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth"
    });
  });
});


/* ──────────────────────────────────────────────────────
   8. TEAM CARD — TILT EFFECT (subtle, mouse-only)
────────────────────────────────────────────────────── */
if (window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".team-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;  // -0.5 to 0.5
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform =
        `translateY(-8px) perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}


/* ──────────────────────────────────────────────────────
   9. TIMELINE — PROGRESS LINE FILL ON SCROLL
────────────────────────────────────────────────────── */
const timelineLine = document.querySelector(".timeline-line");
const timelineTrack = document.querySelector(".timeline-track");

if (timelineLine && timelineTrack) {
  function updateTimelineProgress() {
    const rect   = timelineTrack.getBoundingClientRect();
    const viewH  = window.innerHeight;
    const total  = rect.height;
    const scrolled = Math.max(0, viewH - rect.top);
    const pct   = Math.min(scrolled / (total + viewH * 0.5), 1);

    timelineLine.style.background =
      `linear-gradient(to bottom,
        transparent 0%,
        var(--gold) ${pct * 5}%,
        var(--gold) ${pct * 100}%,
        var(--beige-dark) ${pct * 100}%,
        var(--beige-dark) 100%)`;
  }
  window.addEventListener("scroll", updateTimelineProgress, { passive: true });
  updateTimelineProgress();
}


/* ──────────────────────────────────────────────────────
   10. VISIONARY SECTION — PARALLAX IMAGE
────────────────────────────────────────────────────── */
if (window.matchMedia("(hover: hover) and (min-width: 769px)").matches) {
  const portrait = document.querySelector(".visionary-portrait img");
  if (portrait) {
    window.addEventListener("scroll", () => {
      const rect = portrait.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      portrait.style.transform = `translateY(${center * 0.06}px)`;
    }, { passive: true });
  }
}


/* ──────────────────────────────────────────────────────
   11. MARQUEE — PAUSE ON HOVER
────────────────────────────────────────────────────── */
const marqueeTrack = document.querySelector(".marquee-track");
if (marqueeTrack) {
  marqueeTrack.addEventListener("mouseenter", () => {
    marqueeTrack.style.animationPlayState = "paused";
  });
  marqueeTrack.addEventListener("mouseleave", () => {
    marqueeTrack.style.animationPlayState = "running";
  });
}


/* ──────────────────────────────────────────────────────
   12. HERO SCROLL ARROW — SMOOTH SCROLL TO STORY
────────────────────────────────────────────────────── */
const heroScroll = document.querySelector(".about-hero-scroll");
if (heroScroll) {
  heroScroll.addEventListener("click", () => {
    const story = document.getElementById("story");
    if (story) {
      story.scrollIntoView({ behavior: "smooth" });
    }
  });
  heroScroll.style.cursor = "pointer";
}


/* ──────────────────────────────────────────────────────
   13. AWARD ITEMS — STAGGER REVEAL
────────────────────────────────────────────────────── */
const awardObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".award-item").forEach((item, i) => {
          setTimeout(() => {
            item.style.opacity    = "1";
            item.style.transform  = "translateX(0)";
          }, i * 150);
        });
        awardObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

const awardsSection = document.querySelector(".visionary-awards");
if (awardsSection) {
  awardsSection.querySelectorAll(".award-item").forEach(item => {
    item.style.opacity   = "0";
    item.style.transform = "translateX(20px)";
    item.style.transition = "opacity .5s ease, transform .5s ease";
  });
  awardObserver.observe(awardsSection);
}
