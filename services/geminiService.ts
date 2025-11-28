import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateHairstylePreview = async (
  imageBase64: string,
  stylePrompt: string
): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  try {
    const model = 'gemini-2.5-flash-image';
    
    const prompt = `You are a professional hair stylist AI. 
    I will provide an image of a person. 
    Generate a new version of this image showing the person with the following hairstyle: ${stylePrompt}.
    Maintain the person's facial features and identity as much as possible. High quality, realistic texture.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: imageBase64
            }
          },
          {
            text: prompt
          }
        ]
      }
    });

    // Gemini 2.5 flash image returns an image in the parts usually if requested to generate
    // However, since we are doing image-to-image/editing via standard generateContent with a prompt,
    // we need to check if it returned an image or text describing it.
    // Note: The specific "Edit" capability is best achieved by prompting for a new image based on the input.
    
    // Check for inlineData (image) in response
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
        const parts = candidates[0].content.parts;
        for (const part of parts) {
            if (part.inlineData && part.inlineData.data) {
                return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
        }
    }
    
    // Fallback if no image returned (some models might refuse or just return text)
    throw new Error("A IA não retornou uma imagem. Tente novamente ou ajuste a solicitação.");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};