const express = require('express');
const { check } = require('express-validator');
const { validateRequest } = require('../middleware/validateRequest');
const authController = require('../controllers/authController');
const { auth } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  '/signup',
  [
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('name', 'Name is required').optional().trim().isLength({ min: 1, max: 50 }),
  ],
  validateRequest,
  authController.signup
);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and get token
 * @access  Public
 */
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check('password', 'Password is required').exists(),
  ],
  validateRequest,
  authController.login
);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', auth, authController.getProfile);

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put(
  '/profile',
  auth,
  [
    check('name', 'Name cannot be more than 50 characters').optional().trim().isLength({ max: 50 }),
    check('preferences.theme', 'Invalid theme').optional().isIn(['light', 'dark', 'auto']),
    check('preferences.language', 'Invalid language').optional().isLength({ min: 2, max: 5 }),
    check('preferences.resultsPerPage', 'Results per page must be between 5 and 50')
      .optional()
      .isInt({ min: 5, max: 50 }),
  ],
  validateRequest,
  authController.updateProfile
);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (invalidate token)
 * @access  Private
 */
router.post('/logout', auth, authController.logout);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh JWT token
 * @access  Private
 */
router.post('/refresh', auth, authController.refreshToken);

module.exports = router;
