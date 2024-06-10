import React from 'react';
import { render, screen } from '@testing-library/react';
import MainPage from '../components/MainPage/MainPage.js';

describe('MainPage Component', () => {
  test('it match snapshot', () => {
    const {toJSON} = render(<MainPage/>)
    expect(toJSON()).toMatchSnapshot();
  })
  test('renders MainPage correctly', () => {
    const {getByTestId} = render(<MainPage />);

    expect(screen.getByText('Welcome to the Quiz App')).toBeInTheDocument();
    expect(screen.getByText('Select a tab from the menu to get started.')).toBeInTheDocument();

    const arrowImage = document.getElementById('Arrow');
    expect(arrowImage).toBeInTheDocument();

    const mainPageDiv = getByTestId('main-page-div');
    expect(mainPageDiv).toBeInTheDocument();
    // expect(mainPageDiv).toHaveStyle(`backgroundImage: url(mockBackground.png)`);
    // expect(mainPageDiv).toHaveStyle('backgroundSize: cover');
    // expect(mainPageDiv).toHaveStyle('backgroundRepeat: no-repeat');
    // expect(mainPageDiv).toHaveStyle('backgroundPosition: center');

    expect(screen.getByTestId('arrow-div')).toBeInTheDocument();
    expect(screen.getByTestId('bottom-fill')).toBeInTheDocument();
  });
});
