import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { QuizContext } from './QuizContext';

const Quizzes = () => {
  const { quizzes, setQuizzes, setCurrentQuiz, setCurrentQuestionIndex, setScore } = useContext(QuizContext);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/quizzes');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Failed to fetch quizzes', error);
      }
    };

    fetchQuizzes();
  }, [setQuizzes]);

  const startQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  return (
    <div>
      <h1>Quizzes</h1>
      {quizzes.map(quiz => (
        <div key={quiz.quiz_id} onClick={() => startQuiz(quiz)}>
          <h2>{quiz.title}</h2>
          <p>{quiz.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Quizzes;
