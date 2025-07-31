import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const useGemini = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const apiKey = import.meta.env.VITE_GEMINIS_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINY_API_KEY environment variable is not set.");
  }
  const genAI = new GoogleGenerativeAI(apiKey);

  const generateContent = async (input: string) => {
    setLoading(true);
    setResponse(null);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // o gemini-1.5-pro
      const result = await model.generateContent([
        `Generate 20 creative app names for: ${input}`,
      ]);
      const text = result.response.text();
      if (!text) {
        setResponse("No response received from the model.");
        return;
      }
      setResponse(text);
    } catch (error) {
      console.error("An error occurred while generating the response: ", error);
      setResponse("An error occurred while generating the response.");
    } finally {
      setLoading(false);
    }
  };
  return { loading, response, generateContent };
};
