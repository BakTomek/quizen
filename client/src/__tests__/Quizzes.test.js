import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Quizzes from '../Quizzes';
import { QuizProvider } from '../QuizContext';
import axios from 'axios';

jest.mock('axios');

const mockQuizzes = [
  {
    quiz_id: 1,
    title: 'Sample Quiz 1',
    description: 'Description for Sample Quiz 1',
    questions: []
  },
  {
    quiz_id: 2,
    title: 'Sample Quiz 2',
    description: 'Description for Sample Quiz 2',
    questions: []
  }
];

test('fetches and displays quizzes', async () => {
  axios.get.mockResolvedValue({ data: mockQuizzes });

  render(
    <QuizProvider>
      <BrowserRouter>
        <Quizzes />
      </BrowserRouter>
    </QuizProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Sample Quiz 1')).toBeInTheDocument();
    expect(screen.getByText('Sample Quiz 2')).toBeInTheDocument();
  });
});

test('starts a quiz when clicked', async () => {
  axios.get.mockResolvedValue({ data: mockQuizzes });

  render(
    <QuizProvider>
      <BrowserRouter>
        <Quizzes />
      </BrowserRouter>
    </QuizProvider>
  );

  await waitFor(() => {
    fireEvent.click(screen.getByText('Sample Quiz 1'));
  });

  expect(window.location.pathname).toBe('/quiz/1');
});