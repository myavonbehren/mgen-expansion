const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { authLimiter, signupLimiter } = require('../middleware/rateLimiter');
const { signupValidation, loginValidation, validate } = require('../middleware/validator');
const { sendTokenResponse, clearTokenCookie } = require('../utils/tokenManager');

const router = express.Router();

// ==========================================
// @route   POST /api/auth/signup
// @desc    Register new user
// @access  Public
// ==========================================

router.post('/signup', signupLimiter, signupValidation, validate, async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        // 1. Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'An account with this email already exists.'
            });
        }

        // 2. Create new user (password will be hashed by pre-save middleware)
        const user = await User.create({
            email: email.toLowerCase(),
            password,
            firstName,
            lastName
        });

        // 3. Log successful registration (for security monitoring)
        console.log(`New user registered: ${user.email} at ${new Date().toISOString()}`);

        // 4. Send token response
        sendTokenResponse(user, 201, res, 'Account created successfully');

    } catch (error) {
        console.error('Signup error:', error);

        // Handle duplicate key error (race condition)
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'An account with this email already exists.'
            });
        }

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: messages
            });
        }

        // Generic error response (don't leak internal details)
        res.status(500).json({
            success: false,
            message: 'Account creation failed. Please try again.'
        });
    }
});

// ==========================================
// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
// ==========================================

router.post('/login', authLimiter, loginValidation, validate, async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user and explicitly select password field
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.'
            });
        }

        // 2. Check if account is locked
        if (user.isLocked) {
            return res.status(423).json({
                success: false,
                message: 'Account temporarily locked due to multiple failed login attempts. Please try again later.'
            });
        }

        // 3. Check account status
        if (user.accountStatus !== 'active') {
            return res.status(403).json({
                success: false,
                message: 'Account is suspended or deleted. Please contact support.'
            });
        }

        // 4. Verify password
        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            // Increment failed login attempts
            await user.incLoginAttempts();

            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.'
            });
        }

        // 5. Reset login attempts on successful login
        if (user.loginAttempts > 0) {
            await user.resetLoginAttempts();
        }

        // 6. Update last active timestamp
        user.lastActive = Date.now();
        await user.save({ validateBeforeSave: false });

        // 7. Log successful login (for security monitoring)
        console.log(`User logged in: ${user.email} at ${new Date().toISOString()}`);

        // 8. Send token response
        sendTokenResponse(user, 200, res, 'Login successful');

    } catch (error) {
        console.error('Login error:', error);

        // Generic error response (don't leak internal details)
        res.status(500).json({
            success: false,
            message: 'Login failed. Please try again.'
        });
    }
});

// ==========================================
// @route   POST /api/auth/logout
// @desc    Logout user / clear cookie
// @access  Private
// ==========================================

router.post('/logout', protect, (req, res) => {
    try {
        // Clear JWT cookie
        clearTokenCookie(res);

        // Log logout (for security monitoring)
        console.log(`User logged out: ${req.user.email} at ${new Date().toISOString()}`);

        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });

    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Logout failed'
        });
    }
});

// ==========================================
// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
// ==========================================

router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                dailyPoints: user.dailyPoints,
                totalPoints: user.totalPoints,
                currentStreak: user.currentStreak,
                longestStreak: user.longestStreak,
                lastActive: user.lastActive,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve user data'
        });
    }
});

module.exports = router;