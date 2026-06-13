import React from 'react';
import './ProductFilter.css';

const ProductFilter = ({ currentCategory, onChangeCategory }) => {
  return (
    <div className="product-filter">
      <label htmlFor="category-filter">Фільтр за категорією: </label>
      <select 
        id="category-filter"
        value={currentCategory} 
        onChange={(e) => onChangeCategory(e.target.value)}
      >
        <option value="all">Всі (all)</option>
        <option value="electronics">Електроніка (electronics)</option>
        <option value="clothes">Одяг (clothes)</option>
        <option value="books">Книги (books)</option>
      </select>
    </div>
  );
};

export default ProductFilter;