document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: isMobile ? 0.08 : 0.12,
      rootMargin: isMobile ? "0px 0px -5% 0px" : "0px 0px -8% 0px",
    }
  );

  revealElements.forEach((el) => observer.observe(el));
});
