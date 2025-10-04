const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please provide a valid email address'
        ],
        index: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false // Don't return password in queries by default
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    dailyPoints: {
        type: Number,
        default: 0,
        min: 0
    },
    totalPoints: {
        type: Number,
        default: 0,
        min: 0
    },
    currentStreak: {
        type: Number,
        default: 0,
        min: 0
    },
    longestStreak: {
        type: Number,
        default: 0,
        min: 0
    },
    lastActive: {
        type: Date,
        default: Date.now
    },
    accountStatus: {
        type: String,
        enum: ['active', 'suspended', 'deleted'],
        default: 'active'
    },
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: {
        type: Date
    },
    passwordChangedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    collection: 'Users'
});

// ==========================================
// SECURITY: Password Hashing Middleware
// ==========================================

// Hash password before saving (only if modified)
userSchema.pre('save', async function(next) {
    // Only hash if password is modified
    if (!this.isModified('password')) return next();

    try {
        // Generate salt with cost factor from env (default: 14)
        const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 14;
        const salt = await bcrypt.genSalt(saltRounds);
        
        // Hash password
        this.password = await bcrypt.hash(this.password, salt);
        
        // Set password change timestamp
        this.passwordChangedAt = Date.now() - 1000; // Subtract 1s to ensure JWT is created after
        
        next();
    } catch (error) {
        next(error);
    }
});

// Update timestamp on save
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// ==========================================
// SECURITY: Account Lockout Methods
// ==========================================

userSchema.virtual('isLocked').get(function() {
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

userSchema.methods.incLoginAttempts = async function() {
    // Reset attempts if lock has expired
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.updateOne({
            $set: { loginAttempts: 1 },
            $unset: { lockUntil: 1 }
        });
    }

    const updates = { $inc: { loginAttempts: 1 } };
    const maxAttempts = parseInt(process.env.MAX_LOGIN_ATTEMPTS) || 5;
    const lockoutDuration = parseInt(process.env.LOCKOUT_DURATION) || 900000; // 15 minutes

    // Lock account after max attempts
    if (this.loginAttempts + 1 >= maxAttempts && !this.isLocked) {
        updates.$set = { lockUntil: Date.now() + lockoutDuration };
    }

    return this.updateOne(updates);
};

userSchema.methods.resetLoginAttempts = function() {
    return this.updateOne({
        $set: { loginAttempts: 0 },
        $unset: { lockUntil: 1 }
    });
};

// ==========================================
// SECURITY: Password Verification
// ==========================================

userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        // Use constant-time comparison to prevent timing attacks
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Password comparison failed');
    }
};

// ==========================================
// SECURITY: Token Validation
// ==========================================

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

// ==========================================
// Create indexes for performance
// ==========================================

userSchema.index({ email: 1 });
userSchema.index({ createdAt: 1 });
userSchema.index({ accountStatus: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;