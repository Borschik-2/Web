const output = document.getElementById('output');
// Глобальна змінна для збереження ID створеного продукту (щоб потім його оновлювати/видаляти)
let lastCreatedProductId = 1; 

// Функція для виведення результату на екран
function printResult(data) {
    output.textContent = JSON.stringify(data, null, 2);
}

// 1. GET-запит (Отримання списку)
document.getElementById('btn-get').addEventListener('click', () => {
    fetch('/product/list')
        .then(res => res.json())
        .then(data => printResult(data))
        .catch(err => printResult({ error: err.message }));
});

// 2. POST-запит (Створення продукту)
document.getElementById('btn-post').addEventListener('click', () => {
    const newProduct = {
        name: "Навушники",
        category: "Аудіо",
        price: 3000
    };

    fetch('/product/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Вказуємо серверу, що відправляємо JSON
        },
        body: JSON.stringify(newProduct) // Серіалізуємо об'єкт
    })
    .then(res => res.json())
    .then(data => {
        printResult(data);
        if (data.product) lastCreatedProductId = data.product.id; // Зберігаємо ID для наступних тестів
    })
    .catch(err => printResult({ error: err.message }));
});

// 3. PUT-запит (Оновлення ціни)
document.getElementById('btn-put').addEventListener('click', () => {
    const updatedData = { price: 9999 }; // Нова ціна

    // Відправляємо запит на маршрут з конкретним ID
    fetch(`/product/${lastCreatedProductId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    })
    .then(res => res.json())
    .then(data => printResult(data))
    .catch(err => printResult({ error: err.message }));
});

// 4. DELETE-запит (Видалення продукту)
document.getElementById('btn-delete').addEventListener('click', () => {
    fetch(`/product/${lastCreatedProductId}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => printResult(data))
    .catch(err => printResult({ error: err.message }));
});