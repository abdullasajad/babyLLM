const OpenAI = require('openai');
const axios = require('axios');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate related search queries using LLM
 * @param {string} query - The original search query
 * @param {number} count - Number of related queries to generate (default: 3)
 * @returns {Promise<string[]>} - Array of related queries
 */
const generateRelatedQueries = async (query, count = 3) => {
  try {
    const prompt = `Generate ${count} related search queries for: "${query}"
    Respond with a JSON array of strings, nothing else.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful search assistant.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    // Parse the response
    const content = response.choices[0].message.content;
    const relatedQueries = JSON.parse(content);
    
    // Ensure we return an array of strings
    return Array.isArray(relatedQueries) 
      ? relatedQueries.slice(0, count)
      : [];
  } catch (error) {
    console.error('Error generating related queries:', error.message);
    // Fallback to a simple approach if LLM call fails
    return [
      `${query} examples`,
      `best ${query}`,
      `how to ${query}`,
    ].slice(0, count);
  }
};

/**
 * Generate a summary of the given text using LLM
 * @param {string} text - The text to summarize
 * @param {number} maxLength - Maximum length of the summary (default: 3 sentences)
 * @returns {Promise<string>} - Generated summary
 */
const generateSummary = async (text, maxLength = 3) => {
  try {
    const prompt = `Summarize the following text in ${maxLength} sentences or less:\n\n${text}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that summarizes text concisely.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 200,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating summary:', error.message);
    // Fallback to a simple truncation
    return text.split('. ').slice(0, maxLength).join('. ') + '.';
  }
};

/**
 * Rank search results based on relevance to the query
 * @param {string} query - The search query
 * @param {Array} results - Array of search results
 * @returns {Promise<Array>} - Ranked search results
 */
const rankSearchResults = async (query, results) => {
  try {
    const prompt = `Rank the following search results by relevance to the query "${query}". 
    Return only a JSON array of the result IDs in order of relevance, most relevant first.
    
    Search Results:
    ${results.map((r, i) => `${i + 1}. [${r.id}] ${r.title}`).join('\n')}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a search relevance expert.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    // Parse the ranked IDs from the response
    const content = response.choices[0].message.content;
    const rankedIds = JSON.parse(content);
    
    // Create a map of ID to result for quick lookup
    const resultMap = new Map(results.map(r => [r.id, r]));
    
    // Return results in the ranked order
    return rankedIds
      .map(id => resultMap.get(id))
      .filter(Boolean);
  } catch (error) {
    console.error('Error ranking search results:', error.message);
    // Return original results if ranking fails
    return results;
  }
};

/**
 * Answer a question based on the provided context
 * @param {string} question - The user's question
 * @param {string} context - The context to base the answer on
 * @returns {Promise<string>} - The generated answer
 */
const answerQuestion = async (question, context) => {
  try {
    const prompt = `Context: ${context}\n\nQuestion: ${question}\nAnswer:`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that answers questions based on the provided context. If the context does not contain enough information to answer the question, say "I don\'t have enough information to answer that question."' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating answer:', error.message);
    return 'I encountered an error while trying to generate an answer. Please try again later.';
  }
};

module.exports = {
  generateRelatedQueries,
  generateSummary,
  rankSearchResults,
  answerQuestion,
};
