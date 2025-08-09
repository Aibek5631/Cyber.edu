// src/assets/components/CourseCard.jsx
import React from "react";
import "./styles/CourseCard.css";

export default function CourseCard({ course }) {
  return (
    <div className="course-card">
      <img
        src={course.coverUrl}
        alt={course.title}
        className="course-card__cover"
      />
      <div className="course-card__body">
        <h3 className="course-card__title">{course.title}</h3>
        <p className="course-card__description">{course.description}</p>
        <div className="course-card__info">
          <span className="course-card__rating">Рейтинг: {course.rating} ★</span>
          {course.isNew && <span className="badge--new">Новинка</span>}
        </div>
        <button className="course-card__btn">Подробнее</button>
      </div>
    </div>
  );
}