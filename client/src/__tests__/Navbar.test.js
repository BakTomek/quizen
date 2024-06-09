import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

test('renders navbar links', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  expect(screen.getByText(/Quizen/i)).toBeInTheDocument();
  expect(screen.getByText(/Main/i)).toBeInTheDocument();
  expect(screen.getByText(/Quizzes/i)).toBeInTheDocument();
  expect(screen.getByText(/Create/i)).toBeInTheDocument();
});

test('navigates to Main page', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  fireEvent.click(screen.getByText(/Main/i));
  expect(window.location.pathname).toBe('/');
});

test('navigates to Quizzes page', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  fireEvent.click(screen.getByText(/Quizzes/i));
  expect(window.location.pathname).toBe('/quizzes');
});

test('navigates to Create page', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  fireEvent.click(screen.getByText(/Create/i));
  expect(window.location.pathname).toBe('/create-quiz');
});
