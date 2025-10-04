const express = require('express');
const { protect } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// ==========================================
// @route   GET /api/dashboard
// @desc    Get user dashboard data
// @access  Private (requires JWT)
// ==========================================

router.get('/', protect, async (req, res) => {
    try {
        // req.user is populated by protect middleware
        const user = await User.findById(req.user.id);

        // Fetch user's TWAs, completions, etc. (to be implemented)
        // const twas = await TWA.find({ userId: user._id });
        // const completions = await Completion.find({ userId: user._id });

        res.status(200).json({
            success: true,
            data: {
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    dailyPoints: user.dailyPoints,
                    totalPoints: user.totalPoints,
                    currentStreak: user.currentStreak,
                    longestStreak: user.longestStreak
                },
                // twas,
                // completions
            }
        });

    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to load dashboard data'
        });
    }
});

// ==========================================
// @route   PUT /api/dashboard/points
// @desc    Update user points (example protected route)
// @access  Private
// ==========================================

router.put('/points', protect, async (req, res) => {
    try {
        const { points } = req.body;

        if (!points || points < 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid points value'
            });
        }

        const user = await User.findById(req.user.id);
        
        user.dailyPoints += points;
        user.totalPoints += points;
        
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Points updated successfully',
            data: {
                dailyPoints: user.dailyPoints,
                totalPoints: user.totalPoints
            }
        });

    } catch (error) {
        console.error('Update points error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update points'
        });
    }
});

module.exports = router;