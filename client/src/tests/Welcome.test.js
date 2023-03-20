import { render, screen } from '@testing-library/react';
import Welcome from '../components/Welcome';

test('render the Welcome header', () => {
  render(<Welcome />);
  const h1Element = screen.getByText(/Welcome/i);
  expect(h1Element).toBeInTheDocument();
});
