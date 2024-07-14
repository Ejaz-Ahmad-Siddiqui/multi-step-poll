import React from 'react';
import { useDispatch } from 'react-redux';
import { Step as StepType } from '../store/pollSlice';
import Option from './Option';
import { selectOption } from '../store/pollSlice';

interface StepProps {
    step: StepType;
    stepIndex: number;
}

const Step: React.FC<StepProps> = ({ step, stepIndex }) => {
    const dispatch = useDispatch();

    const handleSelectOption = (optionId: string) => {
        dispatch(selectOption({ stepIndex, optionId }));
    };

    return (
        <div className="step flex items-center justify-center h-screen">
            <div className="options flex flex-wrap justify-center">
                {step.options.map(option => (
                    <Option key={option.id} option={option} selectedOption={step.selectedOption} onSelect={() => handleSelectOption(option.id)} />
                ))}
            </div>
        </div>
    );
};

export default Step;
