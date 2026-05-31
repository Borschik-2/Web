// Підключаємо вбудований модуль http для створення сервера
const http = require('http');

// Створюємо веб-сервер
const server = http.createServer((req, res) => {
    // Перевіряємо, чи це GET-запит
    if (req.method === 'GET') {
        // Налаштовуємо заголовки відповіді (статус 200 OK, тип контенту - звичайний текст)
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        
        // Відправляємо просту текстову відповідь
        res.end('Hello, World!');
    }
});

// Вказуємо порт, який буде слухати сервер
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущено. Відкрийте у браузері: http://localhost:${PORT}`);
    console.log('Для зупинки сервера натисніть Ctrl+C');
});