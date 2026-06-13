import React from 'react';
import Schedules from './Schedules';
import Schedule from './Schedule';
import UserProfileForm from './UserProfileForm';
import { schedulesData } from './schedulesData';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="lab-title">Лабораторна робота: children та State</h1>
      
      <div className="tasks-wrapper">
        
        {/* ЗАВДАННЯ 1: Розклад уроків */}
        <section className="task-section">
          <Schedules date="2025-12-05">
            {/* Рендеримо масив уроків як children всередині контейнера */}
            {schedulesData.map((lesson) => (
              <Schedule 
                key={lesson.id}
                time={lesson.time}
                duration={lesson.duration}
                subject={lesson.subject}
                classroom={lesson.classroom}
                teacher={lesson.teacher}
                color={lesson.color}
              />
            ))}
          </Schedules>
        </section>

        {/* ЗАВДАННЯ 2: Форма профілю */}
        <section className="task-section">
          <UserProfileForm />
        </section>

      </div>
    </div>
  );
}

export default App;