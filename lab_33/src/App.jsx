import React, { useState } from 'react';
import ProductForm from './ProductForm';
import ProductFilter from './ProductFilter';
import ProductList from './ProductList';
import './App.css';

function App() {
  // 1. Стан для збереження масиву товарів
  // Я додав один початковий товар для наочності (але можна залишити й порожнім [])
  const [products, setProducts] = useState([
    {
      id: "test-id-123",
      title: "Базовий ноутбук",
      price: 800,
      category: "electronics",
      description: "Гарний ноутбук для навчання та роботи."
    }
  ]);

  // 2. Стан для фільтрації ("all" за замовчуванням)
  const [filterCategory, setFilterCategory] = useState("all");

  // 3. Колбек для додавання нового товару (передається у ProductForm)
  const handleAddProduct = (newProduct) => {
    // Оновлюємо стан, додаючи новий товар до існуючих
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    
    // Виведення у консоль доданого товару (за вимогами)
    console.log("Доданий товар:", newProduct);
  };

  // 4. Колбек для зміни категорії (передається у ProductFilter)
  const handleChangeCategory = (category) => {
    setFilterCategory(category);
  };

  // Колбек для додавання в кошик (передається у ProductList -> ProductCard)
  const handleAddToCart = (id) => {
    // Виведення у консоль повідомлення про додавання в кошик (за вимогами)
    console.log(`Продукт з id: ${id} додано в кошик`);
  };

  // 5. Обчислення відфільтрованих товарів
  const filteredProducts = filterCategory === "all"
    ? products
    : products.filter(p => p.category === filterCategory);

  return (
    <div className="app-main-container">
      <h1 className="app-title">Магазин товарів</h1>
      
      <div className="app-layout">
        {/* Ліва колонка: Форма */}
        <aside className="app-sidebar">
          <ProductForm onAddProduct={handleAddProduct} />
        </aside>

        {/* Права колонка: Фільтр та Список */}
        <main className="app-content">
          <ProductFilter 
            currentCategory={filterCategory} 
            onChangeCategory={handleChangeCategory} 
          />
          
          <ProductList 
            products={filteredProducts} 
            onAddToCart={handleAddToCart} 
          />
        </main>
      </div>
    </div>
  );
}

export default App;