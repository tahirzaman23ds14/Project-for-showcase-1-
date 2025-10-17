    // simple toggle — no color or content changes
    const hamburger = document.getElementById('hamburger');
    const menuContainer = document.getElementById('menuContainer');

    hamburger.addEventListener('click', () => {
      menuContainer.classList.toggle('show');
    });