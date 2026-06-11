require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Додаємо CORS
const connectDB = require('./config/db');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// Підключення до бази даних
connectDB();

// Middlewares
app.use(cors()); // Дозволяє запити з інших доменів
app.use(express.json()); // Дозволяє читати JSON з тіла запиту

// Підключення маршрутів
app.use('/api', apiRoutes);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});