import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

export const generateStatement = async (prompt: string) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating statement:', error);
    throw error;
  }
}; 