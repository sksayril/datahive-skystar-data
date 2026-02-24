let mongoose = require('mongoose')

// Flexible schema that accepts any structure
let schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    loanData: {
        type: mongoose.Schema.Types.Mixed, // Accepts any type of data
        required: true
    }
}, {
    timestamps: true,
    strict: false // Allows additional fields not defined in schema
})

// Index for faster queries
schema.index({ name: 1 });
schema.index({ createdAt: -1 });

module.exports = mongoose.model('loandata', schema)
