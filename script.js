// Mobile menu functionality
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  menu.classList.toggle("hidden");
  menu.classList.toggle("flex");
});

// Close menu when clicking on a link
const menuLinks = document.querySelectorAll("#menu a");
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("open");
    menu.classList.add("hidden");
    menu.classList.remove("flex");
  });
});

// Add scroll animation for sections
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fadeIn");
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".section-animate").forEach((section) => {
  observer.observe(section);
});

// Animate elements when they come into view
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".fade-in, .slide-up");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      const delay = element.getAttribute("data-delay") || 0;
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
      element.style.transitionDelay = `${delay}ms`;
    }
  });
};

// Initialize animation styles
document.querySelectorAll(".fade-in").forEach((el) => {
  el.style.opacity = "0";
  el.style.transition = "opacity 0.6s ease-out";
});

document.querySelectorAll(".slide-up").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
});

// Count-up animation for stats
const animateCountUp = () => {
  const studentsCount = document.getElementById("students-count");
  const coursesCount = document.getElementById("courses-count");
  const partnersCount = document.getElementById("partners-count");

  if (isElementInViewport(studentsCount)) {
    countUp(studentsCount, 0, 2500, 2000);
    countUp(coursesCount, 0, 24, 2000);
    countUp(partnersCount, 0, 12, 2000);
    window.removeEventListener("scroll", animateCountUp);
  }
};

const countUp = (element, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight)
  );
};

// Event listeners
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);
window.addEventListener("scroll", animateCountUp);
