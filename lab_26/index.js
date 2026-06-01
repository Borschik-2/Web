// Імпортуємо необхідні модулі
const express = require('express');
const fs = require('fs'); // Модуль для роботи з файловою системою (для логів)

// Створюємо екземпляр додатку Express
const app = express();
const PORT = 3000;

// Імітація бази даних (масив продуктів)
let products = [
    { id: 1, name: "Ноутбук", category: "Комп'ютери", price: 25000 },
    { id: 2, name: "Смартфон", category: "Телефони", price: 15000 }
];

// ==========================================
// ЗАВДАННЯ 4: Middleware для логування
// ==========================================
// Цей middleware виконується для КОЖНОГО вхідного запиту
app.use((req, res, next) => {
    // Формуємо рядок з даними про запит (Час, Метод, URL)
    const logEntry = `[${new Date().toISOString()}] Метод: ${req.method} | URL: ${req.originalUrl}\n`;
    
    // Дописуємо цей рядок у файл requests.log (створиться автоматично)
    fs.appendFile('requests.log', logEntry, (err) => {
        if (err) console.error('Помилка запису логу:', err);
    });

    // Викликаємо next(), щоб передати управління наступним обробникам (маршрутам)
    next();
});

// Middleware для розпізнавання JSON у тілі POST/PUT запитів (ОБОВ'ЯЗКОВО для API)
app.use(express.json());

// ==========================================
// ЗАВДАННЯ 1: Створення простого веб-сервера
// ==========================================
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// ==========================================
// ЗАВДАННЯ 2: Використання статичних файлів
// ==========================================
// Налаштовуємо Express для роздачі файлів з папки 'public'
app.use(express.static('public'));

// ==========================================
// ЗАВДАННЯ 3: Створення маршрутів (API)
// ==========================================

// 1. GET-запит: Отримання списку продуктів
app.get('/product/list', (req, res) => {
    res.json(products);
});

// 2. POST-запит: Створення нового продукту
app.post('/product/create', (req, res) => {
    // Отримуємо дані з тіла запиту
    const { name, category, price } = req.body;
    
    const newProduct = {
        id: Date.now(), // Генеруємо унікальний ID
        name: name,
        category: category,
        price: price
    };
    
    products.push(newProduct); // Додаємо в "базу"
    res.status(201).json({ message: "Продукт успішно створено!", product: newProduct });
});

// 3. PUT-запит: Оновлення ціни продукту за ID
app.put('/product/:id', (req, res) => {
    const productId = parseInt(req.params.id); // Отримуємо ID з URL
    const { price } = req.body; // Отримуємо нову ціну з тіла запиту

    // Шукаємо продукт
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex !== -1) {
        products[productIndex].price = price; // Оновлюємо ціну
        res.json({ message: "Ціну успішно оновлено!", product: products[productIndex] });
    } else {
        res.status(404).json({ message: "Продукт не знайдено!" });
    }
});

// 4. DELETE-запит: Видалення продукту за ID
app.delete('/product/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    
    // Відфільтровуємо масив, залишаючи всі продукти, окрім того, що видаляємо
    const initialLength = products.length;
    products = products.filter(p => p.id !== productId);

    if (products.length < initialLength) {
        res.json({ message: "Продукт успішно видалено!" });
    } else {
        res.status(404).json({ message: "Продукт не знайдено!" });
    }
});

// ==========================================
// Запуск сервера
// ==========================================
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Frontend is available at http://localhost:${PORT}/index.html`);
});