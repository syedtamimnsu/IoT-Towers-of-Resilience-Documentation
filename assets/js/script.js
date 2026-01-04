// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  });
});

// Counter animation (hub metrics)
function animateCounters() {
  document.querySelectorAll("[data-count]").forEach((node) => {
    const target = parseInt(node.getAttribute("data-count"), 10);
    if (Number.isNaN(target)) return;

    let current = 0;
    const steps = 28;
    const inc = target / steps;

    const timer = setInterval(() => {
      current += inc;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      node.textContent = Math.floor(current);
    }, 38);
  });
}

const hub = document.querySelector(".hub-card");
if (hub) {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        animateCounters();
        obs.disconnect();
      });
    },
    { threshold: 0.4 }
  );
  obs.observe(hub);
}

// Copy DOI
const btn = document.getElementById("copyDoiBtn");
if (btn) {
  btn.addEventListener("click", async () => {
    const doi = "10.1109/MMAR62187.2024.10680736";
    try {
      await navigator.clipboard.writeText(doi);
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
      setTimeout(() => (btn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy'), 1200);
    } catch {
      alert("Copy failed. Please copy manually: " + doi);
    }
  });
}
