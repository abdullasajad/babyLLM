const express = require('express');
const { check } = require('express-validator');
const { validateRequest } = require('../middleware/validateRequest');
const searchController = require('../controllers/searchController');
const { auth } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   GET /api/search
 * @desc    Search the web with a query
 * @access  Public (or Protected if you add auth middleware)
 */
router.get(
  '/',
  [
    check('q', 'Search query is required').not().isEmpty(),
    check('limit', 'Limit must be a number').optional().isInt({ min: 1, max: 50 }),
    check('offset', 'Offset must be a number').optional().isInt({ min: 0 }),
  ],
  validateRequest,
  searchController.search
);

/**
 * @route   POST /api/search/related
 * @desc    Get related search queries
 * @access  Public (or Protected if you add auth middleware)
 */
router.post(
  '/related',
  [
    check('query', 'Query is required').not().isEmpty(),
    check('count', 'Count must be a number between 1 and 10')
      .optional()
      .isInt({ min: 1, max: 10 }),
  ],
  validateRequest,
  searchController.getRelatedQueries
);

/**
 * @route   POST /api/search/process
 * @desc    Process search results with LLM
 * @access  Protected
 */
router.post(
  '/process',
  auth,
  [
    check('query', 'Query is required').not().isEmpty(),
    check('results', 'Results array is required').isArray({ min: 1 }),
    check('results.*.title', 'Title is required for each result').not().isEmpty(),
    check('results.*.url', 'URL is required for each result').isURL(),
    check('results.*.snippet', 'Snippet is required for each result').not().isEmpty(),
  ],
  validateRequest,
  searchController.processResults
);

module.exports = router;
