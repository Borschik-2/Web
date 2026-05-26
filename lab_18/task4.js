console.log("\n--- ЗАВДАННЯ 4 ---");

// 1. Базовий клас Button
class Button {
    constructor(text, border, color, background) {
        this.text = text;
        this.border = border;
        this.color = color;
        this.background = background;
        this.buttonElement = null; // Властивість для зберігання DOM-елемента
    }

    // Метод для створення та додавання кнопки на сторінку
    render(containerId) {
        // Створюємо HTML-елемент <button>
        this.buttonElement = document.createElement('button');
        
        // Заповнюємо його властивостями
        this.buttonElement.textContent = this.text;
        this.buttonElement.style.border = this.border;
        this.buttonElement.style.color = this.color;
        this.buttonElement.style.backgroundColor = this.background;
        
        // Додаємо базовий клас з CSS для внутрішніх відступів
        this.buttonElement.classList.add('custom-btn');

        // Навішуємо обробник кліку
        this.buttonElement.addEventListener('click', () => {
            console.log(`Кнопка ${this.text} натиснута. Колір кнопки - ${this.background}`);
        });

        // Знаходимо контейнер на сторінці та додаємо туди кнопку
        const container = document.getElementById(containerId);
        if (container) {
            container.appendChild(this.buttonElement);
        }
    }
}

// 2. Клас RoundedButton, що успадковує Button
class RoundedButton extends Button {
    constructor(text, border, color, background, borderRadius) {
        super(text, border, color, background); // Виклик батьківського конструктора
        this.borderRadius = borderRadius;
    }

    // Перевизначаємо метод render
    render(containerId) {
        // Спочатку викликаємо render батьківського класу (щоб створити кнопку і додати її)
        super.render(containerId);
        
        // Додаємо специфічну властивість заокруглення
        this.buttonElement.style.borderRadius = this.borderRadius;
        
        // Викликаємо метод для додавання ефекту тіні
        this.dropShadow();
    }

    // Метод, який відкидає тінь при наведенні миші
    dropShadow() {
        if (!this.buttonElement) return;

        // Подія: миша наведена на елемент
        this.buttonElement.addEventListener('mouseenter', () => {
            this.buttonElement.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.4)';
        });

        // Подія: миша забрана з елемента
        this.buttonElement.addEventListener('mouseleave', () => {
            this.buttonElement.style.boxShadow = 'none';
        });
    }
}

// 3. Створення по 3 об'єкти кожного класу

// Звичайні кнопки (відмальовуємо у контейнер 'standard-buttons')
const btn1 = new Button("Click me", "2px solid black", "white", "blue");
const btn2 = new Button("Press here", "2px dashed green", "green", "lightgreen");
const btn3 = new Button("Click here", "2px dotted blue", "blue", "lightblue");

btn1.render('standard-buttons');
btn2.render('standard-buttons');
btn3.render('standard-buttons');

// Округлені кнопки (відмальовуємо у контейнер 'rounded-buttons')
const roundedBtn1 = new RoundedButton("Rounded_1", "3px solid darkgreen", "darkgreen", "lightgreen", "20px");
const roundedBtn2 = new RoundedButton("Rounded_2", "3px solid black", "white", "orange", "20px");
const roundedBtn3 = new RoundedButton("Rounded_3", "3px solid blue", "blue", "lightcyan", "20px");

roundedBtn1.render('rounded-buttons');
roundedBtn2.render('rounded-buttons');
roundedBtn3.render('rounded-buttons');