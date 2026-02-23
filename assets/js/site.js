/**
 * Eden Fife Healthcare - Site Interactivity
 * Lightweight vanilla JS replacing Next.js bundles
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    /* ========================================
           1. STICKY HEADER
        ======================================== */
    var stickyHeader = document.querySelector(".sticky-header");
    if (stickyHeader) {
      window.addEventListener("scroll", function () {
        if (window.scrollY > 100) {
          stickyHeader.classList.add("fixed-header", "animated", "slideInDown");
        } else {
          stickyHeader.classList.remove(
            "fixed-header",
            "animated",
            "slideInDown",
          );
        }
      });
    }

    /* ========================================
           2. MOBILE MENU
        ======================================== */
    var mobileTogglers = document.querySelectorAll(".mobile-nav-toggler");
    var mobileMenu = document.querySelector(".mobile-menu");
    var closeBtn = mobileMenu ? mobileMenu.querySelector(".close-btn") : null;
    var menuBackdrop = mobileMenu
      ? mobileMenu.querySelector(".menu-backdrop")
      : null;

    function openMobileMenu() {
      if (mobileMenu) {
        mobileMenu.classList.add("active");
        document.body.classList.add("mobile-menu-visible");
      }
    }
    function closeMobileMenu() {
      if (mobileMenu) {
        mobileMenu.classList.remove("active");
        document.body.classList.remove("mobile-menu-visible");
      }
    }

    mobileTogglers.forEach(function (toggler) {
      toggler.addEventListener("click", openMobileMenu);
    });
    if (closeBtn) closeBtn.addEventListener("click", closeMobileMenu);
    if (menuBackdrop) menuBackdrop.addEventListener("click", closeMobileMenu);

    // Mobile dropdown toggles
    var dropdownBtns = document.querySelectorAll(".mobile-menu .dropdown-btn");
    dropdownBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var parent = this.closest("li");
        var submenu = parent ? parent.querySelector("ul") : null;
        if (submenu) {
          var isOpen = submenu.style.display === "block";
          submenu.style.display = isOpen ? "none" : "block";
          this.classList.toggle("open");
        }
      });
    });

    /* ========================================
           3. HIDDEN SIDEBAR
        ======================================== */
    var hiddenSidebar = document.querySelector(".hidden-sidebar");
    var sidebarClose = hiddenSidebar
      ? hiddenSidebar.querySelector(".hidden-sidebar-close")
      : null;
    var navOverlay = document.querySelector(".nav-overlay");

    if (sidebarClose) {
      sidebarClose.addEventListener("click", function () {
        hiddenSidebar.classList.add("close-sidebar");
        hiddenSidebar.style.right = "-480px";
        if (navOverlay) navOverlay.style.display = "none";
      });
    }

    /* ========================================
           4. DESKTOP NAV DROPDOWN HOVER
        ======================================== */
    // The CSS already handles dropdown visibility on hover via .navigation li:hover > ul
    // No JS needed for desktop dropdowns - they work via CSS

    /* ========================================
           5. SWIPER / TESTIMONIAL SLIDER
        ======================================== */
    if (typeof Swiper !== "undefined") {
      // Testimonial slider
      var testimonialSliders = document.querySelectorAll(
        ".testimonial-1-block-wrap .theme_carousel",
      );
      testimonialSliders.forEach(function (el) {
        new Swiper(el, {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          breakpoints: {
            768: { slidesPerView: 2 },
          },
        });
      });

      // Client logo slider
      var logoSliders = document.querySelectorAll(
        ".client-logo-1-section .theme_carousel",
      );
      logoSliders.forEach(function (el) {
        new Swiper(el, {
          slidesPerView: 2,
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          breakpoints: {
            576: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          },
        });
      });
    }

    /* ========================================
           6. ACCORDION / FAQ
        ======================================== */
    var accBtns = document.querySelectorAll(".acc-btn");
    accBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var block =
          this.closest(".accordion.block") || this.closest(".accordion");
        if (!block) return;

        var content = block.querySelector(".acc-content");
        var isActive = this.classList.contains("active");

        // Close all siblings
        var parent = block.parentNode;
        if (parent) {
          parent.querySelectorAll(".acc-btn").forEach(function (b) {
            b.classList.remove("active");
          });
          parent.querySelectorAll(".acc-content").forEach(function (c) {
            c.classList.remove("current");
            c.style.display = "none";
          });
        }

        // Toggle current
        if (!isActive && content) {
          this.classList.add("active");
          content.classList.add("current");
          content.style.display = "block";
        }
      });
    });

    /* ========================================
           7. SCROLL ANIMATIONS (WOW.js replacement)
        ======================================== */
    var animatedElements = document.querySelectorAll(".wow");

    function checkAnimations() {
      animatedElements.forEach(function (el) {
        if (el.classList.contains("animated")) return;

        var rect = el.getBoundingClientRect();
        var windowHeight = window.innerHeight;

        if (rect.top < windowHeight - 50) {
          var delay = el.getAttribute("data-wow-delay") || "0s";
          var duration = el.getAttribute("data-wow-duration") || "1s";
          el.style.animationDelay = delay;
          el.style.animationDuration = duration;

          // Get the animation class (fadeInLeft, fadeInRight, fadeInUp, etc.)
          var animClass = "";
          el.classList.forEach(function (cls) {
            if (
              cls.indexOf("fadeIn") === 0 ||
              cls.indexOf("slideIn") === 0 ||
              cls.indexOf("zoomIn") === 0 ||
              cls.indexOf("bounceIn") === 0
            ) {
              animClass = cls;
            }
          });

          el.classList.add("animated");
          el.style.visibility = "visible";
          el.style.opacity = "1";
        }
      });
    }

    // Initial check and scroll listener
    checkAnimations();
    window.addEventListener("scroll", checkAnimations);

    /* ========================================
           8. PROGRESS BAR ANIMATION
        ======================================== */
    var progressBars = document.querySelectorAll(".progress-line");

    function animateProgressBars() {
      progressBars.forEach(function (bar) {
        if (bar.classList.contains("animated-bar")) return;
        var rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          var width = bar.getAttribute("data-width") || "100";
          bar.style.width = width + "%";
          bar.classList.add("animated-bar");
        }
      });
    }

    animateProgressBars();
    window.addEventListener("scroll", animateProgressBars);

    /* ========================================
           9. COUNTER ANIMATION
        ======================================== */
    var countElements = document.querySelectorAll(".count-text");
    var countAnimated = new Set();

    function animateCounters() {
      countElements.forEach(function (el) {
        if (countAnimated.has(el)) return;
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          countAnimated.add(el);
          var target = parseInt(el.textContent, 10);
          if (isNaN(target)) return;
          var current = 0;
          var increment = Math.ceil(target / 50);
          var timer = setInterval(function () {
            current += increment;
            if (current >= target) {
              el.textContent = target;
              clearInterval(timer);
            } else {
              el.textContent = current;
            }
          }, 30);
        }
      });
    }

    animateCounters();
    window.addEventListener("scroll", animateCounters);

    /* ========================================
           10. LINK REWRITING (.html extensions)
           Convert /about -> about.html etc. for static hosting
        ======================================== */
    var allLinks = document.querySelectorAll("a[href]");
    allLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      // Skip external links, anchors, mailto, tel, and already-extended paths
      if (
        !href ||
        href.startsWith("http") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.includes(".")
      )
        return;
      // Convert /page-name to page-name.html
      if (href.startsWith("/")) {
        var pageName = href.substring(1);
        if (pageName === "" || pageName === "/") {
          link.setAttribute("href", "index.html");
        } else {
          link.setAttribute("href", pageName + ".html");
        }
      }
    });

    /* ========================================
           11. BANNER ANIMATION CLASSES
        ======================================== */
    var bannerInner = document.querySelector(".banner-inner-visible");
    var bannerLinkbox = document.querySelector(".banner-linkbox-visible");
    if (bannerInner) {
      bannerInner.style.opacity = "1";
      bannerInner.style.transform = "translateY(0)";
    }
    if (bannerLinkbox) {
      bannerLinkbox.style.opacity = "1";
      bannerLinkbox.style.transform = "translateY(0)";
    }

    /* ========================================
           12. CONTACT FORM HANDLING
           Using Formspree to send to admin@edenfife.com
        ======================================== */
    var contactForms = document.querySelectorAll(
      'form[id="contact-form"], .login-form, .register-form, .appointment-form-widget form',
    );
    contactForms.forEach(function (form) {
      // Set Formspree endpoint (mapped to admin@edenfife.com)
      form.setAttribute("action", "https://formspree.io/f/mqaeapne");
      form.setAttribute("method", "POST");

      form.addEventListener("submit", function (e) {
        // Formspree handles the submission, but we can add UI feedback here if needed
        var btn = form.querySelector('button[type="submit"]');
        if (btn) {
          var originalText = btn.innerHTML;
          btn.innerHTML = "Sending...";
          btn.disabled = true;

          // Note: Formspree will redirect to its success page by default.
          // To stay on page, we would need to use AJAX (fetch), but redirect is often safer for static sites.
        }
      });
    });

    /* ========================================
           13. COOKIE CONSENT BANNER
        ======================================== */
    if (!localStorage.getItem("cookieConsent")) {
      var cookieBanner = document.createElement("div");
      cookieBanner.id = "cookie-consent-banner";
      cookieBanner.innerHTML = `
        <div class="cookie-content">
          <div class="cookie-text">
            <i class="fas fa-cookie-bite"></i>
            <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies. <a href="/privacy-policy">Learn more</a></p>
          </div>
          <div class="cookie-actions">
            <button id="decline-cookies" class="btn-cookie-decline">Decline</button>
            <button id="accept-cookies" class="btn-1 btn-small">Accept All <span></span></button>
          </div>
        </div>
      `;
      document.body.appendChild(cookieBanner);

      // Add styles dynamically to keep roundness.css clean or use this for immediate effect
      var style = document.createElement("style");
      style.innerHTML = `
        #cookie-consent-banner {
          position: fixed;
          bottom: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 600px;
          background: #ffffff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          border-radius: 20px;
          padding: 20px 25px;
          z-index: 10000;
          transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
          opacity: 0;
        }
        #cookie-consent-banner.show {
          bottom: 30px;
          opacity: 1;
        }
        .cookie-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        .cookie-text {
          display: flex;
          align-items: center;
          gap: 15px;
          color: var(--grey-700, #444);
          font-size: 14px;
          line-height: 1.5;
        }
        .cookie-text i {
          font-size: 24px;
          color: var(--theme-color, #23b26d);
        }
        .cookie-text p { margin: 0; }
        .cookie-text a { color: var(--theme-color, #23b26d); font-weight: 600; text-decoration: underline; }
        .cookie-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .btn-cookie-decline {
          background: transparent;
          border: none;
          color: var(--grey-600, #777);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          padding: 5px 10px;
        }
        @media (max-width: 767px) {
          .cookie-content { flex-direction: column; text-align: center; }
          .cookie-text { flex-direction: column; gap: 10px; }
          .cookie-actions { width: 100%; justify-content: center; }
          #cookie-consent-banner.show { bottom: 20px; }
        }
      `;
      document.head.appendChild(style);

      // Show banner with a slight delay for "seamless" feel
      setTimeout(function () {
        cookieBanner.classList.add("show");
      }, 1500);

      document.getElementById("accept-cookies").addEventListener("click", function () {
        localStorage.setItem("cookieConsent", "accepted");
        cookieBanner.classList.remove("show");
        setTimeout(() => cookieBanner.remove(), 600);
      });

      document.getElementById("decline-cookies").addEventListener("click", function () {
        localStorage.setItem("cookieConsent", "declined");
        cookieBanner.classList.remove("show");
        setTimeout(() => cookieBanner.remove(), 600);
      });
    }
  });
})();
