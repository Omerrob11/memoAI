import { generateQuestions } from "@/servcies/open_ai/generate_questions/helpers.js";

// post and get functions are for route handlers
// which this is what it is
// route.js is handling the http requests and response
export async function POST(req) {
  try {
    const extractedText = await req.json().extractedText;
    const questions = await generateQuestions(extractedText);
  } catch (error) {}
}
