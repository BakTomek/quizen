import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { QuizProvider } from '../QuizContext';
import axios from 'axios';

// Ensure axios is mocked for test isolation
jest.mock('axios');

// Sample data for quizzes
const sampleQuizzes = [
  { quiz_id: 1, title: 'Sample Quiz 1', description: 'Description 1' },
  { quiz_id: 2, title: 'Sample Quiz 2', description: 'Description 2' },
];

// Utility function to render components with context and router
const renderWithProviders = (ui, { route = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <QuizProvider>
        {ui}
      </QuizProvider>
    </MemoryRouter>
  );
};

// Test cases

test('renders App component', () => {
  renderWithProviders(<App />, { route: '/' });
  expect(screen.getByText('Welcome to the Quiz App')).toBeInTheDocument();
});

test('navigates to Create Quiz page', async () => {
  renderWithProviders(<App />, { route: '/' });

  fireEvent.click(screen.getByText('Create'));
  await waitFor(() => {
    expect(screen.getByText(/Create Quiz/i)).toBeInTheDocument();
  });
});

test('displays quizzes on the Quizzes page', async () => {
  axios.get.mockResolvedValueOnce({ data: sampleQuizzes });

  renderWithProviders(<App />, { route: '/quizzes' });

  await waitFor(() => {
    sampleQuizzes.forEach(quiz => {
      expect(screen.getByText(quiz.title)).toBeInTheDocument();
    });
  });
});

test('navigates to the Quiz page when a quiz is clicked', async () => {
  axios.get.mockResolvedValueOnce({ data: sampleQuizzes });

  renderWithProviders(<App />, { route: '/quizzes' });

  await waitFor(() => {
    sampleQuizzes.forEach(quiz => {
      expect(screen.getByText(quiz.title)).toBeInTheDocument();
    });
  });

  fireEvent.click(screen.getByText(sampleQuizzes[0].title));
  await waitFor(() => {
    expect(screen.getByText(/Question/i)).toBeInTheDocument();
  });
});

test('handles quiz creation', async () => {
  axios.post.mockResolvedValueOnce({ data: { quiz_id: 3, ...sampleQuizzes[0] } });

  renderWithProviders(<App />, { route: '/create-quiz' });

  fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Quiz' } });
  fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'New Quiz Description' } });

  fireEvent.click(screen.getByText('Add Question'));
  expect(screen.getAllByPlaceholderText('Sample question').length).toBeGreaterThan(0);

  fireEvent.click(screen.getByText('Create Quiz'));

  await waitFor(() => {
    expect(screen.getByText('Sample Quiz 1')).toBeInTheDocument();
  });
});
