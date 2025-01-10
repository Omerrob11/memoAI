import openai from "../openai";

async function generateQuestions(extractedText) {
  const formatPrompt = "this is some dummy prompt";
}

async function generateSummary(extractedText) {
  try {
    // main method to interact with gpt models
    const completion = await openai.chat.completions({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a highly skilled summarizer. Create clear concise summaries that capture the main points of the text. Understand the text main language by figure out which language most of the words in the text are, and generate that summary in that language.",
        },
        {
          role: "user",
          content: `please provide a concise summary of the following text: ${extractedText} `,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error genrating summary:", error);
    throw error;
  }
}

async function generateQuestions(extractedText) {}

export { generateQuestions };
