import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

describe('Navbar Component', () => {
  test('clicking on the menu toggle button toggles the menu', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Znajdź przycisk służący do przełączania menu
    const menuToggle = screen.getByText('☰');
    expect(menuToggle).toBeInTheDocument();

    // Sprawdź, czy menu jest początkowo zamknięte
    expect(screen.getByRole('navigation', { hidden: true })).toBeInTheDocument();

    // Kliknij przycisk, aby otworzyć menu
    userEvent.click(menuToggle);

    // Sprawdź, czy menu jest teraz otwarte na podstawie zmian w klasach CSS
    expect(screen.getByRole('navigation', { hidden: true })).not.toBeInTheDocument();
    expect(screen.getByRole('navigation', { className: 'open' })).toBeInTheDocument();

    // Kliknij przycisk, aby zamknąć menu
    userEvent.click(menuToggle);

    // Sprawdź, czy menu jest teraz zamknięte na podstawie zmian w klasach CSS
    expect(screen.getByRole('navigation', { hidden: true })).toBeInTheDocument();
    expect(screen.queryByRole('navigation', { className: 'open' })).not.toBeInTheDocument();
  });
});
