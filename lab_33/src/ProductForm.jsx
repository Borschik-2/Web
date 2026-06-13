import React, { useState } from 'react';
import './ProductForm.css';

const ProductForm = ({ onAddProduct }) => {
  // 1. Стан форми зберігається в одному об'єкті
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'electronics', // Значення за замовчуванням
    description: ''
  });

  // Обробник змін у полях вводу (робить форму "керованою")
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Обробник відправки форми
  const handleSubmit = (e) => {
    // 5. Заборона перезавантаження сторінки
    e.preventDefault();

    const { title, price, category, description } = formData;

    // 4. Перевірка на порожні поля
    if (!title.trim() || !price || !description.trim()) {
      alert('Всі поля повинні бути заповнені!');
      return;
    }

    // 4. Додаткова валідація
    if (title.length < 3 || title.length > 50) {
      alert('Назва повинна містити від 3 до 50 символів.');
      return;
    }
    if (Number(price) <= 0) {
      alert('Ціна повинна бути більшою за 0.');
      return;
    }
    if (description.length < 10 || description.length > 300) {
      alert('Опис повинен містити від 10 до 300 символів.');
      return;
    }

    // Якщо все ок: створюємо новий об'єкт товару
    const newProduct = {
      id: crypto.randomUUID(), // Генерація унікального ID
      title: title.trim(),
      price: Number(price), // Перетворюємо рядок на число
      category,
      description: description.trim()
    };

    // Передаємо товар у батьківський компонент App
    onAddProduct(newProduct);

    // Очищаємо форму, скидаючи стан до початкового
    setFormData({
      title: '',
      price: '',
      category: 'electronics',
      description: ''
    });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h3>Додати новий товар</h3>
      
      <div className="form-group">
        <label>Назва товару:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Наприклад: Смартфон"
        />
      </div>

      <div className="form-group">
        <label>Ціна ($):</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Наприклад: 500"
        />
      </div>

      <div className="form-group">
        <label>Категорія:</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="electronics">Електроніка (electronics)</option>
          <option value="clothes">Одяг (clothes)</option>
          <option value="books">Книги (books)</option>
        </select>
      </div>

      <div className="form-group">
        <label>Опис:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Короткий опис товару..."
          rows="3"
        />
      </div>

      <button type="submit" className="submit-btn">Додати товар</button>
    </form>
  );
};

export default ProductForm;