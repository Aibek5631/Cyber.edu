// src/components/QuizCard.jsx

import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";

export default function QuizCard({ card, onComplete, onRate }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  // Сброс локального состояния при смене карточки
  useEffect(() => {
    setSelected(null);
    setAnswered(false);
  }, [card.id]);

  if (!card || !Array.isArray(card.options)) {
    return <div>Загрузка...</div>;
  }

  const handleSelect = (opt) => {
    if (answered) return;              // Блок повторных кликов
    setSelected(opt);
    setAnswered(true);
    onComplete(opt.isCorrect);         // Родителю говорим, правильно ли
  };

  return (
    <div
      style={{
        padding:      20,
        border:       "2px solid #4a90e2",
        borderRadius: 8,
        boxShadow:    "0 2px 6px rgba(0,0,0,0.1)",
        marginBottom: 20,
      }}
    >
      <h3 style={{ margin: 0 }}>{card.title}</h3>
      <p>{card.question}</p>

      {!answered ? (
        card.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt)}
            style={{
              display:      "block",
              width:        "100%",
              textAlign:    "left",
              margin:       "8px 0",
              padding:      "8px 12px",
              background:   "#f5f5f5",
              border:       "1px solid #ccc",
              borderRadius: 4,
              cursor:       "pointer",
            }}
          >
            {opt.text}
          </button>
        ))
      ) : (
        <p style={{ color: selected.isCorrect ? "green" : "red" }}>
          {selected.isCorrect ? "✅ Правильно!" : "❌ Неправильно"}
        </p>
      )}

      <div style={{ marginTop: 12 }}>
        <p style={{ margin: "4px 0" }}>Оцените сложность:</p>
        <StarRating onRate={onRate} />
      </div>
    </div>
  );
}