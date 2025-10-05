
import React from 'react';

interface InterestTagProps {
  interest: string;
  isSelected: boolean;
  onToggle: (interest: string) => void;
}

export const InterestTag: React.FC<InterestTagProps> = ({ interest, isSelected, onToggle }) => {
  const baseClasses = "px-3 py-1.5 text-sm font-medium rounded-full cursor-pointer transition-all duration-200 ease-in-out";
  const selectedClasses = "bg-indigo-600 text-white shadow-md";
  const unselectedClasses = "bg-slate-100 text-slate-700 hover:bg-slate-200";

  return (
    <button
      type="button"
      onClick={() => onToggle(interest)}
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
    >
      {interest}
    </button>
  );
};
