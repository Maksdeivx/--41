// === ЗАДАНИЕ 1: Извлечение данных ===
function extractData() {
    const form = document.getElementById('mainForm');
    const formData = new FormData(form);
    
    let result = "--- Данные пользователя ---\n";
    
    // Получаем текстовые поля и списки
    result += `Имя: ${formData.get('fullname')}\n`;
    result += `Email: ${formData.get('email')}\n`;
    result += `Город: ${formData.get('city')}\n`;
    result += `Пол: ${formData.get('gender')}\n`;
    
    // Получаем все выбранные флажки (Checkbox)
    const interests = formData.getAll('interest');
    result += `Интересы: ${interests.length > 0 ? interests.join(', ') : 'Не выбрано'}`;

    // Вывод на страницу
    document.getElementById('formOutput').innerText = result;
    // Либо в диалоговое окно: alert(result);
}

// === ЗАДАНИЕ 2: Валидация тремя способами ===
const mainForm = document.getElementById('mainForm');

mainForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Предотвращаем отправку для демонстрации
    
    let isValid = true;

    // 1. Валидация через HTML5 (checkValidity)
    const nameInput = document.getElementById('userName');
    if (!nameInput.checkValidity()) {
        document.getElementById('nameError').innerText = "Минимум 3 символа (HTML5 check)";
        isValid = false;
    } else {
        document.getElementById('nameError').innerText = "";
    }

    // 2. Валидация через JS (Проверка на пустоту и логику)
    const citySelect = document.getElementById('userCity');
    if (citySelect.value === "") {
        alert("Пожалуйста, выберите город (JS проверка)");
        isValid = false;
    }

    // 3. Валидация через Регулярные выражения (Email)
    const emailInput = document.getElementById('userEmail');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Простой формат email
    
    if (!emailRegex.test(emailInput.value)) {
        document.getElementById('emailError').innerText = "Неверный формат Email (RegExp)";
        isValid = false;
    } else {
        document.getElementById('emailError').innerText = "";
    }

    if (isValid) {
        alert("Форма успешно прошла все 3 этапа валидации!");
        extractData();
    }
});

// === ЗАДАНИЕ 3: Регулярные выражения (RegExp) ===
const getInp = () => document.getElementById('regexInput').value;
const setOut = (text) => document.getElementById('regexOutput').innerText = text;

// 1. test() - проверяет наличие совпадения (возвращает true/false)
function demoTest() {
    const regex = /\d+/; // Ищем цифры
    const result = regex.test(getInp());
    setOut(`Результат test() (есть ли цифры): ${result}`);
}

// 2. exec() - возвращает массив с деталями первого совпадения
function demoExec() {
    const regex = /([a-zA-Z0-9._-]+@[a-zA-Z._-]+\.[a-zA-Z]+)/g;
    const match = regex.exec(getInp());
    if (match) {
        setOut(`Результат exec(): Найдено ${match[0]} на позиции ${match.index}`);
    } else {
        setOut("Результат exec(): Email не найден");
    }
}

// 3. match() (String метод) - возвращает массив всех совпадений
function demoMatch() {
    const regex = /[а-яА-ЯёЁ]+/g; // Найти все русские слова
    const matches = getInp().match(regex);
    setOut(`Результат match(): ${matches ? matches.join(' | ') : 'Совпадений нет'}`);
}

// 4. replace() (String метод) - замена
function demoReplace() {
    // Флаг g - глобально, заменяем все цифры на звездочки
    const result = getInp().replace(/\d/g, '*');
    setOut(`Результат replace(): ${result}`);
}

// 5. search() (String метод) - возвращает индекс первого вхождения
function demoSearch() {
    const index = getInp().search(/@/);
    setOut(`Результат search(): Символ @ найден на позиции ${index}`);
}

// 6. split() (String метод) - разбивает строку в массив
function demoSplit() {
    // Разбить по запятой или пробелу
    const result = getInp().split(/,\s*/);
    setOut(`Результат split(): В массиве ${result.length} элементов. Первый: ${result[0]}`);
}