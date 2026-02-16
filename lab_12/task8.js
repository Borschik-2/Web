// Константи часу
const secondsPerMinute = 60;
const minutesPerHour = 60;
const hoursPerDay = 24;
const daysPerMonth = 30; 

// Розрахунки
let secondsInHour = secondsPerMinute * minutesPerHour;
let secondsInDay = secondsInHour * hoursPerDay;
let secondsInMonth = secondsInDay * daysPerMonth;

// Формування повідомлення для виводу на екран
let timeMessage = "Секунд в годині: " + secondsInHour + "\n" +
                  "Секунд в добі: " + secondsInDay + "\n" +
                  "Секунд в місяці: " + secondsInMonth;

alert(timeMessage);