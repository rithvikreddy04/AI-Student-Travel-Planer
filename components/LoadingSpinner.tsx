
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-16 h-16 border-4 border-t-4 border-t-indigo-600 border-slate-200 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-slate-700">Crafting your perfect student trip...</p>
      <p className="text-slate-500">This might take a moment.</p>
    </div>
  );
};
