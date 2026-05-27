console.log("\n--- ЗАВДАННЯ 4 (Логіка модального вікна) ---");

// 1. Отримуємо елементи DOM
const overlay = document.getElementById('modal-overlay');
const openBtn = document.getElementById('open-register-btn');
const closeBtn = document.getElementById('close-modal-btn');
const form = document.getElementById('register-form');

// 2. Відкриття модального вікна
openBtn.addEventListener('click', () => {
    overlay.classList.add('active');
});

// 3. Закриття вікна при кліку на кнопку [x]
closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
});

// 4. Закриття вікна при кліку на оверлей (напівпрозорий фон)
overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
        overlay.classList.remove('active');
    }
});

// 5. Обробка відправки форми та JS-валідація
form.addEventListener('submit', (event) => {
    // Зупиняємо стандартну відправку форми
    event.preventDefault();

    // Отримуємо значення з полів
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // JS-валідація email (паттерн example@domain.com)
    // Перевіряємо, чи є текст до @, після @, і чи є крапка в домені
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        // Виводимо alert (як показано на скріншоті в методичці)
        alert("Будь ласка, введіть коректну електронну адресу.");
        return; // Зупиняємо подальше виконання
    }

    // JS-валідація співпадіння паролів
    if (password !== confirmPassword) {
        // Виводимо alert (як показано на скріншоті в методичці)
        alert("Паролі не співпадають.");
        return; // Зупиняємо подальше виконання
    }

    // Якщо всі перевірки пройдені успішно
    console.log("Реєстрація успішна! Всі поля заповнені вірно.");
    
    // Очищаємо форму та закриваємо модальне вікно
    form.reset();
    overlay.classList.remove('active');
});