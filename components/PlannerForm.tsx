
import React, { useState } from 'react';
import { INTEREST_OPTIONS, BUDGET_OPTIONS } from '../constants';
import { InterestTag } from './InterestTag';

interface PlannerFormProps {
  onPlanTrip: (destination: string, budget: string, interests: string[]) => void;
}

export const PlannerForm: React.FC<PlannerFormProps> = ({ onPlanTrip }) => {
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState(BUDGET_OPTIONS[1]);
  const [interests, setInterests] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleInterest = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      setError('Please enter a destination.');
      return;
    }
    if (interests.length === 0) {
      setError('Please select at least one interest.');
      return;
    }
    setError(null);
    setIsSubmitting(true);
    onPlanTrip(destination, budget, interests);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-slate-700 mb-1">
            Where are you dreaming of going?
          </label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g., Tokyo, Japan"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-slate-700 mb-1">
            What's your travel style?
          </label>
          <select
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition bg-white"
          >
            {BUDGET_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            What are your interests?
          </label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map(interest => (
              <InterestTag
                key={interest}
                interest={interest}
                isSelected={interests.includes(interest)}
                onToggle={toggleInterest}
              />
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition transform hover:scale-105"
        >
          {isSubmitting ? 'Generating Your Adventure...' : 'Plan My Trip!'}
        </button>
      </form>
    </div>
  );
};
