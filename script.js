// Shanvi's portfolio interactions
const words = [
  "Computer Engineering Student",
  "Aspiring Software Developer",
  "Web Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;
const typingElement = document.getElementById("typing");

function typeEffect() {
  if (!typingElement) return;
  const currentWord = words[wordIndex];

  charIndex += deleting ? -1 : 1;
  typingElement.textContent = currentWord.substring(0, charIndex);

  let delay = deleting ? 42 : 85;
  if (!deleting && charIndex === currentWord.length) {
    deleting = true;
    delay = 1450;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 350;
  }
  window.setTimeout(typeEffect, delay);
}

// Reveal elements as they enter the viewport.
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${(index % 4) * 85}ms`;
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Mobile navigation.
const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

if (menuToggle && navbar) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navbar.classList.toggle("open", !isOpen);
  });

  navbar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

// Highlight the navigation item for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => sectionObserver.observe(section));
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
  console.log("Welcome to Shanvi's Midnight Purple Portfolio!");
});
