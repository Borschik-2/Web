import React from 'react';
import './MiniBlog.css'; // Підключаємо стилі компонента

// Створюємо функціональний компонент MiniBlog
const MiniBlog = () => {
  return (
    // Головний контейнер компонента
    <div className="mini-blog-container">
      {/* Заголовок поста */}
      <h2>Мій перший блог-пост</h2>
      
      {/* Короткий опис */}
      <p>Сьогодні я почав вивчати React і вже створив свій перший компонент!</p>
      
      {/* Зображення поста (використовуємо надійний плейсхолдер для прикладу) */}
      <img 
        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
        alt="Blogging" 
        className="blog-image"
      />
      
      {/* Список тегів/категорій */}
      <ul className="tags-list">
        <li>React</li>
        <li>JSX</li>
        <li>Frontend</li>
      </ul>
      
      {/* Посилання на джерело */}
      <a 
        href="https://react.dev" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="source-link"
      >
        Документація React
      </a>
    </div>
  );
};

export default MiniBlog;