// 1. Отримуємо необхідні елементи з DOM-дерева
const modalOverlay = document.getElementById('modal-overlay');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const productForm = document.getElementById('product-form');

// Масив для зберігання об'єктів товарів
let products = [];

// 2. Функція для відкриття модального вікна
function openModal() {
    modalOverlay.classList.add('active');
}

// 3. Функція для закриття модального вікна
function closeModal() {
    modalOverlay.classList.remove('active');
    // Очищаємо форму при закритті, щоб наступного разу вона була порожньою
    productForm.reset();
}

// 4. Обробники подій для відкриття та закриття вікна
openModalBtn.addEventListener('click', openModal);

// Закриття по кліку на кнопку [x]
closeModalBtn.addEventListener('click', closeModal);

// Закриття по кліку на оверлей (темний фон поза вікном)
modalOverlay.addEventListener('click', function(event) {
    // Перевіряємо, чи клік був саме по оверлею, а не по самому вікну всередині нього
    if (event.target === modalOverlay) {
        closeModal();
    }
});

// 5. Обробка відправки форми
productForm.addEventListener('submit', function(event) {
    // Зупиняємо стандартну поведінку форми (щоб сторінка не перезавантажувалась)
    event.preventDefault();

    // Отримуємо значення з полів форми
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const price = parseFloat(document.getElementById('price').value);
    const discount = parseFloat(document.getElementById('discount').value);
    const inStock = parseInt(document.getElementById('in-stock').value);
    const brand = document.getElementById('brand').value.trim();
    const category = document.getElementById('category').value;
    const pictureLink = document.getElementById('picture-link').value.trim();

    // Додаткова валідація засобами JS (перевірка на від'ємні значення)
    // Хоча HTML-атрибут min="0" вже захищає від цього, JS-перевірка є вимогою завдання
    if (price < 0 || discount < 0 || inStock < 0) {
        alert("Помилка: числові значення не можуть бути від'ємними!");
        return; // Зупиняємо виконання функції
    }

    // Створюємо об'єкт нового продукту
    const newProduct = {
        title: title,
        description: description,
        price: price,
        discount: discount,
        inStock: inStock,
        brand: brand,
        category: category,
        pictureLink: pictureLink
    };

    // Додаємо об'єкт в масив
    products.push(newProduct);

    // Виводимо масив у консоль
    console.log("Оновлений список продуктів:", products);

    // Закриваємо модальне вікно (форма очиститься автоматично завдяки closeModal)
    closeModal();
});