// ==========================================
// ІНІЦІАЛІЗАЦІЯ ДАНИХ (Гарантоване додавання)
// ==========================================
function initMockData() {
    let existingProducts = [];
    try {
        // Намагаємось отримати існуючі дані
        existingProducts = JSON.parse(localStorage.getItem('products')) || [];
    } catch (e) {
        existingProducts = [];
    }
    
    // Якщо масив порожній
    if (existingProducts.length === 0) {
        const mockProducts = [
            { id: 1620000000000, title: "iPhone 13", description: "Apple smartphone with great camera", price: 799, category: "smartphones", pictureLink: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13.jpg" },
            { id: 1630000000000, title: "MacBook Air", description: "Apple laptop M1 chip", price: 999, category: "laptops", pictureLink: "https://fdn2.gsmarena.com/vv/bigpic/apple-macbook-air-m1.jpg" },
            { id: 1640000000000, title: "Samsung Galaxy S22", description: "Android smartphone by Samsung", price: 899, category: "smartphones", pictureLink: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s22-5g.jpg" },
            { id: 1650000000000, title: "Chanel No 5", description: "Luxury fragrance for women", price: 150, category: "fragrances", pictureLink: "https://via.placeholder.com/200?text=Chanel" },
            { id: 1660000000000, title: "Dell XPS 15", description: "Powerful Windows laptop", price: 1200, category: "laptops", pictureLink: "https://via.placeholder.com/200?text=Dell+XPS" }
        ];
        // Записуємо тестові дані в localStorage
        localStorage.setItem('products', JSON.stringify(mockProducts));
    }
}
// Викликаємо одразу при завантаженні скрипта
initMockData();

// ==========================================
// ОТРИМАННЯ ЕЛЕМЕНТІВ DOM
// ==========================================
const categoryFilter = document.getElementById('category-filter');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const productsGrid = document.getElementById('products-grid');

// Отримуємо всі продукти з localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// ==========================================
// ЗАВДАННЯ 2 та 3: ФУНКЦІЇ-ПРОМІСИ
// ==========================================

// 1. Проміс для фільтрації за категорією
function filterByCategory(products, category) {
    return new Promise((resolve) => {
        if (!category) {
            resolve(products);
        } else {
            const filtered = products.filter(p => p.category === category);
            resolve(filtered);
        }
    });
}

// 2. Проміс для пошуку за назвою чи описом
function searchProducts(products, searchTerm) {
    return new Promise((resolve) => {
        if (!searchTerm) {
            resolve(products);
        } else {
            const lowerTerm = searchTerm.toLowerCase(); 
            const searched = products.filter(p => 
                p.title.toLowerCase().includes(lowerTerm) || 
                p.description.toLowerCase().includes(lowerTerm)
            );
            resolve(searched);
        }
    });
}

// 3. Проміс для сортування
function sortProducts(products, sortMethod) {
    return new Promise((resolve) => {
        if (!sortMethod) {
            resolve(products);
        } else {
            const sorted = [...products]; 
            switch (sortMethod) {
                case 'price-asc':
                    sorted.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    sorted.sort((a, b) => b.price - a.price);
                    break;
                case 'newest':
                    sorted.sort((a, b) => b.id - a.id);
                    break;
                case 'oldest':
                    sorted.sort((a, b) => a.id - b.id);
                    break;
            }
            resolve(sorted);
        }
    });
}

// ==========================================
// ГОЛОВНИЙ ЛАНЦЮЖОК ПРОМІСІВ (PIPELINE)
// ==========================================
function processAndRenderProducts() {
    const category = categoryFilter.value;
    const searchTerm = searchInput.value.trim();
    const sortMethod = sortSelect.value;

    const allProducts = getProducts();

    // Використовуємо ланцюжок промісів
    Promise.resolve(allProducts)
        .then(products => filterByCategory(products, category))
        .then(filteredProducts => searchProducts(filteredProducts, searchTerm))
        .then(searchedProducts => sortProducts(searchedProducts, sortMethod))
        .then(finalProducts => {
            renderProducts(finalProducts); 
        })
        .catch(error => {
            console.error("Сталася помилка при обробці продуктів:", error);
        });
}

// ==========================================
// ФУНКЦІЯ ВІДМАЛЬОВУВАННЯ КАРТОК
// ==========================================
function renderProducts(products) {
    productsGrid.innerHTML = ''; 

    if (products.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; font-size: 18px;">Продуктів за вашим запитом не знайдено.</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
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

// ==========================================
// ПРИВ'ЯЗКА ПОДІЙ ДО ФОРМИ
// ==========================================
categoryFilter.addEventListener('change', processAndRenderProducts);
searchInput.addEventListener('input', processAndRenderProducts);
sortSelect.addEventListener('change', processAndRenderProducts);

// Первинне завантаження карток
processAndRenderProducts();