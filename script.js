const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = mobileMenu.querySelectorAll("a");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("show");
});

mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("show");
  });
});
