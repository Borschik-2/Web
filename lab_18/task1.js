console.log("--- ЗАВДАННЯ 1 ---");

// 1. Створюємо функцію-конструктор Car
function Car(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
}

// 2. Додаємо метод displayInfo у ПРОТОТИП функції Car
Car.prototype.displayInfo = function() {
    console.log(`Інформація про авто: Марка - ${this.brand}, Модель - ${this.model}, Рік випуску - ${this.year}`);
};

// 3. Додаємо метод drive у ПРОТОТИП функції Car
Car.prototype.drive = function() {
    console.log(`Автомобіль ${this.brand} ${this.model}: рух розпочато.`);
};

// 4. Створюємо кілька екземплярів (об'єктів) автомобілів
const car1 = new Car("Toyota", "Camry", 2021);
const car2 = new Car("BMW", "X5", 2019);

// 5. Викликаємо їхні методи
car1.displayInfo();
car1.drive();

car2.displayInfo();
car2.drive();