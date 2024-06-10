// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QuizProvider } from '../components/Quiz/QuizContext';
import { AppContent } from '../App'; // Import AppContent for testing

// Mock Components
jest.mock('../components/Navbar/Navbar', () => () => <div>Mock Navbar</div>);
jest.mock('../components/MainPage/MainPage', () => () => <div>Mock Main Page</div>);
jest.mock('../components/Quizzes/Quizzes', () => () => <div>Mock Quizzes</div>);
jest.mock('../components/CreateQuiz/CreateQuiz', () => () => <div>Mock Create Quiz</div>);
jest.mock('../components/Quiz/Quiz', () => () => <div>Mock Quiz</div>);

describe('App', () => {
  test('renders Navbar', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <QuizProvider>
          <AppContent />
        </QuizProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Mock Navbar')).toBeInTheDocument();
  });

  test('renders MainPage component for default route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <QuizProvider>
          <AppContent />
        </QuizProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Mock Main Page')).toBeInTheDocument();
  });

  test('renders Quizzes component for /quizzes route', () => {
    render(
      <MemoryRouter initialEntries={['/quizzes']}>
        <QuizProvider>
          <AppContent />
        </QuizProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Mock Quizzes')).toBeInTheDocument();
  });

  test('renders CreateQuiz component for /create-quiz route', () => {
    render(
      <MemoryRouter initialEntries={['/create-quiz']}>
        <QuizProvider>
          <AppContent />
        </QuizProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Mock Create Quiz')).toBeInTheDocument();
  });

  test('renders CreateQuiz component for /create-quiz/:quizId route', () => {
    render(
      <MemoryRouter initialEntries={['/create-quiz/1']}>
        <QuizProvider>
          <AppContent />
        </QuizProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Mock Create Quiz')).toBeInTheDocument();
  });

  test('renders Quiz component for /quiz/:quizId route', () => {
    render(
      <MemoryRouter initialEntries={['/quiz/1']}>
        <QuizProvider>
          <AppContent />
        </QuizProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Mock Quiz')).toBeInTheDocument();
  });

  test('renders NotFound component for unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <QuizProvider>
          <AppContent />
        </QuizProvider>
      </MemoryRouter>
    );
    expect(screen.queryByText('Mock Main Page')).not.toBeInTheDocument();
    expect(screen.queryByText('Mock Quizzes')).not.toBeInTheDocument();
    expect(screen.queryByText('Mock Create Quiz')).not.toBeInTheDocument();
    expect(screen.queryByText('Mock Quiz')).not.toBeInTheDocument();
  });

  test('App component matches snapshot for / route', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/']}>
        <QuizProvider>
          <AppContent />
        </QuizProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('App component matches snapshot for /quizzes route', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/quizzes']}>
        <QuizProvider>
          <AppContent />
        </QuizProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('App component matches snapshot for /create-quiz route', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/create-quiz']}>
        <QuizProvider>
          <AppContent />
        </QuizProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('App component matches snapshot for /quiz/:quizId route', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/quiz/1']}>
        <QuizProvider>
          <AppContent />
        </QuizProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('App component matches snapshot for unknown route', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/unknown']}>
        <QuizProvider>
          <AppContent />
        </QuizProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
