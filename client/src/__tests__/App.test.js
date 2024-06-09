import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App.js';
import { QuizProvider } from '../QuizContext.js';

test('renders main page by default', () => {
  render(
    <QuizProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QuizProvider>
  );
  expect(screen.getByText(/Welcome to the Quiz App/i)).toBeInTheDocument();
});

test('navigates to Quizzes page', () => {
  render(
    <QuizProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QuizProvider>
  );
  fireEvent.click(screen.getByText(/Quizzes/i));
  expect(screen.getByText(/Existing Quizzes/i)).toBeInTheDocument();
});

test('navigates to Create Quiz page', () => {
  render(
    <QuizProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QuizProvider>
  );
  fireEvent.click(screen.getByText(/Create/i));
  expect(screen.getByText(/Create Quiz/i)).toBeInTheDocument();
});
