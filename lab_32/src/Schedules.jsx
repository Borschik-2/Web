import React from 'react';
import './Schedules.css';

const Schedules = ({ date, children }) => {
  // --- ДОДАТКОВЕ ЗАВДАННЯ (Робота з датою) ---
  
  // Функція для перевірки та парсингу дати
  const parseDate = (inputDate) => {
    const parsed = new Date(inputDate);
    // Перевіряємо, чи дата валідна
    if (isNaN(parsed.getTime())) {
      console.warn(`Увага: Некоректна дата "${inputDate}". Використано поточну дату.`);
      return new Date(); // Повертаємо сьогоднішню дату як fallback
    }
    return parsed;
  };

  const validDate = parseDate(date);

  // Масиви для форматування українською мовою
  const daysAccusative = [
    "неділю", "понеділок", "вівторок", "середу", "четвер", "п'ятницю", "суботу"
  ];
  const monthsGenitive = [
    "січня", "лютого", "березня", "квітня", "травня", "червня", 
    "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"
  ];

  // Форматуємо день тижня та саму дату
  const dayName = daysAccusative[validDate.getDay()];
  const formattedDate = `${String(validDate.getDate()).padStart(2, '0')} ${monthsGenitive[validDate.getMonth()]} ${validDate.getFullYear()}`;

  return (
    <div className="schedules-container">
      <div className="schedules-header">
        <h2>Розклад на {dayName}</h2>
        <p className="schedules-date">{formattedDate}</p>
      </div>
      
      {/* Лінія-розділювач */}
      <hr className="schedules-divider" />

      {/* Рендеримо вкладені компоненти, які передаються ззовні */}
      <div className="schedules-content">
        {children}
      </div>
    </div>
  );
};

export default Schedules;