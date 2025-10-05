
import { GoogleGenAI, Type } from "@google/genai";
import type { ItineraryPlan } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    destination: {
      type: Type.STRING,
      description: "The destination city and country, e.g., 'Tokyo, Japan'."
    },
    itinerary: {
      type: Type.ARRAY,
      description: "An array of daily itinerary plans.",
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER, description: "The day number of the trip, starting from 1." },
          title: { type: Type.STRING, description: "A catchy and descriptive title for the day's theme." },
          activities: {
            type: Type.ARRAY,
            description: "A list of activities planned for the day.",
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING, description: "Suggested time for the activity, e.g., '9:00 AM' or 'Afternoon'." },
                description: { type: Type.STRING, description: "A detailed, engaging description of the activity, including location and student-friendly tips." },
                estimatedCost: { type: Type.STRING, description: "Estimated cost for a student, e.g., '~$15' or 'Free'." }
              },
              required: ["time", "description", "estimatedCost"]
            }
          },
          dailyBudget: { type: Type.STRING, description: "An estimated total budget for the day's activities for a student." }
        },
        required: ["day", "title", "activities", "dailyBudget"]
      }
    }
  },
  required: ["destination", "itinerary"]
};

export const generateItinerary = async (
  destination: string,
  budget: string,
  interests: string[]
): Promise<ItineraryPlan> => {
  const prompt = `
    You are an expert travel planner specializing in creating exciting, budget-friendly itineraries for students.
    A student wants to plan a 5-day trip. Please generate a detailed 5-day itinerary based on the following details:

    Destination: ${destination}
    Budget Level: ${budget}
    Interests: ${interests.join(', ')}

    Your response must be a JSON object that strictly adheres to the provided schema.
    For each activity, provide a fun, engaging description that would appeal to a student traveler.
    Include practical tips like cheap eats, free walking tours, student discounts, or best photo spots.
    Ensure the costs and suggestions are realistic for the specified student budget level.
    The daily title should be creative and reflect the day's main focus.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });
    
    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);

    // Basic validation to ensure the parsed object matches the expected structure
    if (parsedJson && Array.isArray(parsedJson.itinerary)) {
      return parsedJson as ItineraryPlan;
    } else {
      throw new Error("AI response did not match the expected format.");
    }

  } catch (error) {
    console.error("Error generating itinerary with Gemini API:", error);
    throw new Error("Failed to generate itinerary. The AI model may be temporarily unavailable. Please try again later.");
  }
};
