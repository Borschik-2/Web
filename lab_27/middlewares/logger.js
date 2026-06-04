const fs = require('fs');

// Проміжний обробник для логування всіх запитів
const logger = (req, res, next) => {
    const logEntry = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n`;
    fs.appendFile('requests.log', logEntry, (err) => {
        if (err) console.error('Помилка запису логу:', err);
    });
    next(); // Передаємо управління далі
};

module.exports = logger;