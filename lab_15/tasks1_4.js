console.log("=== ЗАВДАННЯ 1: Деструктуризація об'єктів ===");

// Завдання 1.1
const student = { name: 'Олександр', age: 20, gender: 'male' };
// Використовуємо деструктуризацію з перейменуванням змінних (аліаси)
const { name: studentName, age: studentAge, gender: studentGender } = student;
console.log("1.1 Студент:", studentName, studentAge, studentGender);


// Завдання 1.2
const car = { 
    engine: { 
        cylinders: 4, 
        horsepower: 150 
    } 
};
// Вкладена деструктуризація з перейменуванням
const { engine: { cylinders: engineCylinders, horsepower: engineHorsepower } } = car;
console.log("1.2 Двигун автомобіля:", "Циліндри:", engineCylinders, "Кінські сили:", engineHorsepower);


// Завдання 1.3
const book = { title: 'JavaScript The Definitive Guide', author: 'David Flanagan' };
// Деструктуризація з перейменуванням
const { title: bookTitle, author: bookAuthor } = book;
console.log("1.3 Книга:", bookTitle, "-", bookAuthor);


console.log("\n=== ЗАВДАННЯ 2: Деструктуризація масивів ===");

// Завдання 2.1
const numbers = [1, 2, 3];
// Деструктуризація масиву (змінні отримують значення по порядку)
const [firstNumber, secondNumber, thirdNumber] = numbers;
console.log("2.1 Числа:", firstNumber, secondNumber, thirdNumber);


// Завдання 2.2
const fruits = ['apple', 'orange', 'banana'];
// Використовуємо rest-оператор (...) щоб зібрати залишок масиву
const [firstFruit, ...restFruits] = fruits;
console.log("2.2 Перший фрукт:", firstFruit);
console.log("2.2 Решта фруктів:", restFruits);


// Завдання 2.3
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
// Об'єднуємо масиви за допомогою spread-оператора (...)
const combinedArray = [...arr1, ...arr2];
console.log("2.3 Об'єднаний масив:", combinedArray);


console.log("\n=== ЗАВДАННЯ 3: Робота з рядками (Великі літери) ===");

// Функція перетворює першу букву кожного слова у верхній регістр
function capitalizeFirstLetters(str) {
    // 1. Розбиваємо рядок на масив слів по пробілу
    // 2. Використовуємо map для обробки кожного слова
    // 3. Беремо першу літеру (charAt(0)), робимо великою і додаємо решту слова (slice(1))
    // 4. Збираємо назад у рядок через пробіл (join)
    return str.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

const inputStr = 'i like java script';
const outputStr = capitalizeFirstLetters(inputStr);
console.log("Вхідний рядок:", inputStr);
console.log("Результат:", outputStr);


console.log("\n=== ЗАВДАННЯ 4: Робота з рядками (CSS -> CamelCase) ===");

// Функція перетворює CSS-властивості (з дефісом) у camelCase
function cssToCamelCase(cssStr) {
    // Розбиваємо рядок по дефісу
    return cssStr.split('-').map((word, index) => {
        // Якщо це перше слово - залишаємо як є
        if (index === 0) {
            return word;
        }
        // Для наступних слів робимо першу літеру великою
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(''); // З'єднуємо без пробілів
}

console.log("font-size ->", cssToCamelCase('font-size'));
console.log("background-color ->", cssToCamelCase('background-color'));
console.log("text-align ->", cssToCamelCase('text-align'));