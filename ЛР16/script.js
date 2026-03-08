// --- 1. АБСТРАКЦИЯ ---
// Базовый класс для любого игрового объекта
class GameObject {
    constructor(x, y, width, height, color) {
        if (this.constructor === GameObject) {
            throw new Error("Нельзя создать экземпляр абстрактного класса GameObject");
        }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    // Метод отрисовки (общий для всех)
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    // Абстрактный метод (должен быть реализован в подклассах)
    update() {
        throw new Error("Метод update() должен быть реализован");
    }
}

// --- 2. НАСЛЕДОВАНИЕ ---
// Класс Игрока
class Player extends GameObject {
    constructor(x, y) {
        super(x, y, 30, 30, '#2ecc71'); // Зеленый цвет
        this.speed = 5;
    }

    // ПОЛИМОРФИЗМ: Своя реализация обновления (движение за мышкой)
    update(mouseX, mouseY) {
        // Плавное следование за курсором
        let dx = mouseX - (this.x + this.width / 2);
        let dy = mouseY - (this.y + this.height / 2);
        this.x += dx * 0.1;
        this.y += dy * 0.1;
    }
}

// Класс Врага
class Enemy extends GameObject {
    constructor(x, y, speed) {
        super(x, y, 20, 20, '#e74c3c'); // Красный цвет
        this.speed = speed;
    }

    // ПОЛИМОРФИЗМ: Своя реализация движения (падает вниз)
    update() {
        this.y += this.speed;
    }
}

// --- 3. ИНКАПСУЛЯЦИЯ ---
// Класс управления игрой (инкапсулирует всю логику в одном месте)
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.player = new Player(this.canvas.width / 2, this.canvas.height / 2);
        this.enemies = [];
        this.score = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.gameOver = false;

        this.init();
    }

    init() {
        // Слушаем движение мыши
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Запуск цикла игры
        this.gameLoop();
        
        // Спавн врагов каждые 500мс
        setInterval(() => this.spawnEnemy(), 500);
    }

    spawnEnemy() {
        if (this.gameOver) return;
        const x = Math.random() * this.canvas.width;
        const speed = 2 + Math.random() * 4;
        this.enemies.push(new Enemy(x, -20, speed));
    }

    // Проверка столкновений
    checkCollision(obj1, obj2) {
        return obj1.x < obj2.x + obj2.width &&
               obj1.x + obj1.width > obj2.x &&
               obj1.y < obj2.y + obj2.height &&
               obj1.y + obj1.height > obj2.y;
    }

    gameLoop() {
        if (this.gameOver) return;

        // Очистка экрана
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Обновление и отрисовка игрока
        this.player.update(this.mouseX, this.mouseY);
        this.player.draw(this.ctx);

        // Работа с врагами
        this.enemies.forEach((enemy, index) => {
            enemy.update();
            enemy.draw(this.ctx);

            // Проверка столкновения
            if (this.checkCollision(this.player, enemy)) {
                this.endGame();
            }

            // Удаление врагов за экраном и начисление очков
            if (enemy.y > this.canvas.height) {
                this.enemies.splice(index, 1);
                this.score++;
                this.scoreElement.innerText = this.score;
            }
        });

        requestAnimationFrame(() => this.gameLoop());
    }

    endGame() {
        this.gameOver = true;
        alert(`Игра окончена! Ваш счет: ${this.score}`);
        location.reload(); // Перезагрузка страницы
    }
}

// Запуск игры
const game = new Game();