const express = require('express');
const { check } = require('express-validator');
const { validateRequest } = require('../middleware/validateRequest');
const summaryController = require('../controllers/summaryController');
const { auth } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   POST /api/summary/webpage
 * @desc    Generate summary for a webpage
 * @access  Public
 */
router.post(
  '/webpage',
  [
    check('url', 'Valid URL is required').isURL(),
    check('maxLength', 'Max length must be a number between 1 and 10')
      .optional()
      .isInt({ min: 1, max: 10 }),
  ],
  validateRequest,
  summaryController.generateWebpageSummary
);

/**
 * @route   POST /api/summary/general
 * @desc    Generate general summary from multiple sources
 * @access  Public
 */
router.post(
  '/general',
  [
    check('query', 'Search query is required').not().isEmpty(),
    check('sources', 'Sources array is required').isArray({ min: 1 }),
    check('sources.*.title', 'Title is required for each source').not().isEmpty(),
    check('sources.*.content', 'Content is required for each source').not().isEmpty(),
  ],
  validateRequest,
  summaryController.generateGeneralSummary
);

/**
 * @route   POST /api/summary/chat
 * @desc    Answer follow-up questions based on context
 * @access  Public
 */
router.post(
  '/chat',
  [
    check('question', 'Question is required').not().isEmpty(),
    check('context', 'Context is required').not().isEmpty(),
  ],
  validateRequest,
  summaryController.answerQuestion
);

module.exports = router;
