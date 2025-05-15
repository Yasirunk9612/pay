import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome heading', () => {
  render(<App />);
  const heading = screen.getByText(/welcome to my shop/i);
  expect(heading).toBeInTheDocument();
});
