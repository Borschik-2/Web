import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  // Деструктуризація об'єкта товару
  const { id, title, price, category, description } = product;

  // Обробник кліку на кнопку
  const handleAddToCart = () => {
    // Викликаємо колбек і передаємо id
    onAddToCart(id);
  };

  return (
    <div className="product-card">
      <div className="card-header">
        <h4 className="product-title">{title}</h4>
        <span className="product-price">${price}</span>
      </div>
      
      <span className="product-category-badge">{category}</span>
      
      <p className="product-description">{description}</p>
      
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;