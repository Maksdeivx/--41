// 1.2. Внешний JavaScript
function runExternalLikeScript() {
    console.log("Выполняется внешний JavaScript-код.");
    alert("Это сообщение из внешнего файла JavaScript.");
}

// 1.4. Динамический JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const loadDynamicScriptButton = document.getElementById('loadDynamicScriptButton');
    const dynamicScriptOutput = document.getElementById('dynamicScriptOutput');
    const externalLink = document.getElementById('externalLinkDemo');

    if (loadDynamicScriptButton) {
        loadDynamicScriptButton.addEventListener('click', function () {
            const script = document.createElement('script');
            script.textContent = `
                console.log("Скрипт создан и добавлен во время выполнения.");
                dynamicScriptOutput.innerHTML += '<p>Этот текст добавлен динамически.</p>';
            `;
            document.body.appendChild(script);
            console.log("Динамический скрипт был успешно добавлен.");
            this.disabled = true;
            this.textContent = "Скрипт загружен!";
        });
    }

    if (externalLink) {
        externalLink.addEventListener('click', function (event) {
            event.preventDefault();
            alert("Обработка нажатия на ссылку через внешний скрипт.");
            console.log("Событие клика по ссылке обработано скриптом.");
        });
    }
});

// 2. Операторы JavaScript
function runOperatorsDemo() {
    const outputDiv = document.getElementById('operatorsOutput');
    outputDiv.textContent = '';

    function logToOutput(message) {
        outputDiv.textContent += message + '\n';
    }

    logToOutput("Пример: if / else if / else");
    logToOutput("Если возраст больше 65 - вы пенсионер, если больше или равен 18 - вы взрослый, остальное - несовершеннолетний");
    let age = 18;
    if (age >= 65) {
        logToOutput("Вы пенсионер.");
    } else if (age >= 18) {
        logToOutput("Вы взрослый.");
    } else {
        logToOutput("Вы несовершеннолетний.");
    }

    logToOutput("\nПример: switch");
    logToOutput("\nЗдесь можно выбрать апельсин, яблоко или другой фрукт");
    let fruit = "Яблоко";
    switch (fruit) {
        case "Апельсин":
            logToOutput("Вы выбрали апельсин.");
            break;
        case "Яблоко":
            logToOutput("Вы выбрали яблоко.");
            break;
        default:
            logToOutput("Вы выбрали другой фрукт.");
    }

    logToOutput("\nПример: цикл for ");
    for (let i = 1; i <= 5; i++) {
        if (i === 3) continue;
        logToOutput(`Шаг ${i}`);
        if (i === 4) break;
    }

    logToOutput("\nПример: цикл while ");
    let score = 0;
    while (score < 3) {
        logToOutput(`Очки: ${score}`);
        score++;
    }

    logToOutput("\nПример: цикл do...while");
    let n = 0;
    do {
        logToOutput(`Итерация: ${n}`);
        n++;
    } while (n < 2);

    logToOutput("\nПример: return (функции)");
    function greet(name) {
        return `Здравствуйте, ${name}!`;
    }
    logToOutput(greet("Андрей"));

    function isPositive(num) {
        return num > 0 ? "Положительное" : "Отрицательное или ноль";
    }
    logToOutput(`Число 7: ${isPositive(7)}`);
    logToOutput(`Число -2: ${isPositive(-2)}`);
}

// 3. Диалоговые окна
function showAlert() {
    alert("Привет! Это сообщение-предупреждение из script.js.");
}

function showConfirm() {
    const confirmResultElement = document.getElementById('confirmResult');
    const result = confirm("Вы хотите продолжить?");
    if (result) {
        confirmResultElement.textContent = "Вы нажали ОК!";
    } else {
        confirmResultElement.textContent = "Вы нажали Отмена.";
    }
}

function showPrompt() {
    const promptResultElement = document.getElementById('promptResult');
    const name = prompt("Пожалуйста, введите ваше имя:", "Гость");
    if (name !== null) {
        if (name.trim() !== "") {
            promptResultElement.textContent = `Привет, ${name}!`;
        } else {
            promptResultElement.textContent = "Вы ничего не ввели.";
        }
    } else {
        promptResultElement.textContent = "Вы отменили ввод.";
    }
}