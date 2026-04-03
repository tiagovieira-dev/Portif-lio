document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    "section h2, section p, section h3, section .card, section .servico, section .timeline-item, section .btn-cta"
  );

  elements.forEach((el, index) => {
    el.classList.add("reveal");
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, {
  });

  elements.forEach((el) => observer.observe(el));
});