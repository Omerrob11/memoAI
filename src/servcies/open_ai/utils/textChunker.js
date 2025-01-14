export const CHUNKING_CONFIG = {
  MAX_TOKENS_PER_CHUNK: 4000, // Conservative limit for GPT-3.5
  //   we repeat around 1000tokens worth of text from the end of the prveious chunk at the start of the next chunk to maintain context
  OVERLAP_SIZE: 1000, // Number of tokens to overlap
  MIN_CHUNK_SIZE: 1000, // Minimum chunk size to process

  //   each chunk is maximum 12000 tokens, so we have a procesing power of 600000 tokens, which is roughly a 500 page book
  MAX_CHUNKS: 50, // Safety limit for very large texts
};

export function estimateTokens(text) {
  const avgCharsPerToken = 3;
  return Math.ceil(text.length / avgCharsPerToken);
}

// input- a long text - content of a pdf file.
// output: array of strings, where each string is a chunk - meaning, array of chunks
// For example: ["chunk1", "chunk2", "chunk3"]

export function splitIntoChunks(text) {
  const tokens = estimateTokens(text);
  if (tokens <= CHUNKING_CONFIG.MAX_TOKENS_PER_CHUNK) {
    return [text];
  }
  //   const means we can't let the variable be something else.
  // but we can add to the array stuff, its still the same thing!

  //   the main idea is kinda simple - now, lets put it into chunks
  // so we need to get the text length, and understand how much characther we should have in one chunk.
  // so get the text length, understand how much charcthes in a text base, and divide it by the chars per chunk to understand how many chuns
  const chunks = [];
  let currentPosition = 0;
  const textLength = text.length;

  const charsPerChunk = CHUNKING_CONFIG.MAX_TOKENS_PER_CHUNK * 3;
  const overlapSize = CHUNKING_CONFIG.OVERLAP_SIZE * 3; // Convert overlap tokens to chars

  while (currentPosition < textLength) {
    const chunkEnd = Math.min(currentPosition + charsPerChunk, textLength);
    const chunk = text.slice(currentPosition, chunkEnd);

    const chunkTokens = estimateTokens(chunk);

    if (chunkTokens < CHUNKING_CONFIG.MIN_CHUNK_SIZE && chunk.length > 0) {
      const previousChunk = chunks.pop;
      chunks, push(previousChunk + chunk);
    } else {
      chunks.push(chunk);
    }

    // have overlap size
    // which is around 3000 characters, around 1000 tokens
    // this line cause memory allocation issue
    // needs to fix it
    currentPosition = chunkEnd - overlapSize;
    // Prevent infinite loop by ensuring we move forward

    // currentPosition = chunkEnd - (chunks.length > 0 ? overlapSize : 0);

    // Safety check to prevent potential infinite loop
  }

  return chunks;
}

// Some info:

// optimizing costs:
/*


We have several options to optimize costs:

Use GPT-4 with its larger context window (fewer chunks needed)
Implement more aggressive summarization before generating questions
Add user limits based on document size



*/

// Test our chunking logic
const sampleText = `
Section 1: This is the beginning of our test. We're testing the chunking and overlap functionality.
${".".repeat(8000)}
Section 2: This is the middle section. This should demonstrate our overlap working.
${".".repeat(8000)}
Section 3: This is the final section. We should see how the chunks maintain context.`;

// Test the chunking
const chunks = splitIntoChunks(sampleText);

// Log results
console.log("Number of chunks:", chunks.length);
chunks.forEach((chunk, index) => {
  console.log(`\nChunk ${index + 1}:`);
  console.log("Start:", chunk.slice(0, 50));
  console.log("End:", chunk.slice(-50));
  console.log("Tokens:", estimateTokens(chunk));
});
