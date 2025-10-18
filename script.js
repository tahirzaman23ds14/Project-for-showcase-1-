// NAV, HAMBURGER, TYPING EFFECT, SCROLL SPY
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const desktopOptions = document.getElementById('desktop-options');
  const socialDesktop = document.getElementById('social-links-desktop');

  // ---------- Hamburger toggle ----------
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const opened = hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('show', opened);
      hamburger.setAttribute('aria-expanded', opened ? 'true' : 'false');
      mobileMenu.setAttribute('aria-hidden', opened ? 'false' : 'true');

      if (window.innerWidth <= 1000) {
        desktopOptions.style.display = 'none';
        socialDesktop.style.display = 'none';
      }
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('show');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // ---------- Typing animation ----------
  const textArray = ["Problem Solver", "Code Explorer", "AI Expert", "Innovator"];
  let i = 0, j = 0;
  const speed = 120;
  const textEl = document.getElementById('changing-text');

  function typeEffect() {
    if (!textEl) return;
    if (j < textArray[i].length) {
      textEl.textContent += textArray[i].charAt(j);
      j++;
      setTimeout(typeEffect, speed);
    } else {
      setTimeout(eraseEffect, 1400);
    }
  }
  function eraseEffect() {
    if (!textEl) return;
    if (j > 0) {
      textEl.textContent = textArray[i].substring(0, j - 1);
      j--;
      setTimeout(eraseEffect, Math.round(speed * 0.6));
    } else {
      i = (i + 1) % textArray.length;
      setTimeout(typeEffect, 500);
    }
  }
  typeEffect();

  // ---------- footer year ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Accessibility: Escape to close mobile menu ----------
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('show')) {
      mobileMenu.classList.remove('show');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  });

  // ---------- Smooth scroll for navbar links ----------
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#') && targetId !== '#') {
        e.preventDefault();
        const section = document.querySelector(targetId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });

          // Close menu on mobile
          if (mobileMenu.classList.contains('show')) {
            mobileMenu.classList.remove('show');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
          }
        }
      }
    });
  });

  // ---------- On resize ensure proper display of desktop nav ----------
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1000) {
      mobileMenu.classList.remove('show');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      desktopOptions.style.display = 'flex';
      if (socialDesktop) socialDesktop.style.display = 'flex';
    } else {
      desktopOptions.style.display = 'none';
      if (socialDesktop) socialDesktop.style.display = 'none';
    }
  });

  // ---------- About section reveal ----------
  const about = document.querySelector('.about-section');
  if (about) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          about.classList.add('visible');
          obs.unobserve(about);
        }
      });
    }, { threshold: 0.25 });
    observer.observe(about);
  }

  // ---------- Scroll Spy (Active Navbar Highlight) ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#desktop-options a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (current && link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
