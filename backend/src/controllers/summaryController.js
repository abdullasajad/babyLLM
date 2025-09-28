const { extractContent } = require('../services/scraperService');
const { generateSummary, answerQuestion } = require('../services/llmService');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * @desc    Generate summary for a webpage
 * @route   POST /api/summary/webpage
 * @access  Public
 */
const generateWebpageSummary = asyncHandler(async (req, res) => {
  const { url, maxLength = 5 } = req.body;

  try {
    // Extract content from the webpage
    const { title, text, content } = await extractContent(url);
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Unable to extract meaningful content from the webpage',
      });
    }

    // Generate summary using LLM
    const summary = await generateSummary(text, maxLength);

    res.json({
      success: true,
      data: {
        url,
        title,
        summary,
        originalLength: text.length,
        processedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Webpage summary error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to generate webpage summary',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

/**
 * @desc    Generate general summary from multiple sources
 * @route   POST /api/summary/general
 * @access  Public
 */
const generateGeneralSummary = asyncHandler(async (req, res) => {
  const { query, sources } = req.body;

  try {
    // Combine all source content
    const combinedContent = sources
      .map((source, index) => `Source ${index + 1} (${source.title}):\n${source.content}`)
      .join('\n\n');

    // Generate comprehensive summary
    const prompt = `Based on the following sources, provide a comprehensive 3-paragraph summary about "${query}":\n\n${combinedContent}`;
    const generalSummary = await generateSummary(prompt, 3);

    // Generate individual summaries for each source
    const sourceSummaries = await Promise.all(
      sources.map(async (source, index) => {
        try {
          const sourceSummary = await generateSummary(source.content, 2);
          return {
            index,
            title: source.title,
            url: source.url,
            summary: sourceSummary,
          };
        } catch (error) {
          console.error(`Error summarizing source ${index}:`, error.message);
          return {
            index,
            title: source.title,
            url: source.url,
            summary: 'Unable to generate summary for this source.',
            error: true,
          };
        }
      })
    );

    res.json({
      success: true,
      data: {
        query,
        generalSummary,
        sourceSummaries,
        totalSources: sources.length,
        processedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('General summary error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to generate general summary',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

/**
 * @desc    Answer follow-up questions based on context
 * @route   POST /api/summary/chat
 * @access  Public
 */
const answerFollowUpQuestion = asyncHandler(async (req, res) => {
  const { question, context } = req.body;

  try {
    // Generate answer using LLM
    const answer = await answerQuestion(question, context);

    res.json({
      success: true,
      data: {
        question,
        answer,
        contextLength: context.length,
        processedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Follow-up question error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to answer the question',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

module.exports = {
  generateWebpageSummary,
  generateGeneralSummary,
  answerQuestion: answerFollowUpQuestion,
};
