const revealTargets = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach(target => observer.observe(target));
} else {
  revealTargets.forEach(target => target.classList.add("is-visible"));
}

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");

if (navToggle && navLinks) {
  const setMenu = isOpen => {
    navLinks.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
  };

  navToggle.addEventListener("click", () => {
    setMenu(!navLinks.classList.contains("is-open"));
  });

  navLinks.addEventListener("click", event => {
    if (event.target.closest("a")) {
      setMenu(false);
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && navLinks.classList.contains("is-open")) {
      setMenu(false);
      navToggle.focus();
    }
  });

  document.addEventListener("click", event => {
    if (
      navLinks.classList.contains("is-open") &&
      !event.target.closest(".nav")
    ) {
      setMenu(false);
    }
  });
}
