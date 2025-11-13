document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("mainHeader");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("sticky");
      document.body.classList.add("sticky-padding");
    } else {
      header.classList.remove("sticky");
      document.body.classList.remove("sticky-padding");
    }
  });

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const videoPlayer = document.getElementById("videoPlayer");
  const sources = [
    "public/videos/video1.mp4",
    "public/videos/video2.mp4"
  ];

  let current = 0;

  if (videoPlayer) {
    videoPlayer.addEventListener("ended", () => {
      current = (current + 1) % sources.length;
      videoPlayer.src = sources[current];
      videoPlayer.play();
    });
  }

  // Анимация появления нижнего блока
  const join = document.querySelector(".join-content");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          join.style.opacity = "1";
        }
      });
    },
    { threshold: 0.3 }
  );
  observer.observe(join);

  // Burger menu
  document.getElementById("burger").addEventListener("click", function () {
    const navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("active");
  });
});

// === Preloader ===
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("hidden"); // плавное исчезновение
    setTimeout(() => {
      preloader.style.display = "none";
    }, 600);
  }
});

// Проверка видео на ошибки
const videoPlayer = document.getElementById("videoPlayer");
if (videoPlayer) {
  videoPlayer.addEventListener("error", () => {
    console.error("Ошибка загрузки видео:", videoPlayer.currentSrc);
  });
};

// Burger menu
document.getElementById("burger").addEventListener("click", function () {
  const navMenu = document.getElementById("navMenu");
  navMenu.classList.toggle("active");
});
