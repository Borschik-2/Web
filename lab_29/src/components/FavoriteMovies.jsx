import React from 'react';
import './FavoriteMovies.css'; // Підключаємо стилі компонента

const FavoriteMovies = () => {
  // Масив з даними про фільми
  const movies = [
    {
      id: 1,
      title: 'Володар перснів: Хранителі Персня',
      image: 'https://image.tmdb.org/t/p/original/yrEZeHgn2Y3F3G4w6qeI22LrZzQ.jpg'
    },
    {
      id: 2,
      title: 'Безславні виродки',
      image: 'https://image.tmdb.org/t/p/original/ovpIZPLW0tX9Lk7iEbuunpUHNZx.jpg'
    }
  ];

  return (
    <div className="movies-container">
      {/* Заголовок */}
      <h3>Мої улюблені фільми</h3>
      
      {/* Нумерований список */}
      <ol className="movies-list">
        {/* Проходимось по масиву фільмів і рендеримо кожен елемент */}
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <span className="movie-title">{movie.title}</span>
            <img 
              src={movie.image} 
              alt={`Постер фільму ${movie.title}`} 
              className="movie-poster"
            />
            <button className="details-btn">Детальніше</button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default FavoriteMovies;