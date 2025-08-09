// src/assets/components/pages/cards.jsx
import React, { useState } from "react";
import "../styles/Cards.css"

const sampleQuiz = [
  {
    id: "q1",
    question: "Сколько игроков в команде в CS2?",
    options: [
      { id: "a", text: "4" },
      { id: "b", text: "5" },
      { id: "c", text: "6" }
    ],
    correct: "b"
  },
  {
    id: "q2",
    question: "Сколько раундов в стандартном матче без овертайма?",
    options: [
      { id: "a", text: "24" },
      { id: "b", text: "30" },
      { id: "c", text: "20" }
    ],
    correct: "b"
  },
  {
    id: "q3",
    question: "Какая команда отвечает за установку бомбы?",
    options: [
      { id: "a", text: "Terrorists" },
      { id: "b", text: "Counter-Terrorists" },
      { id: "c", text: "Обе" }
    ],
    correct: "a"
  },
  {
    id: "q4",
    question: "Как называется стандартный пистолет у Counter-Terrorists?",
    options: [
      { id: "a", text: "Glock-18" },
      { id: "b", text: "USP-S" },
      { id: "c", text: "Desert Eagle" }
    ],
    correct: "b"
  },
  {
    id: "q5",
    question: "Какая граната ослепляет противников?",
    options: [
      { id: "a", text: "Smoke Grenade" },
      { id: "b", text: "Molotov" },
      { id: "c", text: "Flashbang" }
    ],
    correct: "c"
  },
  {
    id: "q6",
    question: "Сколько секунд даётся до детонации бомбы после установки?",
    options: [
      { id: "a", text: "35" },
      { id: "b", text: "45" },
      { id: "c", text: "55" }
    ],
    correct: "b"
  },
  {
    id: "q7",
    question: "Какая карта известна как «D2»?",
    options: [
      { id: "a", text: "Dust II" },
      { id: "b", text: "Inferno" },
      { id: "c", text: "Nuke" }
    ],
    correct: "a"
  },
  {
    id: "q8",
    question: "Как называется эконом-раунд, когда покупают лишь ножи?",
    options: [
      { id: "a", text: "Knife Round" },
      { id: "b", text: "Eco Round" },
      { id: "c", text: "Pistol Round" }
    ],
    correct: "a"
  },
  {
    id: "q9",
    question: "Какой нож считается самым редким в CS2?",
    options: [
      { id: "a", text: "Bowie Knife" },
      { id: "b", text: "Butterfly Knife" },
      { id: "c", text: "Karambit" }
    ],
    correct: "c"
  },
  {
    id: "q10",
    question: "Какая граната создаёт стену огня?",
    options: [
      { id: "a", text: "HE Grenade" },
      { id: "b", text: "Incendiary / Molotov" },
      { id: "c", text: "Decoy Grenade" }
    ],
    correct: "b"
  }
];

export default function Cards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [results, setResults] = useState({}); // { qId: boolean }
  const [showSummary, setShowSummary] = useState(false);

  const question = sampleQuiz[currentIndex];

  const handleOptionSelect = (optId) => {
    if (results[question.id] != null) return; // не менять уже посчитанный ответ

    const correct = optId === question.correct;
    setSelectedOption(optId);
    setIsCorrect(correct);
    setResults((prev) => ({
      ...prev,
      [question.id]: correct
    }));
  };

  const resetQuestionState = () => {
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleNext = () => {
    if (currentIndex < sampleQuiz.length - 1) {
      setCurrentIndex((idx) => idx + 1);
      resetQuestionState();
    } else {
      setShowSummary(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((idx) => idx - 1);
      resetQuestionState();
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setResults({});
    setShowSummary(false);
    resetQuestionState();
  };

  // Считаем правильные и неправильные ответы
  const correctCount = Object.values(results).filter((v) => v).length;
  const wrongCount = Object.values(results).filter((v) => !v).length;
  // Прогресс в процентах
const progressPercent = ((currentIndex + 1) / sampleQuiz.length) * 100;


  // Финальный экран после завершения всех вопросов
  if (showSummary) {
    return (
      <div className="quiz-summary">
        <h2 className="quiz-summary__title">Тест завершён</h2>
        <p className="quiz-summary__stats">
          Правильных ответов: {correctCount}
        </p>
        <p className="quiz-summary__stats">
          Неправильных ответов: {wrongCount}
        </p>
        <button
          className="quiz-summary__restart-btn"
          onClick={handleRestart}
        >
          Пройти заново
        </button>
      </div>
    );
  }

  return (
    <div className="cards-page">
      <h1 className="cards-page__title">CS2 Quiz</h1>

      <div className="quiz-stats">
        <span>Правильно: {correctCount}</span>
        <span>Неправильно: {wrongCount}</span>
      </div>

      <div className="quiz-progress">
  <div
    className="quiz-progress__bar"
    style={{ width: `${progressPercent}%` }}
  ></div>
</div>

      <div className="quiz-card">
        <h2 className="quiz-card__question">{question.question}</h2>

        <div className="quiz-card__options">
          {question.options.map((opt) => (
            <button
              key={opt.id}
              className="quiz-card__option"
              onClick={() => handleOptionSelect(opt.id)}
              disabled={results[question.id] != null}
            >
              {opt.text}
            </button>
          ))}
        </div>

        {results[question.id] != null && (
          <p
            className={
              results[question.id]
                ? "quiz-card__feedback quiz-card__feedback--correct"
                : "quiz-card__feedback quiz-card__feedback--wrong"
            }
          >
            {results[question.id]
              ? "✅ Правильно!"
              : `❌ Неверно. Правильный ответ: ${
                  question.options.find((o) => o.id === question.correct).text
                }`}
          </p>
        )}

        <div className="quiz-card__nav">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="quiz-card__nav-btn"
          >
            Назад
          </button>
          <button
            onClick={handleNext}
            disabled={results[question.id] == null}
            className="quiz-card__nav-btn"
          >
            {currentIndex < sampleQuiz.length - 1
              ? "Дальше"
              : "Завершить"}
          </button>
        </div>
      </div>
    </div>
  );
}