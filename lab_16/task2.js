// Знаходимо кнопку та елемент з текстом
const editBtn = document.getElementById('edit-btn');
const editableTextDiv = document.getElementById('editable-text');

editBtn.addEventListener('click', () => {
    // Викликаємо prompt(), передаючи поточний текст як значення за замовчуванням
    const newText = prompt('Введіть новий текст:', editableTextDiv.textContent.trim());
    
    // Перевіряємо, чи користувач не натиснув "Скасувати" (null) і чи ввів хоч щось
    if (newText !== null && newText !== '') {
        // Оновлюємо текстовий вміст DOM-елемента
        editableTextDiv.textContent = newText;
    }
});