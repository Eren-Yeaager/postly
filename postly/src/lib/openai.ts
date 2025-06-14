import { OpenAI } from "openai";
import Configuration from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function generateContent({
  topic,
  platform,
  tone,
  keywords,
  maxLength = 280,
}: {
  topic: string;
  platform: string;
  tone: string;
  keywords?: string[];
  maxLength?: number;
}) {
  maxLength = maxLength ?? 280;
  const prompt = `
    Write a ${tone} social media post for ${platform} about "${topic}".
    ${
      keywords && keywords.length > 0
        ? `Include these keywords: ${keywords.join(", ")}.`
        : ""
    }
    Limit to ${maxLength} characters.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    max_tokens: Math.floor((maxLength * 1.5) / 4), // rough estimate
  });

  return response.choices[0]?.message?.content?.trim() || "";
}
