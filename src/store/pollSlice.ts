import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Option {
    id: string;
    label: string;
    icon: string;
}

export interface Step {
    title: string;
    options: Option[];
    selectedOption?: string;
}

interface PollState {
    steps: Step[];
    currentStep: number;
}

const initialState: PollState = {
    steps: [
        { title: "How was your week overall?", options: [{ id: "1", label: "Good", icon: "👍" }, { id: "2", label: "Neutral", icon: "🤔" }, { id: "3", label: "Bad", icon: "👎" }] },
        { title: "How satisfied are you with our service?", options: [{ id: "4", label: "Very Satisfied", icon: "😃" }, { id: "5", label: "Neutral", icon: "😐" }, { id: "6", label: "Dissatisfied", icon: "😞" }] },
        { title: "How often do you use our product?", options: [{ id: "7", label: "Frequently", icon: "🕐" }, { id: "8", label: "Occasionally", icon: "⏳" }, { id: "9", label: "Rarely", icon: "🚫" }] },
        { title: "How do you rate our product's design?", options: [{ id: "10", label: "Excellent", icon: "🌟" }, { id: "11", label: "Average", icon: "🤔" }, { id: "12", label: "Poor", icon: "❎" }] },
    ],
    currentStep: 0,
};

const pollSlice = createSlice({
    name: 'poll',
    initialState,
    reducers: {
        selectOption(state, action: PayloadAction<{ stepIndex: number; optionId: string }>) {
            const { stepIndex, optionId } = action.payload;
            state.steps[stepIndex].selectedOption = optionId;
        },
        selectStep(state, action: PayloadAction<number>) {
            state.currentStep = action.payload;
        },
        nextStep(state) {
            if (state.currentStep < state.steps.length) {
                state.currentStep += 1;
            }
        },
        prevStep(state) {
            if (state.currentStep > 0) {
                state.currentStep -= 1;
            }
        },
    },
});

export const { selectOption, selectStep, nextStep, prevStep } = pollSlice.actions;
export default pollSlice.reducer;
