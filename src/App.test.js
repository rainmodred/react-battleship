import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders battleship', () => {
  const { getByText } = render(<App />);
  const header = getByText(/Battleship/i);
  expect(header).toBeInTheDocument();
});
