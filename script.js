// NAV, HAMBURGER, TYPING EFFECT, small helpers
document.addEventListener('DOMContentLoaded', () => {
  // hamburger menu behavior
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const desktopOptions = document.getElementById('desktop-options');
  const socialDesktop = document.getElementById('social-links-desktop');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const opened = hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('show', opened);
      hamburger.setAttribute('aria-expanded', opened ? 'true' : 'false');

      // When mobile menu open hide desktop nav for small widths (visual)
      if (window.innerWidth <= 1000) {
        desktopOptions.style.display = opened ? 'none' : 'none'; // keep hidden on small screens
      }
    });

    // Close menu when clicking links inside it
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('show');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Typing animation
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

  // footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Accessibility: close mobile menu when pressing Escape
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('show')) {
      mobileMenu.classList.remove('show');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // On resize ensure proper display of desktop nav
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1000) {
      document.getElementById('mobile-menu').classList.remove('show');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded','false');
      document.getElementById('desktop-options').style.display = 'flex';
      const social = document.getElementById('social-links-desktop');
      if (social) social.style.display = 'flex';
    } else {
      // On smaller screens hide desktop-options (CSS already handles but ensure inline)
      document.getElementById('desktop-options').style.display = 'none';
    }
  });
});
