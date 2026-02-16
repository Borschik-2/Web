// Оголошення змінних
let firstName = "Артем";
let lastName = "Гіль";
let group = "КН-321";
let birthYear = 2008;

// Логічна змінна (сімейний стан)
let isMarried = false;

// Визначення типу кожної змінної (вивід в консоль для перевірки)
console.log("Тип birthYear:", typeof birthYear);
console.log("Тип isMarried:", typeof isMarried);
console.log("Тип firstName:", typeof firstName);

// Виведіть значення змінних в консоль у порядку: Number, Boolean, String
console.log(birthYear);
console.log(isMarried);
console.log(firstName, lastName, group);

// Змінні Null і Undefined
let nullVar = null;
let undefinedVar; // змінна оголошена, але значення не присвоєно

console.log("Тип nullVar:", typeof nullVar);
console.log("Тип undefinedVar:", typeof undefinedVar);