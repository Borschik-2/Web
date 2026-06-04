const mongoose = require('mongoose');

// Функція для підключення до MongoDB Atlas
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB успішно підключено!');
    } catch (error) {
        console.error('Помилка підключення до MongoDB:', error.message);
        process.exit(1); // Зупиняємо програму у разі помилки
    }
};

module.exports = connectDB;