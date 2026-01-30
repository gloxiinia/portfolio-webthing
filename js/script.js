const carousel = document.getElementById("imageCarousel");

let isDown = false;
let startX;
let scrollLeft;

carousel.addEventListener("mousedown", (e) => {
  if (e.button !== 0) return;

  isDown = true;
  carousel.classList.add("cursor-grabbing");
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener("mouseleave", () => {
  isDown = false;
  carousel.classList.remove("cursor-grabbing");
});

carousel.addEventListener("mouseup", () => {
  isDown = false;
  carousel.classList.remove("cursor-grabbing");
});

carousel.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();

  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 1.2;
  carousel.scrollLeft = scrollLeft - walk;
});

//Touch support
carousel.addEventListener(
  "touchstart",
  (e) => {
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  },
  { passive: true }
);

carousel.addEventListener(
  "touchmove",
  (e) => {
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.2;
    carousel.scrollLeft = scrollLeft - walk;
  },
  { passive: true }
);
