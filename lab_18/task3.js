console.log("\n--- ЗАВДАННЯ 3 ---");

// 1. Створюємо базовий клас Shape
class Shape {
    constructor(color) {
        this.color = color;
    }
}

// 2. Створюємо підклас Circle (Коло), який успадковується від Shape
class Circle extends Shape {
    constructor(color, radius) {
        super(color); // Викликаємо конструктор батьківського класу для встановлення кольору
        this.radius = radius;
    }

    // Метод для обчислення площі кола (S = π * r^2)
    getArea() {
        return Math.PI * Math.pow(this.radius, 2);
    }

    // Метод для обчислення периметра (довжини) кола (P = 2 * π * r)
    getPerimeter() {
        return 2 * Math.PI * this.radius;
    }
}

// 3. Створюємо підклас Rectangle (Прямокутник), який успадковується від Shape
class Rectangle extends Shape {
    constructor(color, width, height) {
        super(color); // Викликаємо конструктор батьківського класу
        this.width = width;
        this.height = height;
    }

    // Метод для обчислення площі (S = a * b)
    getArea() {
        return this.width * this.height;
    }

    // Метод для обчислення периметра (P = 2 * (a + b))
    getPerimeter() {
        return 2 * (this.width + this.height);
    }
}

// 4. Створюємо по одному екземпляру кожного підкласу
const myCircle = new Circle("Червоний", 5);
const myRectangle = new Rectangle("Синій", 10, 20);

// 5. Виводимо в консоль колір та площу кожного екземпляру
console.log(`Фігура: Коло. Колір: ${myCircle.color}. Площа: ${myCircle.getArea().toFixed(2)}.`);
console.log(`Фігура: Прямокутник. Колір: ${myRectangle.color}. Площа: ${myRectangle.getArea()}.`);