// ==========================================
// 1. ІНІЦІАЛІЗАЦІЯ ЗМІННИХ ТА ДОМ-ЕЛЕМЕНТІВ
// ==========================================

// Форма та модальне вікно продуктів
const productModalOverlay = document.getElementById('product-modal-overlay');
const productForm = document.getElementById('product-form');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalTitle = document.getElementById('modal-title');
const productsGrid = document.getElementById('products-grid');

// Модальне вікно підтвердження видалення
const confirmModalOverlay = document.getElementById('confirm-modal-overlay');
const confirmOkBtn = document.getElementById('confirm-ok-btn');
const confirmCancelBtn = document.getElementById('confirm-cancel-btn');
const confirmMessage = document.getElementById('confirm-message');

// Глобальна змінна для збереження ID продукту, який зараз видаляється
let productToDeleteId = null;

// ==========================================
// 2. РОБОТА З LOCAL STORAGE (ЗАВДАННЯ 1 та 2)
// ==========================================

// Функція для отримання продуктів з localStorage (Парсинг JSON)
function getProducts() {
    const productsJSON = localStorage.getItem('products');
    if (productsJSON) {
        return JSON.parse(productsJSON); // Перетворюємо рядок назад у масив об'єктів
    }
    return []; // Якщо даних немає, повертаємо порожній масив
}

// Функція для збереження продуктів у localStorage (Серіалізація JSON)
function saveProducts(productsArray) {
    const productsJSON = JSON.stringify(productsArray); // Перетворюємо масив об'єктів у рядок
    localStorage.setItem('products', productsJSON);
}

// ==========================================
// 3. РЕНДЕРИНГ КАРТОК (ЗАВДАННЯ 2)
// ==========================================

function renderProducts() {
    const products = getProducts();
    
    // Очищаємо сітку перед відмальовуванням
    productsGrid.innerHTML = '';

    // Перебираємо масив і створюємо картку для кожного продукту
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        // Використовуємо шаблонні рядки для створення HTML структури картки
        // Додаємо SVG іконки для кнопок редагування та видалення
        card.innerHTML = `
            <div class="discount-badge">${product.discount}%</div>
            <div class="product-img-container">
                <img src="${product.pictureLink}" alt="${product.title}" class="product-img">
                <div class="category-badge">${product.category}</div>
            </div>
            <div class="product-info">
                <div class="product-title">${product.title}</div>
                <div class="product-desc">${product.description}</div>
                <div class="product-bottom">
                    <div class="product-price">${product.price} $</div>
                    <div class="action-buttons">
                        <!-- Кнопка редагування -->
                        <button class="icon-btn edit-btn" onclick="openEditModal(${product.id})">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <!-- Кнопка видалення -->
                        <button class="icon-btn delete-btn" onclick="openConfirmModal(${product.id}, '${product.title}')">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// ==========================================
// 4. ЛОГІКА МОДАЛЬНОГО ВІКНА ФОРМИ (ЗАВДАННЯ 1 та 3)
// ==========================================

// Відкриття вікна для СТВОРЕННЯ
openModalBtn.addEventListener('click', () => {
    productForm.reset(); // Очищаємо форму
    document.getElementById('product-id').value = ''; // Очищаємо прихований ID
    modalTitle.textContent = 'Create product';
    productModalOverlay.classList.add('active');
});

// Відкриття вікна для РЕДАГУВАННЯ (Завдання 3)
window.openEditModal = function(id) {
    const products = getProducts();
    // Знаходимо продукт за його ID
    const product = products.find(p => p.id === id);
    
    if (product) {
        // Заповнюємо форму наявними даними
        document.getElementById('product-id').value = product.id;
        document.getElementById('title').value = product.title;
        document.getElementById('description').value = product.description;
        document.getElementById('price').value = product.price;
        document.getElementById('discount').value = product.discount;
        document.getElementById('in-stock').value = product.inStock;
        document.getElementById('brand').value = product.brand;
        document.getElementById('category').value = product.category;
        document.getElementById('picture-link').value = product.pictureLink;

        modalTitle.textContent = 'Edit product';
        productModalOverlay.classList.add('active');
    }
};

// Закриття вікна форми
function closeProductModal() {
    productModalOverlay.classList.remove('active');
}
closeModalBtn.addEventListener('click', closeProductModal);
productModalOverlay.addEventListener('click', (e) => {
    if (e.target === productModalOverlay) closeProductModal();
});

// Обробка збереження (створення нового або оновлення існуючого)
productForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let products = getProducts();
    const editingId = document.getElementById('product-id').value;

    // Створюємо об'єкт з даними з форми
    const productData = {
        // Якщо це редагування, залишаємо старий ID, інакше генеруємо новий (через Date.now)
        id: editingId ? parseInt(editingId) : Date.now(),
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: parseFloat(document.getElementById('price').value),
        discount: parseFloat(document.getElementById('discount').value),
        inStock: parseInt(document.getElementById('in-stock').value),
        brand: document.getElementById('brand').value,
        category: document.getElementById('category').value,
        pictureLink: document.getElementById('picture-link').value
    };

    if (editingId) {
        // Редагування: знаходимо індекс і замінюємо об'єкт
        const index = products.findIndex(p => p.id === parseInt(editingId));
        if (index !== -1) products[index] = productData;
    } else {
        // Створення: додаємо в кінець масиву
        products.push(productData);
    }

    // Зберігаємо в localStorage, закриваємо вікно і перемальовуємо
    saveProducts(products);
    closeProductModal();
    renderProducts();
});

// ==========================================
// 5. ВЛАСНЕ ВІКНО КОНФІРМАЦІЇ ВИДАЛЕННЯ (ЗАВДАННЯ 4 та 4*)
// ==========================================

// Відкриття вікна підтвердження
window.openConfirmModal = function(id, title) {
    productToDeleteId = id; // Запам'ятовуємо, що саме видаляти
    confirmMessage.textContent = `Do you really want to remove ${title} element?`;
    confirmModalOverlay.classList.add('active');
};

// Закриття вікна підтвердження
function closeConfirmModal() {
    confirmModalOverlay.classList.remove('active');
    productToDeleteId = null;
}
confirmCancelBtn.addEventListener('click', closeConfirmModal);
confirmModalOverlay.addEventListener('click', (e) => {
    if (e.target === confirmModalOverlay) closeConfirmModal();
});

// Підтвердження видалення (клік по кнопці OK)
confirmOkBtn.addEventListener('click', () => {
    if (productToDeleteId) {
        let products = getProducts();
        // Відфільтровуємо масив, залишаючи всі елементи, крім того, який видаляємо
        products = products.filter(p => p.id !== productToDeleteId);
        
        saveProducts(products); // Зберігаємо оновлений масив
        renderProducts();       // Перемальовуємо картки
    }
    closeConfirmModal();
});

// ==========================================
// 6. ЗАПУСК ПРИ ЗАВАНТАЖЕННІ СТОРІНКИ
// ==========================================
// При старті програми відразу намагаємось відмалювати картки з localStorage
renderProducts();