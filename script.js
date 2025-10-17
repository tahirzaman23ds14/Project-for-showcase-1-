/**
 * script.js
 * Implements the mobile navigation menu toggle functionality using modern DOM methods.
 * This version updates the hamburger icon (☰) to a cross icon (×) when the menu is open,
 * improving visual feedback for the user. It also maintains accessibility (aria-expanded)
 * and keyboard (ESC key) handling.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Select elements based on the IDs and classes in your HTML structure
    const hamburger = document.getElementById('hamburger'); // The button (☰/×)
    const menuContainer = document.getElementById('menuContainer'); // The menu panel
    const navLinks = document.querySelectorAll('.options a'); // Links inside the panel

    // Define the icons using HTML entities
    // &times; is the cross/multiplication symbol (×)
    // &#9776; is the three-bar hamburger symbol (☰)
    const ICON_HAMBURGER = '&#9776;';
    const ICON_CROSS = '&times;';

    /**
     * Updates the visual state and accessibility attributes of the menu and hamburger icon.
     * @param {boolean} isOpen - True if the menu should be open, false otherwise.
     */
    function updateMenuState(isOpen) {
        if (menuContainer) {
            // Toggle the 'show' class (true to open, false to close)
            menuContainer.classList.toggle('show', isOpen);
        }
        if (hamburger) {
            // Swap the icon content (Cross when open, Hamburger when closed)
            hamburger.innerHTML = isOpen ? ICON_CROSS : ICON_HAMBURGER;
            
            // Set aria-expanded for accessibility
            hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
    }

    // --- Initialization and Toggle mobile menu on click ---
    if (hamburger && menuContainer) {
        // Initialize the icon and state on load
        updateMenuState(false); 

        hamburger.addEventListener('click', () => {
            // Determine the next state based on the current state
            const willBeOpen = !menuContainer.classList.contains('show');
            updateMenuState(willBeOpen);
        });
    }

    // --- Close menu on link click (mobile best practice) ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuContainer && menuContainer.classList.contains('show')) {
                updateMenuState(false); // Close the menu
            }
        });
    });

    // --- Close mobile menu on ESC key press (accessibility enhancement) ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (menuContainer && menuContainer.classList.contains('show')) {
                updateMenuState(false); // Close the menu
            }
        }
    });
});
