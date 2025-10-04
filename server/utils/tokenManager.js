const jwt = require('jsonwebtoken');

// ==========================================
// Generate JWT Token
// ==========================================

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE || '24h',
            issuer: 'MyGen',
            audience: 'MyGen-Users'
        }
    );
};

// ==========================================
// Send Token via HTTP-Only Cookie
// ==========================================

const sendTokenResponse = (user, statusCode, res, message = 'Success') => {
    // Generate JWT
    const token = generateToken(user._id);

    // Cookie options
    const cookieOptions = {
        expires: new Date(
            Date.now() + (parseInt(process.env.JWT_COOKIE_EXPIRE) || 1) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true, // Prevents XSS attacks
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        sameSite: 'strict', // CSRF protection
        path: '/'
    };

    // Remove password from output
    user.password = undefined;

    // Send response with cookie
    res
        .status(statusCode)
        .cookie('jwt', token, cookieOptions)
        .json({
            success: true,
            message,
            token, // Also send in response body for mobile apps
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                dailyPoints: user.dailyPoints,
                totalPoints: user.totalPoints,
                currentStreak: user.currentStreak,
                longestStreak: user.longestStreak
            }
        });
};

// ==========================================
// Clear JWT Cookie (Logout)
// ==========================================

const clearTokenCookie = (res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
};

module.exports = {
    generateToken,
    sendTokenResponse,
    clearTokenCookie
};