
import React from 'react';
import type { ItineraryPlan } from '../types';

interface ItineraryDisplayProps {
  plan: ItineraryPlan;
  destination: string;
}

const IconMap: { [key: string]: React.ReactNode } = {
  food: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.993.883L4 8v9a1 1 0 001 1h10a1 1 0 001-1V8l-.007-.117A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm-2 5v1h4V7h-4z" /></svg>,
  culture: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.528-1.973 6.012 6.012 0 011.912 2.706C16.27 8.573 16.5 9.261 16.5 10c0 .739-.23 1.427-.668 1.973a6.012 6.012 0 01-1.912 2.706C13.488 14.27 13.026 14 12.5 14a1.5 1.5 0 01-1.5-1.5v-.5a2 2 0 00-4 0v.5A1.5 1.5 0 016 14c-.526 0-.988.27-1.332.727a6.012 6.012 0 01-1.912-2.706C3.73 11.427 3.5 10.739 3.5 10c0-.739.23-1.427.668-1.973zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" /></svg>,
  adventure: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>,
  nightlife: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" /></svg>,
  default: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>,
};

const getActivityIcon = (description: string): React.ReactNode => {
    const desc = description.toLowerCase();
    if (desc.includes('eat') || desc.includes('food') || desc.includes('lunch') || desc.includes('dinner') || desc.includes('cafe') || desc.includes('market')) return IconMap.food;
    if (desc.includes('museum') || desc.includes('art') || desc.includes('gallery') || desc.includes('history') || desc.includes('temple') || desc.includes('shrine')) return IconMap.culture;
    if (desc.includes('hike') || desc.includes('park') || desc.includes('view') || desc.includes('nature') || desc.includes('explore') || desc.includes('walk')) return IconMap.adventure;
    if (desc.includes('bar') || desc.includes('club') || desc.includes('night') || desc.includes('music')) return IconMap.nightlife;
    return IconMap.default;
};

export const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ plan, destination }) => {
  return (
    <div className="space-y-8 animate-fade-in">
        <div className="text-center p-6 bg-white rounded-xl shadow-md border border-slate-200">
            <h2 className="text-3xl font-bold text-slate-800">Your 5-Day Adventure in</h2>
            <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">{destination}</h3>
        </div>
      {plan.itinerary.map(day => (
        <div key={day.day} className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 transition-shadow hover:shadow-2xl">
          <div className="p-5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Day {day.day}: {day.title}</h3>
              <span className="text-sm font-semibold bg-white/30 px-3 py-1 rounded-full">{day.dailyBudget}</span>
            </div>
          </div>
          <div className="p-5 space-y-4">
            {day.activities.map((activity, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <p className="font-bold text-indigo-600">{activity.time}</p>
                </div>
                <div className="relative w-full pl-6 border-l-2 border-slate-200">
                   <div className="absolute -left-4 top-0 h-8 w-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-indigo-500">
                    {getActivityIcon(activity.description)}
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="font-semibold text-slate-800">{activity.description}</p>
                    <p className="text-sm text-green-600 font-medium mt-1">{activity.estimatedCost}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
