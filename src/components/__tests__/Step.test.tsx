import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import pollReducer, { Step as StepType } from '../../store/pollSlice';
import Step from '../Step';

const renderWithRedux = (component: React.ReactNode, { initialState } = { initialState: {} }) => {
    const store = configureStore({ reducer: { poll: pollReducer }, preloadedState: initialState });
    return render(<Provider store={store}>{component}</Provider>);
};

const mockStep: StepType = {
    title: 'Mock Step',
    options: [{ id: '1', label: 'Option 1', icon: '🌟' }],
    selectedOption: '',
};

test('renders Step component', () => {
    renderWithRedux(<Step step={mockStep} stepIndex={0} />);
    expect(screen.getByText('🌟')).toBeInTheDocument();
});
