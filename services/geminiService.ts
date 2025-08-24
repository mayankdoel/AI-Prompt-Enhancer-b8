import { GoogleGenAI, Type } from "@google/genai"

const API_KEY = "AIzaSyCVyP8Zb5-XBpZOWDQeX3Y8pTVqPlcDKvk"

if (!API_KEY) {
  throw new Error("API_KEY not configured")
}

const ai = new GoogleGenAI({ apiKey: API_KEY })

const model = "gemini-2.5-flash"

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: "The title of the prompt section." },
      content: { type: Type.STRING, description: "The detailed content for the prompt section." },
    },
    required: ["title", "content"],
  },
}

const commonConfig = {
  thinkingConfig: { thinkingBudget: 0 },
  responseMimeType: "application/json",
  responseSchema: responseSchema,
}

export const enhanceTextPrompt = async (prompt: string): Promise<string> => {
  const fullPrompt = `You are a world-class expert prompt engineer for generative AI.
  Your task is to take a user's basic prompt and transform it into a highly detailed, structured, and professional prompt that is optimized for large language models.

  The output MUST be a JSON object that adheres to the provided schema.
  The JSON object should be an array of sections. Each section object must have a "title" and a "content" property.
  Generate sections with the following titles, in this order: "Role", "Task", "Context", "Reasoning", "Output Format", and "Constraints".

  - **Role**: Define the persona the AI should adopt.
  - **Task**: Clearly state the primary objective and what the AI needs to accomplish.
  - **Context**: Provide necessary background, details, and scope.
  - **Reasoning**: Explain why this detailed prompt is effective. Describe how the specific choices in Role, Task, Context, etc., will lead to a superior AI-generated result.
  - **Output Format**: Specify the structure of the desired output (e.g., Markdown, JSON, bullet points).
  - **Constraints**: List any limitations, rules, or things to avoid (e.g., tone, length, what not to include).

  Correct any spelling or grammar mistakes from the user's input and incorporate it into the structured prompt.
  The content for each section should be detailed and comprehensive.

  User's Prompt: "${prompt}"`

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
      config: commonConfig,
    })
    return response.text
  } catch (error) {
    console.error("Error enhancing text prompt:", error)
    throw new Error("Failed to communicate with the AI service for text enhancement.")
  }
}

export const generatePromptFromImage = async (
  prompt: string,
  imageBase64: string,
  mimeType: string,
): Promise<string> => {
  const imagePart = {
    inlineData: {
      data: imageBase64,
      mimeType,
    },
  }

  const textPart = {
    text: `You are an expert AI assistant specializing in image analysis for prompt generation.
    Your task is to analyze the provided image and generate a highly detailed, structured, and professional prompt that could be used to recreate a similar image.
    If the user has provided optional instructions, incorporate them as the primary directive.

    The output MUST be a JSON object that adheres to the provided schema.
    The JSON object should be an array of sections. Each section object must have a "title" and a "content" property.
    Generate sections with relevant titles for image generation, such as: "Subject", "Style", "Composition", "Lighting", "Color Palette", "Reasoning", and "Negative Prompt".

    - **Reasoning**: Explain why the generated prompt is effective for creating the desired image, referencing specific keywords or compositional elements.

    User's optional instructions: "${prompt || "None"}"`,
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [imagePart, textPart] },
      config: commonConfig,
    })
    return response.text
  } catch (error) {
    console.error("Error generating prompt from image:", error)
    throw new Error("Failed to communicate with the AI service for image analysis.")
  }
}
