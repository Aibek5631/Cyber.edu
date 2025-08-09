import React, { createContext, useContext, useState } from "react";

const QuizContext = createContext();
export const useQuiz = () => useContext(QuizContext);

export function QuizProvider({ children }) {
  const [score, setScore]     = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const resetQuiz = () => {
    setScore(0);
    setQuestionIndex(0);
    setAnswers([]);
  };

  const recordAnswer = (isCorrect) => {
    setAnswers(prev => [...prev, isCorrect]);
    if (isCorrect) setScore(prev => prev + 1);
    setQuestionIndex(prev => prev + 1);
  };

  const value = { score, questionIndex, answers, recordAnswer, resetQuiz };
  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
}