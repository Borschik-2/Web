import React from 'react';
import ProductPage from './ProductPage';
import TeamPage from './TeamPage';
import './App.css';

function App() {
  return (
    <div className="app-main-container">
      <h1 className="main-title">Лабораторна робота: Вкладеність компонентів</h1>
      
      {/* Рендеримо компонент з першого завдання */}
      <ProductPage />

      {/* Рендеримо компонент з другого завдання */}
      <TeamPage />
    </div>
  );
}

export default App;