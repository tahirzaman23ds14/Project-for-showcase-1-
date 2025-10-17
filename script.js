document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const menuContainer = document.getElementById('menuContainer');
  const navLinks = document.querySelectorAll('.options a');

  function updateMenuState(isOpen) {
    menuContainer.classList.toggle('show', isOpen);
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  hamburger.addEventListener('click', () => {
    const willBeOpen = !menuContainer.classList.contains('show');
    updateMenuState(willBeOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuContainer.classList.contains('show')) updateMenuState(false);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuContainer.classList.contains('show')) {
      updateMenuState(false);
    }
  });
});
