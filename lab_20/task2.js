console.log("\n--- ЗАВДАННЯ 2 ---");

// Функція для валідації email за специфічними вимогами
function checkEmail(email) {
    // Регулярний вираз:
    // ^[a-zA-Z0-9]        - перший символ обов'язково літера або цифра (не _ і не -)
    // (?:[a-zA-Z0-9_]|-(?!-))* - далі можуть йти літери, цифри, _, або -, АЛЕ якщо це -, то після нього не може йти ще один -
    // @[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ - стандартна перевірка доменної частини після @
    const regex = /^[a-zA-Z0-9](?:[a-zA-Z0-9_]|-(?!-))*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (regex.test(email)) {
        console.log("Email is correct!");
    } else {
        console.log("Email is not correct!");
    }
}

// Перевірка роботи функції згідно з прикладами з методички
checkEmail('my_mail@gmail.com');   // Email is correct!
checkEmail('#my_mail@gmail.com');  // Email is not correct! (містить #)
checkEmail('my_ma--il@gmail.com'); // Email is not correct! (містить --)