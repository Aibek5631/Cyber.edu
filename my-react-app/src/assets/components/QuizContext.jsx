// src/assets/components/QuizContext.jsx

import React, { createContext, useContext } from "react";
import {
  doc,
  setDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";
import { firestore } from "../../firebase";
import { AuthContext } from "../../auth/AuthProvider";

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const { user } = useContext(AuthContext);

  const submitAnswer = async (cardId, isCorrect) => {
    if (!user) return;

    const userRef = doc(firestore, "users", user.uid);

    // Сохраняем результат для конкретной карточки
    await setDoc(
      doc(userRef, "quizResults", cardId),
      {
        correct: isCorrect,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    // Если ответ верный – увеличиваем completedLessons
    if (isCorrect) {
      await setDoc(
        userRef,
        { completedLessons: increment(1) },
        { merge: true }
      );
    }
  };

  return (
    <QuizContext.Provider value={{ submitAnswer }}>
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => useContext(QuizContext);