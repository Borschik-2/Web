import React from 'react';
import { features } from './data';
import './ProductPage.css';

// 1. Компонент шапки
const ProductHeader = ({ productName }) => {
  return (
    <header className="product-header">
      <h2>{productName}</h2>
    </header>
  );
};

// 2. Компонент опису (Картка)
const Description = () => {
  return (
    <div className="product-card description-card">
      <h3>Про продукт</h3>
      <p>
        CloudSync Pro — це надійне хмарне сховище для вашого бізнесу. 
        Ми забезпечуємо швидку синхронізацію, максимальну безпеку та 
        зручні інструменти для командної роботи.
      </p>
    </div>
  );
};

// 3. Компонент окремої фічі (Картка)
const Feature = ({ title, description }) => {
  return (
    <div className="product-card feature-card">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};

// 4. Компонент списку фіч
const Features = () => {
  return (
    <div className="features-container">
      <h3>Ключові можливості:</h3>
      <div className="features-grid">
        {features.map((feature) => (
          <Feature 
            key={feature.id} 
            title={feature.title} 
            description={feature.description} 
          />
        ))}
      </div>
    </div>
  );
};

// 5. Компонент деталей (включає Опис і Фічі)
const ProductDetails = () => {
  return (
    <main className="product-details">
      <Description />
      <Features />
    </main>
  );
};

// 6. Компонент підвалу
const ProductFooter = () => {
  return (
    <footer className="product-footer">
      <p>© 2026 CloudSync Pro. Всі права захищено.</p>
      <p>Контакти: support@cloudsync.com | +38 (044) 123-45-67</p>
    </footer>
  );
};

// 7. ГОЛОВНИЙ КОМПОНЕНТ (Збирає все разом)
const ProductPage = () => {
  return (
    <div className="product-page-wrapper">
      <ProductHeader productName="CloudSync Pro" />
      <ProductDetails />
      <ProductFooter />
    </div>
  );
};

export default ProductPage;