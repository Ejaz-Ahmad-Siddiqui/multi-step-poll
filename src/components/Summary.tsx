import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { submitPollData } from '../api/mockApi';

const Summary: React.FC = () => {
    const { steps } = useSelector((state: RootState) => state.poll);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [successMessage, setSuccessMessage] = React.useState<string>('');

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await submitPollData(steps);
            console.log('Data submitted:', response.data);
            setSuccessMessage('Data submitted successfully!');
        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="summary">
            <h4 className="mb-4 lg:mb-8 w-full lg:w-96 text-left text-4xl text-customPurple font-bold ml-0">Summary</h4>

            <ul>
                {steps.map((step, index) => (
                    <li key={index}>
                        <span className='text-customPurple text-xl'>{step.title}:</span>
                        <br />
                        <span className='font-italic'>{step.options.find(option => option.id === step.selectedOption)?.label || 'No option selected'}</span>
                    </li>
                ))}
            </ul>

            {successMessage && (
                <div className="mt-4 text-green-500 font-bold">
                    {successMessage}
                </div>
            )}
            <button onClick={handleSubmit} disabled={loading} className="bg-customPurple text-white w-80 font-bold py-2 px-4 rounded-full disabled:bg-slate-400 mt-6">
                {loading ? 'Loading...' : 'Submit'}
            </button>


        </div>
    );
};

export default Summary;
