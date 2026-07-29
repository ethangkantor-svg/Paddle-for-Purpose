/* =========================================================
   Paddle for Purpose — behavior
   Nav state, scroll reveals, count-up stats.
   No dependencies. Respects prefers-reduced-motion.
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Nav ---------- */
  function initNav() {
    var nav = document.querySelector(".site-nav");
    var sentinel = document.querySelector("#nav-sentinel");
    var toggle = document.querySelector(".nav-toggle");
    var mobilePanel = document.querySelector(".nav-mobile-panel");
    if (!nav) return;

    if (sentinel && "IntersectionObserver" in window) {
      var navObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            nav.classList.toggle("is-scrolled", !entry.isIntersecting);
          });
        },
        { threshold: 0, rootMargin: "-1px 0px 0px 0px" }
      );
      navObserver.observe(sentinel);
    } else {
      nav.classList.add("is-scrolled");
    }

    if (toggle && mobilePanel) {
      toggle.addEventListener("click", function () {
        var isOpen = mobilePanel.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
      });

      mobilePanel.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          mobilePanel.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && mobilePanel.classList.contains("is-open")) {
          mobilePanel.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.focus();
        }
      });
    }

    /* Active link tracking */
    var sections = document.querySelectorAll("main [id], footer[id]");
    var navLinks = document.querySelectorAll(
      ".nav-links a, .nav-mobile-panel a"
    );
    if (sections.length && "IntersectionObserver" in window) {
      var sectionObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var id = entry.target.getAttribute("id");
            navLinks.forEach(function (link) {
              var match = link.getAttribute("href") === "#" + id;
              link.classList.toggle("is-active", match);
            });
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      sections.forEach(function (s) {
        sectionObserver.observe(s);
      });
    }
  }

  /* ---------- Scroll reveals ---------- */
  function initReveals() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach(function (el, i) {
      var group = el.closest("[data-stagger]");
      if (group) {
        var siblings = Array.prototype.slice.call(
          group.querySelectorAll(".reveal")
        );
        var idx = siblings.indexOf(el);
        el.style.setProperty("--delay", idx * 0.08 + "s");
      }
      observer.observe(el);
    });
  }

  /* ---------- Count-up stats ---------- */
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCount(el) {
    var to = parseFloat(el.getAttribute("data-count-to"));
    if (isNaN(to)) return;
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var duration = 1600;
    var start = null;

    function frame(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = easeOutCubic(progress);
      var value = to * eased;
      el.textContent =
        prefix +
        value.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) +
        suffix;
      if (progress < 1) {
        window.requestAnimationFrame(frame);
      } else {
        el.textContent =
          prefix +
          to.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }) +
          suffix;
      }
    }
    window.requestAnimationFrame(frame);
  }

  function initCounters() {
    var counters = document.querySelectorAll("[data-count-to]");
    if (!counters.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      return; // leave the server-rendered final text as-is
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var prefix = el.getAttribute("data-prefix") || "";
            var suffix = el.getAttribute("data-suffix") || "";
            el.textContent = prefix + "0" + suffix;
            animateCount(el);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    var el = document.querySelector("#year");
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initReveals();
    initCounters();
    initYear();
  });
})();
