/**
 |a(5b^2 - 7.8b) - a| / (2.55a + 0.7b)
 * @param {number} a 
 * @param {number} b 
 * @returns {number|string}
 */
function calculateD(a, b) {
    try {
        if (isNaN(a) || isNaN(b)) {
            throw new Error("Входные параметры должны быть числами.");
        }

        const numerator = Math.abs(a * (5 * b * b - 7.8 * b) - a);
        const denominator = 2.55 * a + 0.7 * b;

        //Обработка деления на ноль
        if (denominator === 0) {
            throw new Error("Ошибка: Деление на ноль! Знаменатель равен нулю.");
        }
        const d = numerator / denominator;
        return d;
    } catch (error) {
        return "Ошибка расчета: " + error.message;
    }
}