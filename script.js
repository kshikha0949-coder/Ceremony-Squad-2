"use strict";

const body = document.body;
const header = document.getElementById("header");
const loader = document.getElementById("loader");
const backToTopButton = document.getElementById("backToTop");

body.style.overflow = "hidden";

window.addEventListener("load", () => {
  setTimeout(() => {
    if (loader) loader.classList.add("hidden");
    body.style.overflow = "";
  }, 2000);
});

/* Custom cursor */
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

function updateCursorPosition(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;

  if (cursorDot) {
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  }
}

function animateCursorRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;

  if (cursorRing) {
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
  }

  requestAnimationFrame(animateCursorRing);
}

document.addEventListener("mousemove", updateCursorPosition);
animateCursorRing();

/* Sticky header and back-to-top button */
function updateHeaderState() {
  const hasScrolled = window.scrollY > 60;
  const showBackToTop = window.scrollY > 500;

  if (header) header.classList.toggle("scrolled", hasScrolled);
  if (backToTopButton) backToTopButton.classList.toggle("visible", showBackToTop);
}

window.addEventListener("scroll", updateHeaderState, { passive: true });

/* Hamburger menu */
const hamburgerButton = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
  if (hamburgerButton) hamburgerButton.classList.remove("active");
  if (navLinks) navLinks.classList.remove("open");
}

if (hamburgerButton) {
  hamburgerButton.addEventListener("click", () => {
    hamburgerButton.classList.toggle("active");
    if (navLinks) navLinks.classList.toggle("open");
  });
}

if (navLinks) {
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}

document.addEventListener("click", event => {
  if (!header || !event.target) return;
  if (!header.contains(event.target)) closeMenu();
});

/* Back to top */
if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* Reveal on scroll */
const revealTargets = document.querySelectorAll(".reveal-fade, .reveal-up, .reveal-left, .reveal-right");
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

revealTargets.forEach(element => revealObserver.observe(element));

/* Animated counter */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function animateCounter(element, targetValue, duration = 1600) {
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    element.textContent = Math.floor(easeOutCubic(progress) * targetValue);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = targetValue;
    }
  }

  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.target) || 0;
      animateCounter(element, target);
      observer.unobserve(element);
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stat-num").forEach(counter => counterObserver.observe(counter));

/* Gallery filter and lightbox */
const filterButtons = document.querySelectorAll(".filter-btn[data-filter]");
const galleryItems = document.querySelectorAll(".masonry-item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const lightboxBackdrop = document.querySelector(".lightbox-backdrop");

let visibleGalleryItems = [];
let activeLightboxIndex = 0;

function updateVisibleGalleryItems() {
  visibleGalleryItems = Array.from(galleryItems).filter(item => !item.classList.contains("hidden"));
}

function applyGalleryFilter(category) {
  filterButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.filter === category);
  });

  galleryItems.forEach(item => {
    const isMatch = category === "all" || item.dataset.category === category;
    item.classList.toggle("hidden", !isMatch);
  });
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    applyGalleryFilter(button.dataset.filter);
  });
});

function openLightbox(index) {
  updateVisibleGalleryItems();
  activeLightboxIndex = index;
  const item = visibleGalleryItems[activeLightboxIndex];
  if (!item || !lightbox || !lightboxImage) return;

  const image = item.querySelector("img");
  const caption = item.querySelector(".masonry-overlay span");
  if (!image) return;

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt || "Gallery image";
  lightboxCaption.textContent = caption?.textContent || "";
  lightbox.classList.add("open");
  body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("open");
  body.style.overflow = "";
}

function changeLightbox(direction) {
  if (!visibleGalleryItems.length) return;
  activeLightboxIndex = (activeLightboxIndex + direction + visibleGalleryItems.length) % visibleGalleryItems.length;
  openLightbox(activeLightboxIndex);
}

galleryItems.forEach(item => {
  item.addEventListener("click", () => {
    updateVisibleGalleryItems();
    openLightbox(visibleGalleryItems.indexOf(item));
  });
});

lightboxClose?.addEventListener("click", closeLightbox);
lightboxPrev?.addEventListener("click", () => changeLightbox(-1));
lightboxNext?.addEventListener("click", () => changeLightbox(1));
lightboxBackdrop?.addEventListener("click", closeLightbox);

document.addEventListener("keydown", event => {
  if (!lightbox?.classList.contains("open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") changeLightbox(-1);
  if (event.key === "ArrowRight") changeLightbox(1);
});

/* Testimonial carousel */
const testimonialTrack = document.getElementById("testimonialTrack");
const testimonialCards = testimonialTrack ? testimonialTrack.querySelectorAll(".testimonial-card") : [];
const carouselDots = document.getElementById("carouselDots");
const testimonialPrev = document.getElementById("prevBtn");
const testimonialNext = document.getElementById("nextBtn");

let currentTestimonial = 0;
let testimonialTimer = null;

function updateCarousel() {
  if (!testimonialTrack) return;
  testimonialTrack.style.transform = `translateX(calc(-${currentTestimonial * 100}% - ${currentTestimonial * 1.75}rem))`;

  if (carouselDots) {
    carouselDots.querySelectorAll(".carousel-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentTestimonial);
    });
  }
}

function goToTestimonial(index) {
  if (!testimonialCards.length) return;
  currentTestimonial = (index + testimonialCards.length) % testimonialCards.length;
  updateCarousel();
}

if (carouselDots) {
  testimonialCards.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = index === 0 ? "carousel-dot active" : "carousel-dot";
    dot.setAttribute("aria-label", `Slide ${index + 1}`);
    dot.addEventListener("click", () => goToTestimonial(index));
    carouselDots.appendChild(dot);
  });
}

testimonialPrev?.addEventListener("click", () => { goToTestimonial(currentTestimonial - 1); resetTestimonialTimer(); });
testimonialNext?.addEventListener("click", () => { goToTestimonial(currentTestimonial + 1); resetTestimonialTimer(); });

function resetTestimonialTimer() {
  clearInterval(testimonialTimer);
  testimonialTimer = setInterval(() => goToTestimonial(currentTestimonial + 1), 5000);
}

if (testimonialCards.length) {
  resetTestimonialTimer();
}

let swipeStartX = 0;
testimonialTrack?.addEventListener("touchstart", event => {
  swipeStartX = event.touches[0].clientX;
}, { passive: true });

testimonialTrack?.addEventListener("touchend", event => {
  const swipeDistance = swipeStartX - event.changedTouches[0].clientX;
  if (Math.abs(swipeDistance) > 50) {
    goToTestimonial(swipeDistance > 0 ? currentTestimonial + 1 : currentTestimonial - 1);
    resetTestimonialTimer();
  }
});

/* Contact form validation */
const contactForm = document.getElementById("contactForm");

function clearFormErrors() {
  ["nameError", "emailError", "eventError", "messageError"].forEach(id => {
    const error = document.getElementById(id);
    if (error) error.textContent = "";
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    clearFormErrors();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const eventInput = document.getElementById("eventType");
    const messageInput = document.getElementById("message");
    let isValid = true;

    if (!nameInput || !emailInput || !eventInput || !messageInput) return;

    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      document.getElementById("nameError").textContent = "Please enter your full name.";
      nameInput.focus();
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      document.getElementById("emailError").textContent = "Please enter a valid email address.";
      if (isValid) emailInput.focus();
      isValid = false;
    }

    if (!eventInput.value) {
      document.getElementById("eventError").textContent = "Please select an event type.";
      isValid = false;
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 20) {
      document.getElementById("messageError").textContent = "Please share a little more about your vision (min 20 chars).";
      isValid = false;
    }

    if (!isValid) return;

    const submitButton = contactForm.querySelector("button[type='submit']");
    if (submitButton) {
      submitButton.textContent = "Sending…";
      submitButton.disabled = true;
    }

    setTimeout(() => {
      contactForm.reset();
      if (submitButton) {
        submitButton.textContent = "Send Enquiry";
        submitButton.disabled = false;
      }
      const formSuccess = document.getElementById("formSuccess");
      formSuccess?.classList.add("visible");
      setTimeout(() => formSuccess?.classList.remove("visible"), 5000);
    }, 1500);
  });
}

/* Newsletter form */
const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", event => {
    event.preventDefault();
    const newsletterSuccess = document.getElementById("newsletterSuccess");
    newsletterSuccess?.classList.add("visible");
    newsletterForm.reset();
    setTimeout(() => newsletterSuccess?.classList.remove("visible"), 4000);
  });
}

/* Smooth scroll for anchor links */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    event.preventDefault();
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
  });
});
