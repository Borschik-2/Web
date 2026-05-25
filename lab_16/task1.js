// Знаходимо кнопку та контейнер у DOM
const createBtn = document.getElementById('create-btn');
const container = document.querySelector('.container');

// Додаємо обробник події кліку на кнопку
createBtn.addEventListener('click', () => {
    // 1. Створюємо новий елемент div
    const newDiv = document.createElement('div');
    
    // Додаємо текст для наочності
    newDiv.textContent = 'Це новий елемент, створений через JS!';
    
    // 2. Змінюємо 3 CSS-властивості за допомогою JavaScript
    newDiv.style.backgroundColor = '#4da6ff'; // Колір фону
    newDiv.style.padding = '15px';            // Внутрішні відступи
    newDiv.style.marginTop = '10px';          // Зовнішній відступ зверху
    newDiv.style.color = 'white';             // Колір тексту (додатково)
    newDiv.style.borderRadius = '5px';        // Закруглені кути (додатково)
    
    // 3. Додаємо створений елемент у DOM (всередину .container)
    container.appendChild(newDiv);
});