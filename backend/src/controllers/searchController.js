const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
// const { docClient } = require('../config/db'); // Not needed for MongoDB
const { generateRelatedQueries } = require('../services/llmService');
const { extractContent } = require('../services/scraperService');

// Bing Web Search API configuration
const BING_API_KEY = process.env.BING_SEARCH_API_KEY;
const BING_ENDPOINT = 'https://api.bing.microsoft.com/v7.0/search';

/**
 * Search the web using Bing Web Search API
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const search = async (req, res, next) => {
  try {
    const { q: query, limit = 10, offset = 0 } = req.query;

    // Call Bing Web Search API
    const response = await axios.get(BING_ENDPOINT, {
      headers: {
        'Ocp-Apim-Subscription-Key': BING_API_KEY,
      },
      params: {
        q: query,
        count: limit,
        offset,
        mkt: 'en-US',
        safeSearch: 'Moderate',
      },
    });

    // Format results
    const results = response.data.webPages?.value?.map((item) => ({
      id: uuidv4(),
      title: item.name,
      url: item.url,
      snippet: item.snippet,
      displayUrl: item.displayUrl,
      dateLastCrawled: item.dateLastCrawled,
    })) || [];

    // Generate related queries using LLM
    const relatedQueries = await generateRelatedQueries(query, 3);

    res.json({
      query,
      totalEstimatedMatches: response.data.webPages?.totalEstimatedMatches || 0,
      results,
      relatedQueries,
    });
  } catch (error) {
    console.error('Search error:', error.message);
    next(new Error('Failed to perform search'));
  }
};

/**
 * Get related search queries using LLM
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getRelatedQueries = async (req, res, next) => {
  try {
    const { query, count = 3 } = req.body;
    const relatedQueries = await generateRelatedQueries(query, count);
    res.json({ relatedQueries });
  } catch (error) {
    console.error('Related queries error:', error.message);
    next(new Error('Failed to generate related queries'));
  }
};

/**
 * Process search results with LLM
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const processResults = async (req, res, next) => {
  try {
    const { query, results } = req.body;
    
    // Process each result to extract content and generate summaries
    const processedResults = await Promise.all(
      results.map(async (result) => {
        try {
          // Extract content from the URL
          const { content, title } = await extractContent(result.url);
          
          // Generate a summary using LLM (simplified for this example)
          // In a real implementation, you would call your LLM service here
          const summary = `Summary for ${title || result.title} based on the extracted content.`;
          
          return {
            ...result,
            content,
            summary,
            processedAt: new Date().toISOString(),
          };
        } catch (error) {
          console.error(`Error processing ${result.url}:`, error.message);
          return {
            ...result,
            error: 'Failed to process this result',
          };
        }
      })
    );

    res.json({
      query,
      processedAt: new Date().toISOString(),
      results: processedResults,
    });
  } catch (error) {
    console.error('Process results error:', error.message);
    next(new Error('Failed to process search results'));
  }
};

module.exports = {
  search,
  getRelatedQueries,
  processResults,
};
