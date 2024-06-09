import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Quiz from '../Quiz.js';
import { QuizProvider } from '../QuizContext.js';

const mockQuiz = {
  quiz_id: 1,
  title: 'Sample Quiz',
  description: 'Sample Description',
  questions: [
    {
      question_text: 'Question 1?',
      answers: [
        { answer_text: 'Answer 1', is_correct: true },
        { answer_text: 'Answer 2', is_correct: false }
      ]
    }
  ]
};

test('renders and completes a quiz', () => {
  render(
    <QuizProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/quiz/:quizId" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </QuizProvider>
  );

  // Mock QuizContext data
  const quizContext = require('./QuizContext');
  jest.spyOn(quizContext, 'useQuizContext').mockImplementation(() => ({
    quizzes: [mockQuiz],
    setScore: jest.fn(),
    score: 0,
  }));

  fireEvent.click(screen.getByText('Answer 1'));

  expect(screen.getByText('Quiz completed! Your score is: 1 / 1')).toBeInTheDocument();
});
