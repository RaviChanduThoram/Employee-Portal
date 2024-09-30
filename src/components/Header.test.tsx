import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header'; // Adjust the path as necessary

describe('Header Component', () => {
  it('renders the header with the correct title', () => {
    const mockOnToggle = jest.fn(); // Mock function for the onToggle prop
    render(<Header onToggle={mockOnToggle} drawerOpen={false} />);

    const titleElement = screen.getByText(/SMR Bank Employee Portal/i);
    expect(titleElement).toBeInTheDocument();
  });
})