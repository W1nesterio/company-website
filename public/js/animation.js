document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("mainHeader");
  const burger = document.getElementById("burger");
  const navMenu = document.getElementById("navMenu").querySelector("ul");
  const join = document.querySelector(".join-content");
  const videoPlayer = document.getElementById("videoPlayer");

  // === Sticky header при скролле
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("sticky");
      document.body.classList.add("sticky-padding");
    } else {
      header.classList.remove("sticky");
      document.body.classList.remove("sticky-padding");
    }
  });

  // === Scroll Restoration
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  // === Видео-плеер
  const sources = ["public/videos/video1.mp4", "public/videos/video2.mp4"];
  let current = 0;
  if (videoPlayer) {
    videoPlayer.addEventListener("ended", () => {
      current = (current + 1) % sources.length;
      videoPlayer.src = sources[current];
      videoPlayer.play();
    });

    videoPlayer.addEventListener("error", () => {
      console.error("Ошибка загрузки видео:", videoPlayer.currentSrc);
    });
  }

  // === Анимация Join
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) join.style.opacity = "1";
      });
    },
    { threshold: 0.3 }
  );
  if (join) observer.observe(join);

  // === Burger menu
  if (burger && navMenu) {
    burger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      burger.classList.toggle("open"); // для анимации
    });
  }
});

// === Preloader ===
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("hidden");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 600);
  }
});
