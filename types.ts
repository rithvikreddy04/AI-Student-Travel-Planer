
export interface ItineraryActivity {
  time: string;
  description: string;
  estimatedCost: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: ItineraryActivity[];
  dailyBudget: string;
}

export interface ItineraryPlan {
  destination: string;
  itinerary: ItineraryDay[];
}