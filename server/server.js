const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });

// IMPORTANT: Import connectDB
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

// ==========================================
// Middleware
// ==========================================
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// ==========================================
// Routes
// ==========================================
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'MyGen API Server',
        endpoints: {
            health: '/api/health',
            signup: 'POST /api/auth/signup',
            login: 'POST /api/auth/login'
        }
    });
});

app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error:', err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal server error'
    });
});

// ==========================================
// Start Server
// ==========================================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // CRITICAL: Connect to Database BEFORE starting server
        await connectDB();
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();