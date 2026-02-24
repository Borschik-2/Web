function runTask2() {
    let userInput = prompt("Введіть число:", "");
    let num = Number(userInput);

    let isEvenPositive = (num > 0) && (num % 2 === 0);
    let isMultipleOf7 = (num % 7 === 0);

    console.log("Число є парним додатним: " + isEvenPositive);
    console.log("Число є кратним числу 7: " + isMultipleOf7);
}