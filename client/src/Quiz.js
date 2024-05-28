import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QuizContext } from './QuizContext';

const Quiz = () => {
  const { quizId } = useParams();
  const { quizzes, setScore, score } = useContext(QuizContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const quiz = quizzes.find(q => q.quiz_id === parseInt(quizId));
    setCurrentQuiz(quiz);
  }, [quizId, quizzes]);

  if (!currentQuiz) {
    return <div>Loading...</div>;
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Quiz completed! Your score is: ${score + (isCorrect ? 1 : 0)} / ${currentQuiz.questions.length}`);
      navigate('/');
    }
  };

  return (
    <div>
      <h1>{currentQuiz.title}</h1>
      <p>{currentQuiz.description}</p>
      <div>
        <h2>{currentQuestion.question_text}</h2>
        {currentQuestion.answers.map((answer, index) => (
          <button key={index} onClick={() => handleAnswerClick(answer.is_correct)}>
            {answer.answer_text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
