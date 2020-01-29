import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('renders all buttons correctly', () => {
  const { getByText } = render(<App />);
  const playButton = getByText(/play/i);
  expect(playButton).toBeInTheDocument();

  const nextStepButton = getByText(/next step/i);
  expect(nextStepButton).toBeInTheDocument();

  const randomButton = getByText(/random/i);
  expect(randomButton).toBeInTheDocument();

  const clearButton = getByText(/clear/i);
  expect(clearButton).toBeInTheDocument();
});

test('should change button text to pause on play button click', () => {
  const { getByText } = render(<App />);
  fireEvent.click(getByText('play'));
  expect(getByText(/pause/)).toBeInTheDocument();
});


