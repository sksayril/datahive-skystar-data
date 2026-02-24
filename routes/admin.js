const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminModel = require('../models/admin.model');
const loanDataModel = require('../models/loandata.model');
const { authenticateAdmin } = require('../middleware/auth.middleware');

// Admin Signup
router.post('/signup', async (req, res) => {
    try {
        const { Email, Password, Name, Role } = req.body;

        // Validation
        if (!Email || !Password || !Name) {
            return res.status(400).json({
                success: false,
                message: 'Email, Password, and Name are required fields.'
            });
        }

        // Check if admin already exists
        const existingAdmin = await adminModel.findOne({ Email: Email.toLowerCase() });
        if (existingAdmin) {
            return res.status(409).json({
                success: false,
                message: 'Admin with this email already exists.'
            });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(Password, saltRounds);

        // Create admin
        const adminData = {
            Email: Email.toLowerCase(),
            Password: hashedPassword,
            Name: Name,
            Role: Role || 'admin'
        };

        const newAdmin = await adminModel.create(adminData);

        // Generate JWT token
        const token = jwt.sign(
            { id: newAdmin._id, email: newAdmin.Email, role: newAdmin.Role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Remove password from response
        const adminResponse = {
            _id: newAdmin._id,
            Email: newAdmin.Email,
            Name: newAdmin.Name,
            Role: newAdmin.Role,
            isActive: newAdmin.isActive,
            createdAt: newAdmin.createdAt,
            updatedAt: newAdmin.updatedAt
        };

        return res.status(201).json({
            success: true,
            message: 'Admin created successfully.',
            data: adminResponse,
            token: token
        });

    } catch (error) {
        console.error('Admin signup error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error during admin signup.',
            error: error.message
        });
    }
});

// Admin Login
router.post('/login', async (req, res) => {
    try {
        const { Email, Password } = req.body;

        // Validation
        if (!Email || !Password) {
            return res.status(400).json({
                success: false,
                message: 'Email and Password are required fields.'
            });
        }

        // Find admin by email
        const admin = await adminModel.findOne({ Email: Email.toLowerCase() });
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.'
            });
        }

        // Check if admin is active
        if (!admin.isActive) {
            return res.status(403).json({
                success: false,
                message: 'Admin account is inactive. Please contact administrator.'
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(Password, admin.Password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, email: admin.Email, role: admin.Role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Remove password from response
        const adminResponse = {
            _id: admin._id,
            Email: admin.Email,
            Name: admin.Name,
            Role: admin.Role,
            isActive: admin.isActive,
            createdAt: admin.createdAt,
            updatedAt: admin.updatedAt
        };

        return res.status(200).json({
            success: true,
            message: 'Login successful.',
            data: adminResponse,
            token: token
        });

    } catch (error) {
        console.error('Admin login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error during admin login.',
            error: error.message
        });
    }
});

// Get Admin Profile (Protected Route)
router.get('/profile', authenticateAdmin, async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'Admin profile retrieved successfully.',
            data: req.admin
        });
    } catch (error) {
        console.error('Get profile error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message
        });
    }
});

// Get All Loan Data (Protected Route - Admin Only)
router.get('/loan-data', authenticateAdmin, async (req, res) => {
    try {
        const { page = 1, limit = 10, name } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Build query
        const query = {};
        if (name) {
            query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
        }

        // Get loan data with pagination
        const loanData = await loanDataModel
            .find(query)
            .sort({ createdAt: -1 }) // Latest first
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count
        const total = await loanDataModel.countDocuments(query);

        return res.status(200).json({
            success: true,
            message: 'Loan data retrieved successfully.',
            data: loanData,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalItems: total,
                itemsPerPage: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Get loan data error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while retrieving loan data.',
            error: error.message
        });
    }
});

// Get Single Loan Data by ID (Protected Route - Admin Only)
router.get('/loan-data/:id', authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const loanData = await loanDataModel.findById(id);

        if (!loanData) {
            return res.status(404).json({
                success: false,
                message: 'Loan data not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Loan data retrieved successfully.',
            data: loanData
        });
    } catch (error) {
        console.error('Get loan data error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while retrieving loan data.',
            error: error.message
        });
    }
});

module.exports = router;
