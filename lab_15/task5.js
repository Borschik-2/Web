// === ЗАВДАННЯ 5: Таймер зворотного відліку до Нового року ===

function updateCountdown() {
    // Отримуємо поточну дату та час
    const now = new Date();
    
    // Визначаємо наступний Новий рік. 
    // Беремо поточний рік і додаємо 1. Місяць 0 (Січень), день 1.
    const nextYear = now.getFullYear() + 1;
    const newYearDate = new Date(nextYear, 0, 1);
    
    // Різниця у мілісекундах між Новим роком і поточним часом
    const diff = newYearDate - now;

    // Розраховуємо час
    // 1 секунда = 1000 мілісекунд
    // 1 хвилина = 60 секунд
    // 1 година = 60 хвилин
    // 1 день = 24 години
    const countdownDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const countdownHours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const countdownMinutes = Math.floor((diff / 1000 / 60) % 60);
    const countdownSeconds = Math.floor((diff / 1000) % 60);

    // Функція для додавання нуля перед числом, якщо воно менше 10 (вимога завдання)
    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };

    // Оновлюємо HTML-елементи з використанням відповідних методів
    document.getElementById('days').textContent = formatTime(countdownDays);
    document.getElementById('hours').textContent = formatTime(countdownHours);
    document.getElementById('minutes').textContent = formatTime(countdownMinutes);
    document.getElementById('seconds').textContent = formatTime(countdownSeconds);
}

// Запускаємо функцію одразу, щоб уникнути затримки в 1 секунду при завантаженні сторінки
updateCountdown();

// Організовуємо щосекундний виклик функції (1000 мс = 1 с)
setInterval(updateCountdown, 1000);