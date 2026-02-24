require("dotenv").config()
require("./utilities/database")
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API routes (must come before frontend routes)
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/', indexRouter);

// Serve admin frontend for specific routes
app.get('/admin-portal', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Also serve at root admin path
app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Frontend routes for React Router (SPA routing)
// These routes should serve the admin.html file so React Router can handle them
// Only handle GET requests to avoid conflicts with API POST routes
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Serve admin.html for root GET path (only if not an API call)
// API routes like POST /signUp and POST /loan-data will still work
app.get('/', (req, res) => {
    // If it's a request for a file (has extension), let static middleware handle it
    if (req.path.includes('.') && req.path !== '/') {
        return res.status(404).send('Not found');
    }
    // Otherwise serve the admin portal (React Router will redirect to /login)
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

module.exports = app;
