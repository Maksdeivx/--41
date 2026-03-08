// --- 1. СОБЫТИЯ МЫШИ (Mouse Events) ---
const mouseBtn = document.getElementById('mouseBtn');
const mouseText = document.getElementById('mouseText');

mouseBtn.addEventListener('click', () => {
    mouseText.innerText = "Результат: Вы нажали на кнопку!";
    mouseBtn.style.backgroundColor = "#28a745";
});

mouseBtn.addEventListener('mouseenter', () => {
    mouseText.innerText = "Результат: Курсор над кнопкой";
});

// --- 2. СОБЫТИЯ КЛАВИАТУРЫ (Keyboard Events) ---
const keyboardInput = document.getElementById('keyboardInput');
const keyboardText = document.getElementById('keyboardText');

keyboardInput.addEventListener('keydown', (event) => {
    keyboardText.innerText = `Нажата клавиша: ${event.key} (Код: ${event.code})`;
});

// --- 3. DRAG & DROP СОБЫТИЯ ---
const dragItem = document.getElementById('dragItem');
const dropZone = document.getElementById('dropZone');

dragItem.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData("text", e.target.id);
    dragItem.style.opacity = "0.5";
});

dragItem.addEventListener('dragend', () => dragItem.style.opacity = "1");

dropZone.addEventListener('dragover', (e) => e.preventDefault()); // Разрешаем сброс

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    dropZone.appendChild(document.getElementById(data));
    dropZone.style.backgroundColor = "#d4edda";
    dropZone.innerText = "Готово!";
});

// --- 4. СОБЫТИЯ УКАЗАТЕЛЯ (Pointer Events) ---
// Универсальные события для мыши, касания и стилуса
const pointerArea = document.getElementById('pointerArea');
const pointerText = document.getElementById('pointerText');

pointerArea.addEventListener('pointermove', (e) => {
    pointerText.innerText = `Координаты: X:${Math.round(e.offsetX)}, Y:${Math.round(e.offsetY)}`;
});

// --- 5. СОБЫТИЯ ПОЛОСЫ ПРОКРУТКИ (Scroll Events) ---
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("scroll-progress").style.width = scrolled + "%";
});

// --- 6. СОБЫТИЯ СЕНСОРНЫХ ЭКРАНОВ (Touch Events) ---
const touchBox = document.getElementById('touchBox');
const touchStatus = document.getElementById('touchStatus');

touchBox.addEventListener('touchstart', (e) => {
    touchStatus.innerText = "Статус: Коснулись экрана!";
    touchBox.style.backgroundColor = "#ff6b6b";
});

touchBox.addEventListener('touchend', () => {
    touchStatus.innerText = "Статус: Палец убран";
    touchBox.style.backgroundColor = "#e2e2e2";
});

// --- 7. СОБЫТИЯ ТАЙМЕРА (Timer Events) ---
function startTimer() {
    let timeLeft = 10;
    const display = document.getElementById('timerDisplay');
    
    // setInterval для выполнения кода каждые 1000мс (1 сек)
    const countdown = setInterval(() => {
        timeLeft--;
        display.innerText = `Оставшееся время: ${timeLeft} сек`;
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            display.innerText = "Время вышло!";
            alert("Событие таймера сработало!");
        }
    }, 1000);
}