// ==========================================
// ЛР №17: СОБЫТИЯ
// ==========================================

// 1. Событие мыши: Подсветка карточек каталога
document.querySelectorAll('.catalog-item').forEach(item => {
    item.addEventListener('mouseenter', () => item.style.transform = 'scale(1.02)');
    item.addEventListener('mouseleave', () => item.style.transform = 'scale(1)');
});

// 2. Событие клавиатуры: Поиск по нажатию Enter в поле поиска
const searchInput = document.querySelector('.search-group input');
if(searchInput) {
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            alert('Поиск: ' + e.target.value);
        }
    });
}

// 3. События полосы прокрутки (Scroll): Появление кнопки "Наверх"
const scrollTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
    } else {
        scrollTopBtn.style.opacity = '0';
    }
});

// 4. События таймера: Показ спецпредложения через 10 секунд
setTimeout(() => {
    console.log("Акция: Скидка 5% при заказе прямо сейчас!");
}, 1000);


// ==========================================
// ЛР №19-20: COOKIE И LOCAL STORAGE
// ==========================================

// Сохранение в Cookie
function saveToCookie(data) {
    const jsonStr = JSON.stringify(data);
    document.cookie = "last_order=" + encodeURIComponent(jsonStr) + "; max-age=3600; path=/";
    console.log("Сохранено в Cookie");
}

// Сохранение в Local Storage
function saveToLocalStorage(data) {
    localStorage.setItem('user_order', JSON.stringify(data));
    console.log("Сохранено в Local Storage");
}

// Получение данных при загрузке страницы
window.onload = function() {
    // Из Local Storage
    const savedLS = localStorage.getItem('user_order');
    if(savedLS) {
        const data = JSON.parse(savedLS);
        showDataOnPage(data);
    }
};

// Очистка (Задание №3.4)
function clearAllStorage() {
    localStorage.removeItem('user_order');
    document.cookie = "last_order=; max-age=-1; path=/";
    document.getElementById('storage-info').style.display = 'none';
    alert("Данные удалены");
}


// ==========================================
// ЗАДАНИЕ №5: JSON И ИЗБРАННОЕ (ВМЕСТО КОРЗИНЫ)
// ==========================================

let favorites = JSON.parse(localStorage.getItem('festa_favs')) || [];

function updateFavBadge() {
    const badge = document.getElementById('fav-count');
    if(badge) badge.innerText = favorites.length;
}

// Функция добавления в избранное
function toggleFavorite(id) {
    const index = favorites.indexOf(id);
    if (index === -1) {
        favorites.push(id);
        alert("Товар добавлен в избранное!");
    } else {
        favorites.splice(index, 1);
        alert("Товар удален из избранного");
    }
    localStorage.setItem('festa_favs', JSON.stringify(favorites));
    updateFavBadge();
}

// Эмуляция загрузки из JSON-файла и отрисовка (для демонстрации)
async function loadCatalog() {
    try {
        // В реальном проекте: const response = await fetch('products.json');
        // Здесь создадим имитацию загрузки массива из 10 объектов
        const products = [
            {id: 1, name: "Шкаф Капелла", price: 18000},
            {id: 2, name: "Кухня ТЕЯ", price: 25900},
            {id: 3, name: "Шкаф Невада", price: 21500},
            {id: 4, name: "Комод Сити", price: 8500},
            {id: 5, name: "Прихожая Милан", price: 23700},
            {id: 6, name: "Стенка Лофт", price: 34900},
            {id: 7, name: "Кровать Эмма", price: 15000},
            {id: 8, name: "Кухня Вега", price: 31900},
            {id: 9, name: "Шкаф Сити", price: 19800},
            {id: 10, name: "Тумба ТВ", price: 5400}
        ];
        console.log("Загружен JSON каталог:", products);
    } catch (e) {
        console.error("Ошибка загрузки JSON");
    }
}

loadCatalog();
updateFavBadge();

// Привязываем клик к иконкам (нужно добавить класс .btn-fav в HTML карточкам)
// Для примера привяжем к картинке сердца, если вы её добавите в карточки.