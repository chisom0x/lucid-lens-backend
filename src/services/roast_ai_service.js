import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

dotenv.config();

class RoastMeService {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async roastImage(imageBuffer) {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are an expert in savage and witty roasts. 
      Analyze the provided image and craft a brutal but humorous roast. 
      The roast should be exactly 100 words long, entertaining, and sharp.
      
      ONLY return a JSON response, structured strictly as:
      {
        "roast": "<100-word humorous and savage roast>"
      }

      Do NOT include any explanations, introductions, or extra text—ONLY return the JSON.
    `;

    try {
      const response = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: imageBuffer.toString('base64'),
            mimeType: 'image/jpeg',
          },
        },
      ]);

      let responseText = response?.response?.text()?.trim();
      if (!responseText) throw new Error('No response from AI');

      const jsonMatch = responseText.match(/\{(?:[^{}]|{[^{}]*})*\}/s);
      if (!jsonMatch) throw new Error('Invalid JSON format received');

      const cleanedJson = jsonMatch[0]
        .replace(/\n/g, ' ')
        .replace(/\t/g, ' ')
        .replace(/\s{2,}/g, ' ');

      return JSON.parse(cleanedJson);
    } catch (error) {
      console.error('Error generating roast:', error);
      return {
        roast:
          'I can’t roast you right now, but trust me, you got lucky this time!',
      };
    }
  }
}

const roastMeService = new RoastMeService(process.env.GEMINI_API_KEY);
export default roastMeService;
