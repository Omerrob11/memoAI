import fs from "fs/promises";
import pdf from "pdf-parse";
import helpers from "../generate_questions/helpers.js";
const { generateSummary } = helpers;

export async function testSummary() {
  try {
    // buffer: Container for raw binary data
    // when read files, non text files like pdf or image, we need to read them as buffer first
    // reading the raw bytes before interpting them
    const buffer = await fs.readFile("./shoa-2.pdf");

    const data = await pdf(buffer);

    const text = data.text;
    const summary = await generateSummary(text);

    console.log(summary);
  } catch (error) {
    console.error("Test failed:", error);
  }
}

testSummary();
