import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateQuiz.css';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { quizId } = useParams();

  useEffect(() => {
    if (quizId) {
      const fetchQuiz = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/quizzes/${quizId}`);
          const { title, description, questions } = response.data;
          setTitle(title);
          setDescription(description);
          setQuestions(questions);
        } catch (error) {
          console.error('Failed to fetch quiz', error);
        }
      };
      fetchQuiz();
    } else {
      setQuestions([
        {
          question_text: '',
          answers: [
            { answer_text: '', is_correct: true },
            { answer_text: '', is_correct: false },
          ],
        },
      ]);
    }
  }, [quizId]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question_text: '',
        answers: [
          { answer_text: '', is_correct: true },
          { answer_text: '', is_correct: false },
        ],
      },
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const newQuestions = [...questions];
      newQuestions.splice(index, 1);
      setQuestions(newQuestions);
    } else {
      setError('The quiz must have at least one question.');
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, field, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex][field] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers = newQuestions[questionIndex].answers.map((answer, index) => ({
      ...answer,
      is_correct: index === answerIndex,
    }));
    setQuestions(newQuestions);
  };

  const addAnswer = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.push({ answer_text: '', is_correct: false });
    setQuestions(newQuestions);
  };

  const removeAnswer = (questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.splice(answerIndex, 1);
    setQuestions(newQuestions);
  };

  const saveQuiz = async () => {
    if (questions.length < 1) {
      setError('The quiz must have at least one question.');
      return;
    }

    for (const question of questions) {
      if (!question.question_text.trim()) {
        setError('All questions must have text.');
        return;
      }

      if (question.answers.length < 2 || question.answers.length > 4) {
        setError('Each question must have between 2 and 4 answers.');
        return;
      }

      let hasCorrectAnswer = false;
      for (const answer of question.answers) {
        if (!answer.answer_text.trim()) {
          setError('All answers must have text.');
          return;
        }
        if (answer.is_correct) {
          hasCorrectAnswer = true;
        }
      }

      if (!hasCorrectAnswer) {
        setError('Each question must have one correct answer.');
        return;
      }
    }

    const quizData = { title, description, questions };
    try {
      if (quizId) {
        await axios.put(`http://localhost:3000/api/quizzes/${quizId}`, quizData);
      } else {
        await axios.post('http://localhost:3000/api/quizzes', quizData);
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to save quiz', error);
    }
  };

  return (
    <div id='CreateQuizDiv'>
      <h1>{quizId ? 'Edit Quiz' : 'Create Quiz'}</h1>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <label>Question</label>
          <input
            type="text"
            value={question.question_text}
            onChange={(e) => handleQuestionChange(questionIndex, 'question_text', e.target.value)}
          />
          {question.answers.map((answer, answerIndex) => (
            <div key={answerIndex}>
              <label>Answer {answerIndex + 1}</label>
              <input
                type="text"
                value={answer.answer_text}
                onChange={(e) => handleAnswerChange(questionIndex, answerIndex, 'answer_text', e.target.value)}
              />
              <label>
                <input
                  type="radio"
                  checked={answer.is_correct}
                  onChange={() => handleCorrectAnswerChange(questionIndex, answerIndex)}
                />
                Correct
              </label>
              {question.answers.length > 2 && (
                <button type="button" onClick={() => removeAnswer(questionIndex, answerIndex)}>
                  Remove Answer
                </button>
              )}
            </div>
          ))}
          {question.answers.length < 4 && (
            <button type="button" onClick={() => addAnswer(questionIndex)}>
              Add Answer
            </button>
          )}
          <button type="button" onClick={() => removeQuestion(questionIndex)}>
            Remove Question
          </button>
        </div>
      ))}
      <button type="button" onClick={addQuestion}>
        Add Question
      </button>
      <button type="button" onClick={saveQuiz}>
        {quizId ? 'Save Changes' : 'Create Quiz'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreateQuiz;