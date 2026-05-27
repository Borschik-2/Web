console.log("\n--- ЗАВДАННЯ 3 ---");

// Функція для перевірки валідності URL
function isValidURL(url) {
    // Регулярний вираз:
    // ^(http|https|ftp) - рядок починається з http, https або ftp
    // :\/\/             - після чого йде двокрапка та два слеші (://)
    // \S+               - далі йдуть будь-які символи, окрім пробілів
    // $                 - кінець рядка
    const regex = /^(http|https|ftp):\/\/\S+$/;
    return regex.test(url);
}

// Приклади використання з методички:
let url1 = "https://www.example.com";
let url2 = "ftp://fileserver/documents";
let url3 = "invalid-url";
let url4 = "http://example.com";

console.log("url1:", isValidURL(url1)); // true
console.log("url2:", isValidURL(url2)); // true
console.log("url3:", isValidURL(url3)); // false
console.log("url4:", isValidURL(url4)); // true