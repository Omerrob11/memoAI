const CHUNKING_CONFIG = {
  MAX_TOKENS_PER_CHUNK: 12000, // Conservative limit for GPT-3.5
  OVERLAP_SIZE: 1000, // Number of tokens to overlap
  MIN_CHUNK_SIZE: 1000, // Minimum chunk size to process
  MAX_CHUNKS: 50, // Safety limit for very large texts
};

function estimateTokens(text) {
  const avgCharsPerToken = 3;
  return Math.ceil(text.length / avgCharsPerToken);
}
