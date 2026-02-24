const jwt = require('jsonwebtoken');
const adminModel = require('../models/admin.model');

// Middleware to verify JWT token
const authenticateAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1] || req.headers['x-access-token'];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const admin = await adminModel.findById(decoded.id).select('-Password');
        
        if (!admin || !admin.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token or admin account is inactive.'
            });
        }

        req.admin = admin;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token.',
            error: error.message
        });
    }
};

module.exports = { authenticateAdmin };
