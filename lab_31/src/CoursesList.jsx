import React from 'react';
import CourseCard from './CourseCard';
import styles from './CoursesList.module.css';
import clsx from 'clsx';

const CoursesList = ({ courses, viewMode }) => {
  if (courses.length === 0) {
    return <div className={styles.noResults}>Курсів за вашим запитом не знайдено 😢</div>;
  }

  return (
    <div className={clsx(styles.container, styles[viewMode])}>
      {courses.map(course => (
        <CourseCard key={course.id} course={course} viewMode={viewMode} />
      ))}
    </div>
  );
};

export default CoursesList;