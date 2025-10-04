const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ==========================================
// JWT Verification Middleware
// ==========================================

const protect = async (req, res, next) => {
    try {
        let token;

        // 1. Check for token in HTTP-only cookie (preferred)
        if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        // 2. Fallback to Authorization header (for mobile apps)
        else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // 3. No token found
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required. Please log in.'
            });
        }

        // 4. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 5. Check if user still exists
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User no longer exists.'
            });
        }

        // 6. Check if account is active
        if (user.accountStatus !== 'active') {
            return res.status(403).json({
                success: false,
                message: 'Account is suspended or deleted.'
            });
        }

        // 7. Check if user changed password after token was issued
        if (user.changedPasswordAfter(decoded.iat)) {
            return res.status(401).json({
                success: false,
                message: 'Password recently changed. Please log in again.'
            });
        }

        // 8. Grant access to protected route
        req.user = user;
        next();

    } catch (error) {
        // Handle specific JWT errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. Please log in again.'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired. Please log in again.'
            });
        }

        // Generic error
        return res.status(500).json({
            success: false,
            message: 'Authentication failed.'
        });
    }
};

module.exports = { protect };