import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { QuizContext } from './QuizContext';
import { useNavigate } from 'react-router-dom';
import './Quizzes.css';
import back from './background_bruh_3.png'

const divStyle = {
  backgroundImage: `url(${back})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center'
};

const Quizzes = () => {
  const { quizzes, setQuizzes, setCurrentQuiz, setCurrentQuestionIndex, setScore } = useContext(QuizContext);
  const navigate = useNavigate();

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
    navigate(`/quiz/${quiz.quiz_id}`);
  };

  const deleteQuiz = async (quizId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/quizzes/${quizId}`);
      if (response.status === 204) {
        setQuizzes(quizzes.filter(quiz => quiz.quiz_id !== quizId));
      } else {
        console.error('Failed to delete quiz');
      }
    } catch (error) {
      console.error('Failed to delete quiz', error);
    }
  };

  const editQuiz = (quizId) => {
    navigate(`/create-quiz/${quizId}`);
  };

  return (
    <div id='QuizzesDiv' style={divStyle}> 
      <h1>Existing Quizzes</h1>
      <p id='subtitle'>Press title to start trivia!</p>
      <div id='BigQuizDiv'>
      {quizzes.map(quiz => (
        <div key={quiz.quiz_id} className='quizDivGuess'>
          <div onClick={() => startQuiz(quiz)}>
            <h2>{quiz.title}</h2>
            <p className='Desc'>{quiz.description}</p>
          </div>
          <div className='ButtonDiv'>
            <button onClick={() => editQuiz(quiz.quiz_id)}>Edit</button>
            <button onClick={() => deleteQuiz(quiz.quiz_id)}>Delete</button>
          </div>
        </div>
      ))}
      <div className='fillerBottom'></div>
      </div>
    </div>
  );
};

export default Quizzes;
