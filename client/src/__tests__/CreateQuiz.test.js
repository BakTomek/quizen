import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CreateQuiz from '../components/CreateQuiz/CreateQuiz';
import { QuizProvider } from '../QuizContext';
import axios from 'axios';

jest.mock('axios');

test('renders create quiz form', () => {
  render(
    <QuizProvider>
      <MemoryRouter>
        <CreateQuiz />
      </MemoryRouter>
    </QuizProvider>
  );

  expect(screen.getByText(/Add Question/i)).toBeInTheDocument();
});

test('adds a question', () => {
  render(
    <QuizProvider>
      <MemoryRouter>
        <CreateQuiz />
      </MemoryRouter>
    </QuizProvider>
  );

  fireEvent.click(screen.getByText(/Add Question/i));
  expect(screen.getAllByPlaceholderText(/Sample question/i)).toHaveLength(2);
});

test('submits a new quiz', async () => {
  axios.post.mockResolvedValue({ data: { quiz_id: 1 } });

  render(
    <QuizProvider>
      <MemoryRouter>
        <CreateQuiz />
      </MemoryRouter>
    </QuizProvider>
  );

  // Using screen to get the elements by their roles or placeholder texts
  fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'New Quiz' } });
  fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'Quiz Description' } });
  fireEvent.change(screen.getByPlaceholderText(/Sample question/i), { target: { value: 'What is a person?' } });

  const answers = screen.getAllByPlaceholderText(/Sample answer/i);
  fireEvent.change(answers[0], { target: { value: 'Answer1' } });
  fireEvent.change(answers[1], { target: { value: 'Answer2' } });

  // Submit the form
  const createQuizButton = document.querySelector('.CreateQuizButton');
  fireEvent.click(createQuizButton);

  // Wait for axios.post to be called
  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledTimes(1); // Verify that the mock function was called
  });

  // Verify the API call payload
  const expectedPayload = {
    title: 'New Quiz',
    description: 'Quiz Description',
    questions: [
      {
        question: 'What is a person?',
        answers: ['Answer1', 'Answer2'],
      },
    ],
  };

  expect(axios.post).toHaveBeenCalledWith('/api/quizzes', expectedPayload);
});