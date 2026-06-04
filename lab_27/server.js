require('dotenv').config(); // Завантажуємо змінні з .env
const express = require('express');
const connectDB = require('./config/db');
const logger = require('./middlewares/logger');

// Імпорт маршрутизаторів
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Підключення до бази даних
connectDB();

// Проміжні обробники (Middlewares)
app.use(express.json()); // Для розпізнавання JSON у тілі запитів
app.use(logger); // Наш логер з Завдання 3.4

// Підключення маршрутів
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});