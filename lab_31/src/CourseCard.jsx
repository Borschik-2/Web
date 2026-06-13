import React from 'react';
import clsx from 'clsx';
import styles from './CourseCard.module.css';

const CourseCard = ({ course, viewMode }) => {
  const { title, level, isFree, isNew, duration } = course;

  return (
    <div
      // Використовуємо clsx для динамічного додавання класів
      className={clsx(
        styles.card,
        styles[viewMode], // Клас для сітки або списку (grid/list)
        {
          [styles.free]: isFree,
          [styles.paid]: !isFree,
          [styles.levelBeginner]: level === "beginner",
          [styles.levelIntermediate]: level === "intermediate",
          [styles.levelAdvanced]: level === "advanced",
          [styles.pulse]: isNew // Анімація пульсації для нових курсів
        }
      )}
    >
      {/* Контейнер для бейджів */}
      <div className={styles.badges}>
        {isFree && <span className={clsx(styles.badge, styles.badgeFree)}>FREE ✔</span>}
        {isNew && <span className={clsx(styles.badge, styles.badgeNew)}>NEW ★</span>}
      </div>

      {/* Інформація про курс */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.level}>
          Level: <span>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
        </p>
        <p className={styles.duration}>
          Duration: {duration} hours
        </p>
      </div>
    </div>
  );
};

export default CourseCard;