
function showBgScroll() {
  let bg = document.querySelector(".header");
  bg.style.opacity = 1 - window.pageYOffset / 700;
  bg.style.backgroundSize = 160 - +window.pageYOffset / 12 + "%";
  if (bg.style.opacity < -0.25) {
    bg.style.opacity = 1;    
  }
}

window.addEventListener("scroll", showBgScroll);