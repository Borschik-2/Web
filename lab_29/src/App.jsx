import React from 'react';
import MiniBlog from './components/MiniBlog';
import FavoriteMovies from './components/FavoriteMovies';
import './App.css';

function App() {
  return (
    // Головний контейнер додатку
    <div className="app-container">
      <h1>Лабораторна робота №26</h1>
      
      <div className="components-wrapper">
        {/* Рендеримо компонент Міні-блогу */}
        <MiniBlog />
        
        {/* Рендеримо компонент Улюблених фільмів */}
        <FavoriteMovies />
      </div>
    </div>
  );
}

export default App;