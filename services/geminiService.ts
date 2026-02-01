
import { GoogleGenAI, Type } from "@google/genai";
import { HOSTING_PLANS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getHostingAdvice = async (userDescription: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User needs hosting for: "${userDescription}". 
      Available plans: ${JSON.stringify(HOSTING_PLANS.map(p => ({ id: p.id, name: p.name, description: p.description })))}.
      Recommend the best plan and explain why based on their needs.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            planId: { type: Type.STRING, description: "ID of the recommended plan" },
            reason: { type: Type.STRING, description: "Justification for this choice" },
            suggestedAddons: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Recommended extra services like SSL, CDN, or Backups"
            },
            estimatedTrafficCapacity: { type: Type.STRING, description: "Approximate monthly visitors it can handle" }
          },
          required: ["planId", "reason", "suggestedAddons", "estimatedTrafficCapacity"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Advisor Error:", error);
    return null;
  }
};
