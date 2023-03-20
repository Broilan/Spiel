import { render, screen } from '@testing-library/react';
import App from '../App';

test('render the Welcome header', () => {
  render(<App />);
  const h1Element = screen.getByText(/MERN Authentication/i);
  expect(h1Element).toBeInTheDocument();
});
