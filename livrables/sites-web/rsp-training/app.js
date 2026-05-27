/* ---------- App: nav scroll, FAQ, form, reveals ---------- */
(function () {
  // Sticky nav state
  const nav = document.querySelector(".nav");
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle("scrolled", window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    q.addEventListener("click", () => {
      const open = item.classList.toggle("open");
      if (open) {
        a.style.maxHeight = a.scrollHeight + "px";
      } else {
        a.style.maxHeight = "0px";
      }
    });
  });

  // Reveal on scroll
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // Safety net: anything still hidden after 700ms gets shown unconditionally.
  // Covers IO edge cases (initial paint races, throttled tabs, mobile Safari).
  setTimeout(() => {
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => el.classList.add("in"));
  }, 700);

  // Smooth scroll override for anchor links (offset for sticky nav)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href === "#" || href.length < 2) return;
      const tgt = document.querySelector(href);
      if (!tgt) return;
      e.preventDefault();
      const y = tgt.getBoundingClientRect().top + window.pageYOffset - 76;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  // Intake form
  const form = document.getElementById("intake-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // Collect responses
      const data = {};
      const fd = new FormData(form);
      for (const [k, v] of fd.entries()) {
        if (data[k] !== undefined) {
          if (!Array.isArray(data[k])) data[k] = [data[k]];
          data[k].push(v);
        } else {
          data[k] = v;
        }
      }
      // Simulate submit + show success message
      form.classList.add("submitted");
      const success = form.querySelector(".form-success");
      success.classList.add("show");
      // Scroll into view
      const y = form.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
      // For prod: send to backend / email
      console.log("[intake submitted]", data);
    });
  }

  // Active section highlight in nav (optional polish)
  const navLinks = document.querySelectorAll(".nav-links a");
  if (navLinks.length) {
    const sections = [...navLinks]
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);
    const setActive = () => {
      const y = window.scrollY + 120;
      let current = sections[0];
      for (const s of sections) {
        if (s.offsetTop <= y) current = s;
      }
      navLinks.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + current.id);
      });
    };
    window.addEventListener("scroll", setActive, { passive: true });
    setActive();
  }
})();
