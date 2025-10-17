document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const menuContainer = document.getElementById('menuContainer');
  const navLinks = document.querySelectorAll('.options a');

  function toggleMenu(isOpen) {
    menuContainer.classList.toggle('show', isOpen);
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  hamburger.addEventListener('click', () => {
    const willOpen = !menuContainer.classList.contains('show');
    toggleMenu(willOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuContainer.classList.contains('show')) {
      toggleMenu(false);
    }
  });
});
