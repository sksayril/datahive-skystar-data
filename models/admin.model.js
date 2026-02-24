let mongoose = require('mongoose')

let schema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    Password: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true,
        trim: true
    },
    Role: {
        type: String,
        default: 'admin',
        enum: ['admin', 'superadmin']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('admin', schema)
