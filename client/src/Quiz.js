import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QuizContext } from './QuizContext';
import './Quiz.css';
import back from './background_bruh_3.png';
import Swal from 'sweetalert2';

const divStyle = {
  backgroundImage: `url(${back})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center'
};

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
      Swal.fire({
        title: 'Quiz completed!',
        text: `Your score is: ${score + (isCorrect ? 1 : 0)} / ${currentQuiz.questions.length}`,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/');
      });
    }
  };

  return (
    <div id='QuizDiv' style={divStyle}>
      <h1>{currentQuiz.title}</h1>
      <p className='QuizDescDiv'>{currentQuiz.description}</p>
      <div className='QuestionsAndAnswersDiv'>
        <h2>{currentQuestion.question_text}</h2>
        <div className='AnswersButtonsDiv'>
          {currentQuestion.answers.map((answer, index) => (
            <button key={index} onClick={() => handleAnswerClick(answer.is_correct)}>
              {answer.answer_text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;