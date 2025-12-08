// Smooth scroll to sections using data-target
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;

  const yOffset = -70; // adjust for sticky navbar height
  const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
}

// Attach click handlers for navigation & buttons
document.querySelectorAll("[data-target]").forEach((el) => {
  el.addEventListener("click", () => {
    const targetId = el.getAttribute("data-target");
    scrollToSection(targetId);

    // Close mobile menu if open
    const navLinks = document.getElementById("navLinks");
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
    }
  });
});

// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Readiness slider logic
const slides = document.querySelectorAll(".readiness-slide");
const prevSlideBtn = document.getElementById("prevSlide");
const nextSlideBtn = document.getElementById("nextSlide");
let currentSlideIndex = 0;

function showSlide(index) {
  if (!slides.length) return;
  currentSlideIndex = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    if (i === currentSlideIndex) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });
}

if (prevSlideBtn && nextSlideBtn) {
  prevSlideBtn.addEventListener("click", () => {
    showSlide(currentSlideIndex - 1);
  });

  nextSlideBtn.addEventListener("click", () => {
    showSlide(currentSlideIndex + 1);
  });
}

// "Read more" toggles for cold wave & flood
document.querySelectorAll(".read-more-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const content = document.getElementById(targetId);
    if (!content) return;

    content.classList.toggle("open");
    btn.textContent = content.classList.contains("open") ? "Read less" : "Read more";
  });
});

// Report form handling (front-end only)
const reportForm = document.getElementById("reportForm");
const statusMsg = document.getElementById("statusMsg");

if (reportForm) {
  reportForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const requiredFields = ["name", "phone", "type", "location", "details"];
    for (const id of requiredFields) {
      const field = document.getElementById(id);
      if (!field || !field.value.trim()) {
        statusMsg.textContent = "Please fill in all required fields.";
        statusMsg.className = "status-msg status-error";
        return;
      }
    }

    statusMsg.textContent =
      "Thank you. Your incident report has been recorded and forwarded to the control room.";
    statusMsg.className = "status-msg status-success";

    // Reset form after short delay
    setTimeout(() => {
      reportForm.reset();
    }, 1000);
  });
}

// Set current year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Ensure first slide is visible on load
showSlide(0);

// ===== LOGIN REDIRECT (CHOOSE ROLE) =====
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    // redirect to role selection page
    window.location.href = "choose-login.html"; // file at same level as index.html
  });
}
document.querySelectorAll(".dropdown-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.parentElement.classList.toggle("open");
  });
});
