import React from 'react';
import './Schedule.css';

const Schedule = ({ time, duration, subject, classroom, teacher, color }) => {
  return (
    // Використовуємо інлайн-стиль для динамічного кольору лівої смужки
    <div className="schedule-card" style={{ borderLeftColor: color }}>
      
      {/* Лівий блок: Час та тривалість */}
      <div className="schedule-time-block">
        <span className="schedule-time" style={{ color: color }}>{time}</span>
        <span className="schedule-duration">{duration}</span>
      </div>

      {/* Правий блок: Деталі уроку */}
      <div className="schedule-details">
        <h4 className="schedule-subject">{subject}</h4>
        <p className="schedule-classroom">{classroom}</p>
        {/* Рендеримо викладача тільки якщо він є (наприклад, на обіді його немає) */}
        {teacher && <p className="schedule-teacher">Викладач: {teacher}</p>}
      </div>
      
    </div>
  );
};

export default Schedule;