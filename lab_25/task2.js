// Підключаємо модуль 'fs' (File System) для роботи з файлами
const fs = require('fs');
// Підключаємо модуль 'readline' для зчитування вводу з консолі
const readline = require('readline');

// 1. Зчитування вмісту текстового файлу
try {
    // Читаємо файл синхронно у кодуванні utf8
    const data = fs.readFileSync('info.txt', 'utf8');
    console.log("--- Вміст файлу info.txt ---");
    console.log(data);
    console.log("----------------------------\n");
} catch (err) {
    console.error("Помилка при читанні файлу:", err.message);
}

// 2. Запис у файл з консолі
// Створюємо інтерфейс для спілкування через консоль
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Запитуємо користувача ввести текст
rl.question('Введіть текст, який потрібно записати у новий файл: ', (answer) => {
    // Записуємо введену відповідь у файл output.txt
    fs.writeFileSync('output.txt', answer);
    console.log('Ваш текст успішно записано у файл output.txt!');
    
    // Закриваємо інтерфейс вводу
    rl.close();
});