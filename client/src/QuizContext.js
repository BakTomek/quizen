import React, { createContext, useState } from 'react';

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  return (
    <QuizContext.Provider value={{
      quizzes,
      setQuizzes,
      currentQuiz,
      setCurrentQuiz,
      currentQuestionIndex,
      setCurrentQuestionIndex,
      score,
      setScore
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizProvider };