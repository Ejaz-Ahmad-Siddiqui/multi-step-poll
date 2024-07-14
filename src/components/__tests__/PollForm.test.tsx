import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import pollReducer from '../../store/pollSlice';
import PollForm from '../PollForm';

const renderWithRedux = (component: React.ReactNode, { initialState } = { initialState: {} }) => {
    const store = configureStore({ reducer: { poll: pollReducer }, preloadedState: initialState });
    return render(<Provider store={store}>{component}</Provider>);
};

test('renders PollForm component', () => {
    renderWithRedux(<PollForm />);
    expect(screen.getByText('📖')).toBeInTheDocument();
});

test('displays steps and summary', () => {
    renderWithRedux(<PollForm />);
    const steps = screen.getAllByRole('button');
    expect(steps.length).toBeGreaterThan(0);
});
