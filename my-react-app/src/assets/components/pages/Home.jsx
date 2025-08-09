import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, limit, getDocs } from "firebase/firestore";
import { db } from "../../../firebase"; // поправьте путь, если инициализация в другом месте

// import Hero from "../Hero";
// import FeatureCard from "../FeatureCard";
// import CourseCard from "../CourseCard";

import "../styles/Home.css"; // сейчас импорт именно этого файла

export default function HomePage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      const q = query(collection(db, "courses"), limit(3));
      const snap = await getDocs(q);
      setCourses(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    fetchCourses();
  }, []);

  return (
    <div className="home-page">

      {/* Hero */}
      <Hero
        title="Учись онлайн с комфортом"
        subtitle="Видео-курсы, менторская поддержка и сертификаты"
        ctaText="Начать обучение"
        ctaLink="/courses"
      />

      {/* Преимущества */}
      <section className="home-page__features">
        <FeatureCard
          icon="🎥"
          title="Видео-лекции"
          description="Пошаговые уроки от экспертов"
        />
        <FeatureCard
          icon="💬"
          title="Поддержка менторов"
          description="Задавайте вопросы и получайте ответы"
        />
        <FeatureCard
          icon="🧑‍🎓"
          title="Сертификаты"
          description="Подтверждайте свои навыки"
        />
      </section>

      {/* Превью курсов */}
      <section className="home-page__courses">
        <h2 className="home-page__title">Популярные курсы</h2>
        <div className="home-page__list">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <Link to="/courses" className="home-page__more">
          Смотреть все курсы →
        </Link>
      </section>

    </div>
  );
}