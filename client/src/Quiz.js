import React, { useContext } from 'react';
import { QuizContext } from './QuizContext';

const Quiz = () => {
  const {
    currentQuiz,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    score,
    setScore
  } = useContext(QuizContext);

  if (!currentQuiz) {
    return null;
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Quiz finished! Your score is ${score + (isCorrect ? 1 : 0)} / 10`);
      window.location.reload(); // Reset the app state
    }
  };

  return (
    <div>
      <h2>{currentQuiz.title}</h2>
      <p>{currentQuestion.question_text}</p>
      {currentQuestion.answers.map(answer => (
        <button key={answer.answer_id} onClick={() => handleAnswerClick(answer.is_correct)}>
          {answer.answer_text}
        </button>
      ))}
    </div>
  );
};

export default Quiz;
