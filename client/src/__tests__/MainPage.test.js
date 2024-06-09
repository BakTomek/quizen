import React from 'react';
import { render, screen } from '@testing-library/react';
import MainPage from '../components/MainPage/MainPage.js';
import { BrowserRouter } from 'react-router-dom';

test('renders main page content', () => {
  render(
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  );

  expect(screen.getByText(/Welcome to the Quiz App/i)).toBeInTheDocument();
  expect(screen.getByAltText('Arrow')).toBeInTheDocument();
  expect(screen.getByAltText('hat')).toBeInTheDocument();
});
