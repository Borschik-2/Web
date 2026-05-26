// 1. Створюємо об'єкт (словник) із даними про міста для кожної країни.
// Ключі (ger, usa, ukr) співпадають з атрибутом 'value' в HTML-тегах <option>
const data = {
    ger: ["Berlin", "Munich", "Frankfurt", "Hamburg"],
    usa: ["New-York", "Washington", "Boston", "Chikago"],
    ukr: ["Kyiv", "Lviv", "Odesa", "Kharkiv"]
};

// Отримуємо посилання на елементи DOM
const countrySelect = document.getElementById('country');
const citiesSelect = document.getElementById('cities');
const resultText = document.getElementById('result-text');

// 2. Функція, яка заповнює список міст залежно від обраної країни
function populateCities() {
    // Отримуємо value вибраної країни (наприклад, 'usa')
    const selectedCountryCode = countrySelect.value;
    
    // Отримуємо масив міст для цієї країни з нашого об'єкту data
    const cities = data[selectedCountryCode];

    // Очищаємо другий select перед додаванням нових міст
    citiesSelect.innerHTML = '';

    // Проходимось по масиву міст і створюємо <option> для кожного
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citiesSelect.appendChild(option);
    });

    // Після оновлення списку міст відразу оновлюємо текст результату
    updateResultText();
}

// 3. Функція для виведення тексту "Країна, Місто" знизу
function updateResultText() {
    // Отримуємо текстову назву країни (наприклад, "USA", а не "usa")
    const countryName = countrySelect.options[countrySelect.selectedIndex].text;
    
    // Отримуємо обране місто
    const cityName = citiesSelect.value;

    // Виводимо у <p>
    resultText.textContent = `${countryName}, ${cityName}`;
}

// 4. Додаємо обробники події 'change' (зміна вибору у випадаючому списку)
countrySelect.addEventListener('change', populateCities);
citiesSelect.addEventListener('change', updateResultText);

// 5. Ініціалізація при першому завантаженні сторінки
// Викликаємо функцію, щоб заповнити міста для країни, яка вибрана за замовчуванням
populateCities();