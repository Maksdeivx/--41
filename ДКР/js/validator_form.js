// Вспомогательная функция для сохранения данных (Задания №3 и №4)
function saveToAllStorages(name, phone) {
  const userData = {
    name: name,
    phone: phone,
    timestamp: new Date().toLocaleString()
  };

  const jsonString = JSON.stringify(userData);

  // 1. Сохранение в Local Storage (Задание №4)
  localStorage.setItem('user_order', jsonString);

  // 2. Сохранение в COOKIE на 1 час (Задание №3)
  // encodeURIComponent нужен для корректной работы с кириллицей в куки
  document.cookie = "last_order=" + encodeURIComponent(jsonString) + "; max-age=3600; path=/";

  console.log("Данные успешно сохранены в Cookie и LocalStorage:", userData);
}

// 1. Форма "Любая корпусная мебель под заказ" (authForm-2)
document.addEventListener('DOMContentLoaded', function () {
  const form2 = document.getElementById('authForm-2');
  if (form2) {
    form2.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name-2').value.trim();
      const phone = document.getElementById('phone-number-2').value.trim();
      const agree = document.getElementById('agree2').checked;

      const errors = [];
      if (!name || name.length < 2) errors.push("Введите ваше имя (не менее 2 символов).");
      if (!/^\+?\d{10,15}$/.test(phone)) errors.push("Введите корректный номер телефона.");
      if (!agree) errors.push("Вы должны согласиться на обработку данных.");

      const errorBox = document.getElementById('form-2-errors');
      if (errors.length > 0) {
        errorBox.innerHTML = errors.join("<br>");
      } else {
        errorBox.innerHTML = "";
        // СОХРАНЕНИЕ
        saveToAllStorages(name, phone);
        alert("Заявка (форма 2) сохранена в браузере!");
      }
    });
  }
});

// 2. Форма "Проконсультируем и подберем" (authForm)
document.addEventListener('DOMContentLoaded', function () {
  const form1 = document.getElementById('authForm');
  if (form1) {
    form1.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone-number').value.trim();
      const agree = document.getElementById('agree1').checked;

      const errors = [];
      if (!name || name.length < 2) errors.push("Введите ваше имя (не менее 2 символов).");
      if (!/^\+?\d{10,15}$/.test(phone)) errors.push("Введите корректный номер телефона.");
      if (!agree) errors.push("Вы должны согласиться на обработку данных.");

      const errorBox = document.getElementById('form-1-errors');
      if (errors.length > 0) {
        errorBox.innerHTML = errors.join("<br>");
      } else {
        errorBox.innerHTML = "";
        // СОХРАНЕНИЕ
        saveToAllStorages(name, phone);
        alert("Заявка (форма 1) сохранена в браузере!");
      }
    });
  }
});

// 3. Модальное окно обратной связи (ModalForm)
const modalForm = document.getElementById('ModalForm');
if (modalForm) {
  modalForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('modal-name').value.trim();
    const phone = document.getElementById('phone-number-modal').value.trim();
    const agree = document.getElementById('agree-modal').checked;

    const errors = [];
    if (name.length < 2) errors.push("Введите имя.");
    if (!/^\+?\d{10,15}$/.test(phone)) errors.push("Введите корректный телефон.");
    if (!agree) errors.push("Нужно согласие.");

    const errorBox = document.getElementById('form3-errors');
    if (errors.length > 0) {
      errorBox.innerHTML = errors.join("<br>");
    } else {
      errorBox.innerHTML = "";
      // СОХРАНЕНИЕ
      saveToAllStorages(name, phone);
      alert("Данные из модального окна сохранены!");
      
      // Если нужно реально отправить форму на сервер после сохранения:
      // this.submit(); 
    }
  });
}

// ДОПОЛНИТЕЛЬНО: Функция получения данных (Задание №3.3)
function checkSavedData() {
    // Получение из Local Storage
    const lsData = localStorage.getItem('user_order');
    if(lsData) {
        console.log("Данные найдены в LocalStorage:", JSON.parse(lsData));
    }

    // Получение из Cookies
    const cookies = document.cookie.split('; ').find(row => row.startsWith('last_order='));
    if(cookies) {
        const cookieValue = decodeURIComponent(cookies.split('=')[1]);
        console.log("Данные найдены в Cookies:", JSON.parse(cookieValue));
    }
}

// Проверяем наличие данных при загрузке страницы
checkSavedData();