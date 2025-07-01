document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    // Выбираем все input-элементы, которые требуют валидации
    const formFields = form.querySelectorAll('input[required], input[pattern], input[type="email"], input[type="tel"]');
    const privacyAgreement = document.getElementById('privacy-agreement');

    // Функция для отображения сообщения об ошибке
    function showValidationError(inputElement, message) {
        // Находим ближайшую родительскую группу формы или чекбокса
        const parentGroup = inputElement.closest('.form-group') || inputElement.closest('.checkbox-group');
        // Находим span для сообщения об ошибке внутри этой группы
        const errorSpan = parentGroup ? parentGroup.querySelector('.error-message') : null;

        if (errorSpan) {
            inputElement.classList.add('invalid'); // Добавляем класс для красной рамки
            errorSpan.textContent = message; // Устанавливаем текст ошибки
            inputElement.setAttribute('aria-invalid', 'true'); // Улучшаем доступность для скринридеров
        }
    }

    // Функция для скрытия сообщения об ошибке
    function hideValidationError(inputElement) {
        const parentGroup = inputElement.closest('.form-group') || inputElement.closest('.checkbox-group');
        const errorSpan = parentGroup ? parentGroup.querySelector('.error-message') : null;

        if (errorSpan) {
            inputElement.classList.remove('invalid'); // Удаляем класс красной рамки
            errorSpan.textContent = ''; // Очищаем текст ошибки
            inputElement.setAttribute('aria-invalid', 'false'); // Сбрасываем атрибут доступности
        }
    }

    // Добавляем слушатели событий для каждого поля формы
    formFields.forEach(input => {
        // Проверка при каждом вводе символа (для мгновенной обратной связи)
        input.addEventListener('input', () => {
            if (input.validity.valid) {
                hideValidationError(input);
            } else {
                displaySpecificError(input);
            }
        });

        // Проверка при потере фокуса (когда пользователь уходит из поля)
        input.addEventListener('blur', () => {
            if (!input.validity.valid) {
                displaySpecificError(input);
            }
        });
    });

    // Отдельная обработка для чекбокса согласия
    privacyAgreement.addEventListener('change', () => {
        if (privacyAgreement.checked) {
            hideValidationError(privacyAgreement);
        } else {
            showValidationError(privacyAgreement, 'Вы должны согласиться с обработкой персональных данных.');
        }
    });

    // Функция для определения конкретного сообщения об ошибке на основе ValidityState
    function displaySpecificError(input) {
        let message = '';

        if (input.validity.valueMissing) {
            message = 'Это поле обязательно для заполнения.';
        } else if (input.validity.typeMismatch) {
            if (input.type === 'email') {
                message = 'Пожалуйста, введите корректный адрес электронной почты.';
            } else if (input.type === 'tel') {
                message = 'Пожалуйста, введите корректный номер телефона.';
            }
        } else if (input.validity.patternMismatch) {
            // Если указан атрибут title, используем его как сообщение об ошибке
            message = input.title || 'Пожалуйста, введите данные в требуемом формате.';
        } else if (input.validity.tooShort) {
            message = `Минимальная длина: ${input.minLength} символов.`;
        } else if (input.validity.tooLong) {
            message = `Максимальная длина: ${input.maxLength} символов.`;
        } else if (input.validity.rangeUnderflow) {
            message = `Значение должно быть не менее ${input.min}.`;
        } else if (input.validity.rangeOverflow) {
            message = `Значение должно быть не более ${input.max}.`;
        }

        showValidationError(input, message);
    }

    // Обработка отправки формы
    form.addEventListener('submit', (event) => {
        // Отменяем стандартную отправку формы, чтобы полностью контролировать валидацию
        event.preventDefault();

        let formIsValid = true; // Флаг для отслеживания общей валидности формы

        // Проверяем все поля на валидность при попытке отправки
        formFields.forEach(input => {
            if (!input.validity.valid) {
                displaySpecificError(input); // Показываем ошибку
                formIsValid = false; // Устанавливаем флаг в false
            } else {
                hideValidationError(input); // Скрываем ошибку, если поле валидно
            }
        });

        // Отдельная проверка для чекбокса согласия, так как он не является текстовым полем
        if (!privacyAgreement.checked) {
            showValidationError(privacyAgreement, 'Вы должны согласиться с обработкой персональных данных.');
            formIsValid = false;
        } else {
            hideValidationError(privacyAgreement);
        }

        if (formIsValid) {
            // Если все поля валидны, можно отправить данные
            alert('Форма успешно отправлена!'); // В реальном приложении здесь будет form.submit() или AJAX-запрос
            form.reset(); // Сбрасываем форму после успешной отправки
        } else {
            alert('Пожалуйста, исправьте ошибки в форме перед отправкой.');
        }
    });
});