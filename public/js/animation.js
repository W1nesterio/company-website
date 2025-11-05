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
});

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  document.body.classList.add("loading");
  document.documentElement.classList.add("loading");

  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
        document.body.classList.remove("loading");
        document.documentElement.classList.remove("loading");
      }, 600);
    }, 2000);
  }
});
console.log("videoPlayer:", videoPlayer);
console.log("sourceElement:", sourceElement);
videoPlayer.addEventListener("error", () => {
  console.error("Ошибка загрузки видео:", sourceElement.src);
});
