
// ЗАДАНИЕ 1: JSON И КОРЗИНА
let products = [];
let cart = JSON.parse(localStorage.getItem('shopCart')) || [];

// Загрузка товаров из JSON
async function loadCatalog() {
    try {
        // Если запускаете без сервера, замените fetch на массив из начала задания
        const response = await fetch('products.json');
        products = await response.json();
        renderCatalog();
        updateCartUI();
    } catch (e) {
        console.error("Ошибка загрузки JSON. Убедитесь, что используете Live Server", e);
    }
}

function renderCatalog() {
    const catalogDiv = document.getElementById('catalog');
    catalogDiv.innerHTML = products.map(p => `
        <div class="product-card">
            <h3>${p.name}</h3>
            <p>${p.price} руб.</p>
            <button class="btn-buy" onclick="addToCart(${p.id})">Добавить</button>
        </div>
    `).join('');
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    saveCart();
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const cartItems = document.getElementById('cart-items');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    cartItems.innerHTML = cart.map((item, index) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
            <span>${item.name}</span>
            <b>${item.price} р.</b>
        </div>
    `).join('');
    document.getElementById('cart-total').innerText = total;
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('shopCart', JSON.stringify(cart));
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

// COOKIE
function getFormData() {
    return {
        fio: document.getElementById('fio').value,
        email: document.getElementById('email').value,
        dob: document.getElementById('dob').value,
        pob: document.getElementById('pob').value,
        hobbies: document.getElementById('hobbies').value
    };
}

function setFormData(data) {
    if (!data) return;
    document.getElementById('fio').value = data.fio || '';
    document.getElementById('email').value = data.email || '';
    document.getElementById('dob').value = data.dob || '';
    document.getElementById('pob').value = data.pob || '';
    document.getElementById('hobbies').value = data.hobbies || '';
}

function saveToCookie() {
    const data = getFormData();
    const jsonStr = JSON.stringify(data);
    // Срок жизни 7 дней, кодируем для поддержки кириллицы
    document.cookie = "userData=" + encodeURIComponent(jsonStr) + "; max-age=" + (7*24*60*60) + "; path=/";
    alert("Данные сохранены в Cookie!");
}

function loadFromCookie() {
    const name = "userData=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) {
            const data = JSON.parse(c.substring(name.length, c.length));
            setFormData(data);
            alert("Данные загружены из Cookie!");
            return;
        }
    }
    alert("Cookie не найдены");
}

function clearCookie() {
    document.cookie = "userData=; max-age=0; path=/";
    alert("Cookie очищены");
}

//LOCAL STORAGE
function saveToLS() {
    const data = getFormData();
    localStorage.setItem('userProfile', JSON.stringify(data));
    alert("Данные сохранены в Local Storage!");
}

function loadFromLS() {
    const data = localStorage.getItem('userProfile');
    if (data) {
        setFormData(JSON.parse(data));
        alert("Данные загружены из Local Storage!");
    } else {
        alert("В Local Storage ничего нет");
    }
}

function clearLS() {
    localStorage.removeItem('userProfile');
    alert("Local Storage очищен");
}

// Инициализация
loadCatalog();