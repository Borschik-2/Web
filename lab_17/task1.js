// 1. Знаходимо всі блоки (div) на сторінці з класом content-block
const blocks = document.querySelectorAll('.content-block');

// 2. Проходимося по кожному знайденому блоку в циклі
blocks.forEach(block => {
    // Створюємо елемент кнопки
    const closeButton = document.createElement('button');
    closeButton.textContent = 'x'; // Додаємо текст (хрестик)
    closeButton.classList.add('close-btn'); // Додаємо клас для стилізації з CSS

    // Додаємо створену кнопку всередину поточного блоку
    block.appendChild(closeButton);

    // 3. Призначаємо обробник події 'click' на створену кнопку
    closeButton.addEventListener('click', function() {
        // Метод .remove() повністю видаляє елемент з DOM-дерева
        block.remove(); 
    });
});