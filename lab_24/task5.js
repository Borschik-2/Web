$(document).ready(function() {

    // Тестовий масив товарів (імітація даних з localStorage попередніх робіт)
    const mockProducts = [
        { id: 1, title: "iPhone 13", description: "Apple smartphone", price: 799, discount: 10, category: "smartphones", pictureLink: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13.jpg" },
        { id: 2, title: "MacBook Air", description: "Apple laptop M1", price: 999, discount: 5, category: "laptops", pictureLink: "https://fdn2.gsmarena.com/vv/bigpic/apple-macbook-air-m1.jpg" },
        { id: 3, title: "Samsung Galaxy S22", description: "Android smartphone", price: 899, discount: 15, category: "smartphones", pictureLink: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s22-5g.jpg" }
    ];

    // ================= ЗАВДАННЯ 5 =================
    // Функція рендерингу карток товарів, переписана на jQuery
    function productRender(products) {
        // Знаходимо контейнер за id за допомогою jQuery
        const $grid = $('#products-grid');
        
        // Очищаємо контейнер (аналог innerHTML = '')
        $grid.empty();

        // Якщо масив порожній
        if (products.length === 0) {
            $grid.append('<p>Продуктів не знайдено.</p>');
            return;
        }

        // Перебираємо масив (аналог forEach, але в jQuery використовується $.each)
        $.each(products, function(index, product) {
            // Створюємо новий div-елемент з класом 'product-card'
            const $card = $('<div>', { class: 'product-card' });

            // Заповнюємо картку HTML-кодом
            // У jQuery метод .html() працює як innerHTML
            $card.html(`
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
            `);

            // Додаємо створену картку в кінець сітки (аналог appendChild)
            $grid.append($card);
        });
    }

    // Викликаємо функцію для демонстрації її роботи
    productRender(mockProducts);

});