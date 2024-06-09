import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Quiz from '../Quiz';
import { QuizProvider, useQuizContext, QuizContext } from '../QuizContext';

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
      },
      {
          question_text: 'Question 2?',
          answers: [
              { answer_text: 'Answer 3', is_correct: false },
              { answer_text: 'Answer 4', is_correct: true }
          ]
      }
  ]
};

// Mock the context hook
jest.mock('../QuizContext', () => {
  return {
      ...jest.requireActual('../QuizContext'),
      useQuizContext: jest.fn()
  };
});

test('renders quiz with questions and answers', () => {
  useQuizContext.mockReturnValue({
      quizzes: [mockQuiz],
      setScore: jest.fn(),
      score: 0,
  });

  render(
      <QuizProvider>
          <MemoryRouter initialEntries={['/quiz/1']}>
              <Routes>
                  <Route path="/quiz/:quizId" element={<Quiz />} />
              </Routes>
          </MemoryRouter>
      </QuizProvider>
  );

  expect(screen.getByText('Sample Quiz')).toBeInTheDocument();
  expect(screen.getByText('Sample Description')).toBeInTheDocument();
  expect(screen.getByText('Question 1?')).toBeInTheDocument();
  expect(screen.getByText('Answer 1')).toBeInTheDocument();
  expect(screen.getByText('Answer 2')).toBeInTheDocument();
});

test('completes the quiz and displays the score', async () => {
  const setScoreMock = jest.fn();

  useQuizContext.mockReturnValue({
      quizzes: [mockQuiz],
      setScore: setScoreMock,
      score: 0,
  });

  render(
      <QuizProvider>
          <MemoryRouter initialEntries={['/quiz/1']}>
              <Routes>
                  <Route path="/quiz/:quizId" element={<Quiz />} />
              </Routes>
          </MemoryRouter>
      </QuizProvider>
  );

  fireEvent.click(screen.getByText('Answer 1'));
  fireEvent.click(screen.getByText('Next'));

  expect(screen.getByText('Question 2?')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Answer 4'));
  fireEvent.click(screen.getByText('Finish'));

  await waitFor(() => {
      expect(screen.getByText('Quiz completed! Your score is: 2 / 2')).toBeInTheDocument();
      expect(setScoreMock).toHaveBeenCalledWith(2); // Mock score update
  });
});

test('handles incorrect answers and updates score accordingly', async () => {
  const setScoreMock = jest.fn();

  useQuizContext.mockReturnValue({
      quizzes: [mockQuiz],
      setScore: setScoreMock,
      score: 0,
  });

  render(
      <QuizProvider>
          <MemoryRouter initialEntries={['/quiz/1']}>
              <Routes>
                  <Route path="/quiz/:quizId" element={<Quiz />} />
              </Routes>
          </MemoryRouter>
      </QuizProvider>
  );

  fireEvent.click(screen.getByText('Answer 2'));
  fireEvent.click(screen.getByText('Next'));

  expect(screen.getByText('Question 2?')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Answer 3'));
  fireEvent.click(screen.getByText('Finish'));

  await waitFor(() => {
      expect(screen.getByText('Quiz completed! Your score is: 0 / 2')).toBeInTheDocument();
      expect(setScoreMock).toHaveBeenCalledWith(0); // Mock score update
  });
});

test('handles empty quizzes gracefully', () => {
  const emptyQuiz = { ...mockQuiz, questions: [] };

  useQuizContext.mockReturnValue({
      quizzes: [emptyQuiz],
      setScore: jest.fn(),
      score: 0,
  });

  render(
      <QuizProvider>
          <MemoryRouter initialEntries={['/quiz/1']}>
              <Routes>
                  <Route path="/quiz/:quizId" element={<Quiz />} />
              </Routes>
          </MemoryRouter>
      </QuizProvider>
  );

  expect(screen.getByText('Welcome to the Quiz App')).toBeInTheDocument();
});
