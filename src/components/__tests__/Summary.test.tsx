import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import pollReducer, { Step as StepType } from '../../store/pollSlice';
import Summary from '../Summary';
import { submitPollData } from '../../api/mockApi';

jest.mock('../../api/mockApi');

const renderWithRedux = (component: React.ReactNode, { initialState } = { initialState: {} }) => {
    const store = configureStore({ reducer: { poll: pollReducer }, preloadedState: initialState });
    return render(<Provider store={store}>{component}</Provider>);
};

const mockSteps: StepType[] = [
    { title: 'Step 1', options: [{ id: '1', label: 'Option 1', icon: '🌟' }], selectedOption: '1' },
    { title: 'Step 2', options: [{ id: '2', label: 'Option 2', icon: '🌟' }], selectedOption: '' },
];

test('renders Summary component', () => {
    renderWithRedux(<Summary />, { initialState: { poll: { steps: mockSteps } } });
    expect(screen.getByText('Step 1:')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
});

test('calls submitPollData when submit button is clicked', async () => {
    (submitPollData as jest.Mock).mockResolvedValue({ data: 'Mock response' });
    renderWithRedux(<Summary />, { initialState: { poll: { steps: mockSteps } } });
    fireEvent.click(screen.getByText('Submit'));
    expect(submitPollData).toHaveBeenCalledWith(mockSteps);
});
