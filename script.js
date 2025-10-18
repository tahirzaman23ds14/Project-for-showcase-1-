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
const roles = ["Problem Solver", "Code Explorer", "AI Expert"];
let index = 0;
let charIndex = 0;
const animatedText = document.getElementById("animated-text");

function typeEffect() {
  if (charIndex < roles[index].length) {
    animatedText.textContent += roles[index].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 120);
  } else {
    setTimeout(eraseEffect, 1200);
  }
}

function eraseEffect() {
  if (charIndex > 0) {
    animatedText.textContent = roles[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 70);
  } else {
    index = (index + 1) % roles.length;
    setTimeout(typeEffect, 400);
  }
}

typeEffect();
