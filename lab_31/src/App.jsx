import React, { useState, useMemo } from 'react';
import { courses as initialCourses } from './coursesData';
import CoursesList from './CoursesList';
import styles from './App.module.css';

function App() {
  // Стейти для фільтрів, сортування та вигляду
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('All');
  const [onlyFree, setOnlyFree] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' або 'list'

  // Обробка даних (фільтрація + сортування) за допомогою useMemo для оптимізації
  const filteredAndSortedCourses = useMemo(() => {
    let result = [...initialCourses];

    // 1. Пошук
    if (search) {
      result = result.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));
    }

    // 2. Фільтрація за рівнем
    if (level !== 'All') {
      result = result.filter(c => c.level === level.toLowerCase());
    }

    // 3. Чекбокси
    if (onlyFree) result = result.filter(c => c.isFree);
    if (onlyNew) result = result.filter(c => c.isNew);

    // 4. Сортування
    switch (sortBy) {
      case 'durationAsc':
        result.sort((a, b) => a.duration - b.duration);
        break;
      case 'durationDesc':
        result.sort((a, b) => b.duration - a.duration);
        break;
      case 'titleAZ':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return result;
  }, [search, level, onlyFree, onlyNew, sortBy]);

  // Розрахунок статистики
  const stats = {
    total: filteredAndSortedCourses.length,
    free: filteredAndSortedCourses.filter(c => c.isFree).length,
    avgDuration: filteredAndSortedCourses.length 
      ? (filteredAndSortedCourses.reduce((acc, curr) => acc + curr.duration, 0) / filteredAndSortedCourses.length).toFixed(1)
      : 0
  };

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.mainTitle}>Available Courses</h1>

      {/* Панель управління (Фільтри, Пошук, Сортування) */}
      <div className={styles.controlsBar}>
        <div className={styles.filterGroup}>
          <input 
            type="text" 
            placeholder="Search course..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.input}
          />

          <select value={level} onChange={(e) => setLevel(e.target.value)} className={styles.select}>
            <option value="All">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.select}>
            <option value="default">Sort By...</option>
            <option value="durationAsc">Duration (Low to High)</option>
            <option value="durationDesc">Duration (High to Low)</option>
            <option value="titleAZ">Title (A-Z)</option>
          </select>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" checked={onlyFree} onChange={(e) => setOnlyFree(e.target.checked)} />
            Only Free Courses
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" checked={onlyNew} onChange={(e) => setOnlyNew(e.target.checked)} />
            Only New Courses
          </label>
        </div>

        {/* Перемикач Grid/List */}
        <div className={styles.viewToggle}>
          <button 
            className={viewMode === 'grid' ? styles.activeBtn : styles.btn} 
            onClick={() => setViewMode('grid')}
          >
            Grid
          </button>
          <button 
            className={viewMode === 'list' ? styles.activeBtn : styles.btn} 
            onClick={() => setViewMode('list')}
          >
            List
          </button>
        </div>
      </div>

      {/* Панель статистики */}
      <div className={styles.statsBar}>
        <span>Found: <b>{stats.total}</b> courses</span>
        <span>Free: <b>{stats.free}</b></span>
        <span>Avg. Duration: <b>{stats.avgDuration}h</b></span>
      </div>

      {/* Список курсів */}
      <CoursesList courses={filteredAndSortedCourses} viewMode={viewMode} />
    </div>
  );
}

export default App;