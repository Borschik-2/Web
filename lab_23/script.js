// ==========================================
// ОТРИМАННЯ ЕЛЕМЕНТІВ DOM
// ==========================================
const startBtnContainer = document.getElementById('start-btn-container');
const startBtn = document.getElementById('start-btn');
const categoryFilter = document.getElementById('category-filter');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const productsGrid = document.getElementById('products-grid');

// ==========================================
// ЗАВДАННЯ 1: ГОЛОВНА ЛОГІКА ІНІЦІАЛІЗАЦІЇ
// ==========================================
function initApp() {
    // 1. Аналізуємо, чи наявний масив в localStorage
    const productsJSON = localStorage.getItem('products');
    let products = [];
    
    if (productsJSON) {
        products = JSON.parse(productsJSON);
    }

    // 2. Якщо масив відсутній або порожній
    if (products.length === 0) {
        startBtnContainer.style.display = 'flex'; // Показуємо кнопку Start
        productsGrid.innerHTML = ''; // Очищаємо сітку
    } else {
        // Якщо дані є - ховаємо кнопку
        startBtnContainer.style.display = 'none';
        
        // Генеруємо список категорій для селекта (щоб не хардкодити їх в HTML)
        populateCategoryFilter(products);
        
        // Запускаємо процес фільтрації/сортування/рендерингу (з попередньої лаби)
        processAndRenderProducts();
    }
}

// ==========================================
// ЗАВДАННЯ 1: AJAX ЗАПИТ НА СЕРВЕР
// ==========================================
startBtn.addEventListener('click', () => {
    // Змінюємо текст кнопки для візуального відгуку
    startBtn.textContent = 'Loading...';
    startBtn.disabled = true;

    // Виконуємо асинхронний запит за допомогою fetch (який повертає Promise)
    fetch('https://dummyjson.com/products?limit=100&skip=0')
        .then(response => {
            if (!response.ok) {
                throw new Error('Помилка мережі при завантаженні даних');
            }
            return response.json(); // Парсимо JSON-відповідь сервера
        })
        .then(data => {
            // Отримуємо масив продуктів з об'єкта відповіді
            const apiProducts = data.products;

            // Форматуємо отримані дані під структуру нашої картки (мапінг)
            const formattedProducts = apiProducts.map(p => ({
                id: p.id,
                title: p.title,
                description: p.description,
                price: p.price,
                discount: p.discountPercentage,
                inStock: p.stock,
                brand: p.brand || 'Unknown',
                category: p.category,
                pictureLink: p.thumbnail // Використовуємо thumbnail як картинку
            }));

            // Серіалізуємо та записуємо в localStorage
            localStorage.setItem('products', JSON.stringify(formattedProducts));

            // Перезапускаємо додаток (кнопка сховається, картки відмалюються)
            initApp();
        })
        .catch(error => {
            console.error('Помилка:', error);
            alert('Не вдалося завантажити товари. Перевірте з\'єднання.');
        })
        .finally(() => {
            // Відновлюємо стан кнопки (на випадок помилки)
            startBtn.textContent = 'Start';
            startBtn.disabled = false;
        });
});

// ==========================================
// ДОПОМІЖНІ ФУНКЦІЇ ДЛЯ ФІЛЬТРАЦІЇ (З ЛАБ. 22)
// ==========================================

// Динамічне створення опцій категорій на основі наявних даних
function populateCategoryFilter(products) {
    // Отримуємо унікальні категорії за допомогою Set
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    
    // Зберігаємо поточне вибране значення
    const currentValue = categoryFilter.value;
    
    categoryFilter.innerHTML = '<option value="">-- All categories --</option>';
    uniqueCategories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat.replace('-', ' '); // Робимо текст гарнішим
        categoryFilter.appendChild(option);
    });
    
    // Відновлюємо вибране значення (якщо воно все ще існує)
    categoryFilter.value = currentValue;
}

// Проміс: Фільтрація за категорією
function filterByCategory(products, category) {
    return new Promise((resolve) => {
        if (!category) resolve(products);
        else resolve(products.filter(p => p.category === category));
    });
}

// Проміс: Пошук
function searchProducts(products, searchTerm) {
    return new Promise((resolve) => {
        if (!searchTerm) resolve(products);
        else {
            const lowerTerm = searchTerm.toLowerCase(); 
            resolve(products.filter(p => 
                p.title.toLowerCase().includes(lowerTerm) || 
                p.description.toLowerCase().includes(lowerTerm)
            ));
        }
    });
}

// Проміс: Сортування
function sortProducts(products, sortMethod) {
    return new Promise((resolve) => {
        if (!sortMethod) resolve(products);
        else {
            const sorted = [...products]; 
            switch (sortMethod) {
                case 'price-asc': sorted.sort((a, b) => a.price - b.price); break;
                case 'price-desc': sorted.sort((a, b) => b.price - a.price); break;
            }
            resolve(sorted);
        }
    });
}

// Ланцюжок Промісів для обробки даних
function processAndRenderProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const category = categoryFilter.value;
    const searchTerm = searchInput.value.trim();
    const sortMethod = sortSelect.value;

    Promise.resolve(products)
        .then(prods => filterByCategory(prods, category))
        .then(filtered => searchProducts(filtered, searchTerm))
        .then(searched => sortProducts(searched, sortMethod))
        .then(finalProducts => renderProducts(finalProducts))
        .catch(err => console.error("Помилка обробки:", err));
}

// Рендеринг карток у DOM
function renderProducts(products) {
    productsGrid.innerHTML = ''; 

    if (products.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">Продуктів не знайдено.</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="discount-badge">-${Math.round(product.discount)}%</div>
            <div class="product-img-container">
                <img src="${product.pictureLink}" alt="${product.title}" class="product-img">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-title">${product.title}</div>
                <div class="product-desc">${product.description}</div>
                <div class="product-price">${product.price} $</div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Прив'язуємо події до фільтрів
categoryFilter.addEventListener('change', processAndRenderProducts);
searchInput.addEventListener('input', processAndRenderProducts);
sortSelect.addEventListener('change', processAndRenderProducts);

// Запуск програми при завантаженні сторінки
initApp();