console.log("\n--- ЗАВДАННЯ 2 ---");

// 1. Створюємо клас Student
class Student {
    constructor(name, age, grade) {
        this.name = name;
        this.age = age;
        this.grade = grade; // Оцінка або рівень успішності
    }

    // 2. Метод, який використовує всі властивості
    study() {
        console.log(`Студент ${this.name}, якому ${this.age} років, навчається. Його успішність: ${this.grade}.`);
    }
}

// 3. Створюємо кілька екземплярів класу Student
const student1 = new Student("Олександр", 20, "Відмінно");
const student2 = new Student("Марія", 19, "Добре");
const student3 = new Student("Іван", 21, "Задовільно");

// 4. Виводимо повідомлення про їх успішність
student1.study();
student2.study();
student3.study();