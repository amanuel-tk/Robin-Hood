// Import necessary modules
const jwt = require('jsonwebtoken'); // For handling JWT
const asyncHandler = require('express-async-handler'); // For handling asynchronous errors
const User = require('../model/userModel'); // Import User model

// Middleware function to protect routes requiring authentication
const authProtect = asyncHandler(async (req, res, next) => {
    // Extract token from request headers
    const token = req.headers.authorization;

    // If token is missing, return unauthorized status
    if (!token) {
        // console.log(not)
        return res.status(401).json({ message: 'Not Authorized: no token' });
    }

    try {
        // Verify token and decode user ID
        const decoded = jwt.verify(token,"abcd");
        // Find user by decoded user ID (excluding password)
        req.user= await User.findById(decoded.userId).select('-password');
        next();
    } catch (error) {
        // If token is invalid, return unauthorized status
        return res.status(401).json({ message: 'Not Authorized: invalid token' });
    }
});

// Export the authProtect middleware
module.exports = {
    authProtect
}