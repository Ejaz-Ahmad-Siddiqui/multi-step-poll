import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import Step from './Step';
import Summary from './Summary';
import { selectStep } from '../store/pollSlice';

const PollForm: React.FC = () => {
    const dispatch = useDispatch();
    const { steps, currentStep } = useSelector((state: RootState) => state.poll);
    const [showSummary, setshowSummary] = React.useState(false);

    return (
        <div className="flex flex-col lg:flex-row h-screen">
            <div className="lg:w-1/2 bg-customPurple p-4 flex flex-col items-center">
                <div className='text-3xl self-start'>📖</div>
                <div className="relative flex items-center justify-center h-full lg:h-screen">
                    <div className="fixed left-6 flex flex-col space-y-2 items-center">
                        {steps.map((_, index) => (
                            <button
                                key={index}
                                className={`h-4 w-4 rounded-full border-4 ${index === currentStep && !showSummary ? 'bg-customPurple border-gray-100' : 'bg-gray-100 border-gray-100'}`}
                                onClick={() => { setshowSummary(false); dispatch(selectStep(index)); }}
                            />
                        ))}
                        {steps.length === currentStep + 1 && (
                            <button
                                className={`h-4 w-4 rounded-full border-4 ${showSummary ? 'bg-customPurple border-gray-100' : 'bg-gray-100 border-gray-100'}`}
                                onClick={() => setshowSummary(true)}
                            />
                        )}
                    </div>
                    <div>
                        {!showSummary ? steps.map((step, index) => (
                            index === currentStep && <div key={index} className="mb-4 lg:mb-0 w-full lg:w-96 lg:text-left text-center text-7xl text-white font-bold ml-0">{step.title}</div>
                        )) :
                            <h1 className="mb-4 lg:mb-0 w-full lg:w-96 text-left text-7xl text-white font-bold ml-0">Summary</h1>
                        }
                    </div>
                </div>
            </div>
            <div className="lg:w-1/2 p-4">
                {steps.length !== currentStep && !showSummary ? (
                    <Step step={steps[currentStep]} stepIndex={currentStep} />
                ) : (
                    <Summary />
                )}
            </div>
        </div>

    );
};

export default PollForm;
