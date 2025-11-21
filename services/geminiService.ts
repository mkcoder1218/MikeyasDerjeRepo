import { GoogleGenAI } from "@google/genai";
import { PROJECTS, EXPERIENCE, SKILLS } from "../data";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are a helpful, professional AI assistant for Mikeyas Derje's portfolio website. 
Mikeyas is a Full-Stack React/Next.js Engineer from Ethiopia.

Data:
Projects: ${JSON.stringify(PROJECTS.map(p => `${p.title}: ${p.description}`))}.
Skills: ${JSON.stringify(SKILLS)}.
Experience: ${JSON.stringify(EXPERIENCE)}.

Guidelines:
- Be helpful, concise, and professional.
- Do not pretend to be a robot from the future. Use natural language.
- Answer questions about his tech stack, projects, and experience.
- Language: Respond in the same language as the user's question (English or Amharic).
- Keep responses brief (1-3 sentences) unless asked for elaboration.
`;

export const chatWithGemini = async (message: string, history: {role: string, parts: {text: string}[]}[] = []) => {
  if (!apiKey) {
    return "API key missing. Chat unavailable.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I couldn't reach the server right now.";
  }
};