import { render, screen, fireEvent } from '@testing-library/react';
import Option from '../Option';

const mockOption = { id: "1", label: "Good", icon: "👍" };

test('renders Option component', () => {
    render(<Option option={mockOption} onSelect={() => { }} />);
    expect(screen.getByText('👍')).toBeInTheDocument();
});

