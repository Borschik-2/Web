import React from 'react';
import { teams } from './data';
import './TeamPage.css';

// 1. Заголовок сторінки команд
const TeamHeader = ({ title }) => {
  return (
    <header className="team-header">
      <h2>{title}</h2>
    </header>
  );
};

// 2. Компонент окремого учасника (Картка)
const Member = ({ name, role, avatar, skills }) => {
  return (
    <div className="member-card">
      <div className="member-avatar">{avatar}</div>
      <div className="member-info">
        <h4>{name}</h4>
        <p className="member-role">{role}</p>
        <div className="member-skills">
          {skills.map((skill, index) => (
            <span key={index} className="skill-badge">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

// 3. Компонент команди
// Використовуємо спеціальний проп "children" для рендерингу вкладених учасників
const Team = ({ name, description, color, children }) => {
  return (
    // Додаємо динамічний клас для кольору рамки (team-blue, team-purple і т.д.)
    <div className={`team-section team-${color}`}>
      <div className="team-info">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      {/* Рендеримо те, що передано всередину тегу <Team>...</Team> */}
      <div className="team-members-grid">
        {children}
      </div>
    </div>
  );
};

// 4. Список всіх команд
const TeamList = () => {
  return (
    <div className="team-list">
      {teams.map((team) => (
        <Team 
          key={team.id} 
          name={team.name} 
          description={team.description} 
          color={team.color}
        >
          {/* Вкладені компоненти Member передаються як children */}
          {team.members.map((member) => (
            <Member 
              key={member.id}
              name={member.name}
              role={member.role}
              avatar={member.avatar}
              skills={member.skills}
            />
          ))}
        </Team>
      ))}
    </div>
  );
};

// 5. Підвал сторінки команд
const TeamFooter = () => {
  return (
    <footer className="team-footer">
      <p>Хочете приєднатися до нашої команди? Відправляйте резюме на hr@company.com</p>
    </footer>
  );
};

// 6. ГОЛОВНИЙ КОМПОНЕНТ
const TeamPage = () => {
  return (
    <div className="team-page-wrapper">
      <TeamHeader title="Наша Структура Команд" />
      <TeamList />
      <TeamFooter />
    </div>
  );
};

export default TeamPage;