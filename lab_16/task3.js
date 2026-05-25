const toggleBtn = document.getElementById('toggle-btn');
// Отримуємо колекцію всіх елементів з класом .toggle-item
const items = document.querySelectorAll('.toggle-item');

toggleBtn.addEventListener('click', () => {
    // Проходимось по кожному елементу масиву через forEach
    items.forEach(item => {
        // Якщо елемент прихований (display: none), показуємо його
        if (item.style.display === 'none') {
            item.style.display = 'block';
        } else {
            // Інакше - приховуємо
            item.style.display = 'none';
        }
    });
});