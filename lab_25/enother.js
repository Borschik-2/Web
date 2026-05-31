// Створюємо функцію, яка виводить повідомлення
function printMessage() {
    console.log("Hello from enother.js");
}

// Експортуємо дану функцію (стандарт CommonJS)
module.exports = printMessage;