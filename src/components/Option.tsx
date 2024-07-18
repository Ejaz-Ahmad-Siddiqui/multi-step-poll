import React from 'react';

interface OptionProps {
    option: { id: string; label: string; icon: string };
    onSelect: () => void;
    selectedOption?: string;
}
// options
const Option: React.FC<OptionProps> = ({ option, onSelect, selectedOption }) => {
    return (
        <div className="group flex flex-col items-center cursor-pointer m-8 " onClick={onSelect}>
            <span className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{option.label}</span>
            <span className={`mb-2 ${selectedOption === option.id ? "opacity-100" : "opacity-0"} transition-opacity duration-300 text-customPurple text-2xl `}>{option.label}</span>
            <div className={`w-16 h-16 ${selectedOption === option.id ? 'bg-customPurple' : ''} rounded-full flex items-center justify-center`}>
                <div className="text-4xl dance-animation">{option.icon}</div>
            </div>
        </div>
    );
};

export default Option;
