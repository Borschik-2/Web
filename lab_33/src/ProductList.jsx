import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ products, onAddToCart }) => {
  // Перевірка, якщо товарів немає
  if (products.length === 0) {
    return (
      <div className="empty-list">
        <p>Товарів у цій категорії не знайдено.</p>
      </div>
    );
  }

  return (
    <div className="product-list-grid">
      {/* Рендеримо список карток */}
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={onAddToCart} 
        />
      ))}
    </div>
  );
};

export default ProductList;