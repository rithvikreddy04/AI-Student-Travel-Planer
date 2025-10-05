
import React, { useState, useCallback } from 'react';
import { PlannerForm } from './components/PlannerForm';
import { ItineraryDisplay } from './components/ItineraryDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { generateItinerary } from './services/geminiService';
import type { ItineraryPlan } from './types';

const App: React.FC = () => {
  const [itinerary, setItinerary] = useState<ItineraryPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(true);

  const handlePlanTrip = useCallback(async (destination: string, budget: string, interests: string[]) => {
    setIsLoading(true);
    setError(null);
    setItinerary(null);
    setShowForm(false);
    try {
      const generatedPlan = await generateItinerary(destination, budget, interests);
      setItinerary(generatedPlan);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleReset = useCallback(() => {
    setItinerary(null);
    setError(null);
    setIsLoading(false);
    setShowForm(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 font-sans">
      <header className="p-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
          AI Student Travel Planner
        </h1>
        <p className="mt-2 text-slate-600">Your next adventure, intelligently planned.</p>
      </header>
      <main className="container mx-auto p-4 md:p-8 max-w-4xl">
        {showForm && (
          <PlannerForm onPlanTrip={handlePlanTrip} />
        )}

        {isLoading && <LoadingSpinner />}
        
        {error && !isLoading && (
          <div className="text-center">
            <ErrorMessage message={error} />
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition"
            >
              Start Over
            </button>
          </div>
        )}
        
        {itinerary && !isLoading && !error && (
          <div>
            <ItineraryDisplay plan={itinerary} destination={itinerary.destination} />
            <div className="text-center mt-8">
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition transform hover:scale-105"
              >
                Plan Another Trip
              </button>
            </div>
          </div>
        )}
      </main>
      <footer className="text-center p-4 text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} AI Student Travel Planner. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
