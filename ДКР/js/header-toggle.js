let lastScroll = 0;

window.addEventListener("scroll", function () {
  const mainHeader = document.querySelector(".main-header");
  const fixedHeader = document.querySelector(".fixed-header");

  // Проверяем ширину экрана
  if (window.innerWidth < 820) {
    // Скрываем fixed-header, если он был показан
    fixedHeader.classList.remove("visible");
    mainHeader.classList.remove("hidden");
    return; // ничего не делаем
  }

  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 150) {
    // Скролл вниз — прячем основной, показываем фиксированный
    mainHeader.classList.add("hidden");
    fixedHeader.classList.add("visible");
  } else {
    // Скролл вверх — возвращаем основной
    mainHeader.classList.remove("hidden");
    fixedHeader.classList.remove("visible");
  }

  lastScroll = currentScroll;
});