import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, limit, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

import Hero from "../Hero";
import FeatureCard from "../FeatureCard";

import "../styles/Home.css";

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
      <Hero
        title="Учись онлайн с комфортом"
        subtitle="Видео-курсы, менторская поддержка и сертификаты"
        ctaText="Начать обучение"
        ctaLink="/courses"
      />

      {/* Новый блок CTA */}
      <div className="community-cta">
        <p>🚀 Присоединяйтесь к нашему IT-комьюнити в Discord</p>
        <a
          href="https://discord.gg/your-link"
          target="_blank"
          rel="noreferrer"
          className="community-btn"
        >
          Вступить в сообщество →
        </a>
      </div>

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

      {/* Новый блок “Почему выбирают нас” */}
      <section className="why-us">
        <h2>Почему выбирают CyberUde.kz?</h2>
        <ul>
          <li>🔥 Практические задания после каждого урока</li>
          <li>💡 Курсы по современным IT-направлениям</li>
          <li>🤝 Поддержка наставников 24/7</li>
          <li>🏆 Возможность участвовать в IT-хакатонах</li>
        </ul>
      </section>

      <section className="home-page__courses">
        <h2 className="home-page__title">Популярные курсы</h2>
        <div className="home-page__list">
          {courses.map(course => (
            <div key={course.id} className="home-page__course-card">
              {course.imageUrl && (
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="home-page__course-image"
                />
              )}
              <h3 className="home-page__course-title">{course.title}</h3>
              <p className="home-page__course-description">
                {course.description?.slice(0, 100)}…
              </p>
              <Link
                to={`/courses/${course.id}`}
                className="home-page__course-link"
              >
                Подробнее →
              </Link>
            </div>
          ))}
        </div>
        <Link to="/courses" className="home-page__more">
          Смотреть все курсы →
        </Link>
        <div className="free-trial">
          <Link to="/register" className="trial-btn">
            Попробовать бесплатно →
          </Link>
        </div>
      </section>

      {/* Мини-футер */}
      <footer className="footer">
        <p>© 2025 CyberUde.kz — Платформа обучения IT</p>
        <nav>
          <Link to="/about">О нас</Link>
          <Link to="/contacts">Контакты</Link>
          <Link to="/privacy">Политика конфиденциальности</Link>
        </nav>
      </footer>
    </div>
  );
}
