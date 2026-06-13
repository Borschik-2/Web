import React, { useState } from 'react';
import './UserProfileForm.css';

const UserProfileForm = () => {
  // 1. Ініціалізуємо три стани (state)
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("Ukraine");

  // Функція для очищення форми
  const handleClear = () => {
    setName("");
    setAge("");
    setCountry("Ukraine");
  };

  return (
    <div className="profile-form-container">
      <h2 className="form-title">User Profile Form</h2>

      <div className="form-group">
        <label>Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Введіть ім'я"
        />
        {/* Показуємо поточне значення */}
        <span className="current-value">Name: {name}</span>
      </div>

      <div className="form-group">
        <label>Age:</label>
        <input 
          type="number" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          placeholder="Введіть вік"
        />
        <span className="current-value">Age: {age}</span>
      </div>

      <div className="form-group">
        <label>Country:</label>
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="Ukraine">Ukraine</option>
          <option value="Poland">Poland</option>
          <option value="Germany">Germany</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>
        <span className="current-value">Country: {country}</span>
      </div>

      <button className="clear-btn" onClick={handleClear}>
        Clear Form
      </button>

      {/* Об'єднаний підсумковий рядок */}
      <div className="summary-block">
        <h3>Summary:</h3>
        <p>
          Hello, <b>{name || "[Name]"}</b> from <b>{country}</b>! 
          You are <b>{age || "[Age]"}</b> years old.
        </p>
      </div>
    </div>
  );
};

export default UserProfileForm;