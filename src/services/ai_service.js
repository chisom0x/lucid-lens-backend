import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

dotenv.config();

class DreamInterpreter {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async interpretDream(text) {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `
      You are an expert dream interpreter. Analyze the given dream description and provide a detailed interpretation along with practical advice.
      
      ONLY return a JSON response, structured strictly as:
      {
        "interpretation": "<detailed interpretation and advice>"
      }

      Dream Description:
      ${JSON.stringify(text)}

      Do NOT include any explanations, introductions, or extra text—ONLY return the JSON.
    `;

    try {
      const response = await model.generateContent([prompt]);
      let responseText = response?.response?.text()?.trim();
      if (!responseText) throw new Error('No response from AI');

      // Attempt to extract a valid JSON object
      const jsonMatch = responseText.match(/\{(?:[^{}]|{[^{}]*})*\}/s);
      if (!jsonMatch) throw new Error('Invalid JSON format received');

      // Clean up the response to remove unwanted characters
      const cleanedJson = jsonMatch[0]
        .replace(/\n/g, ' ') // Remove newlines
        .replace(/\t/g, ' ') // Remove tabs
        .replace(/\s{2,}/g, ' ') // Collapse multiple spaces

      return JSON.parse(cleanedJson);
    } catch (error) {
      console.error('Error generating dream interpretation:', error);
      return { interpretation: 'Unable to interpret the dream at this moment. Please try again.' };
    }
  }
}

const dreamInterpreter = new DreamInterpreter(process.env.GEMINI_API_KEY);
export default dreamInterpreter;
