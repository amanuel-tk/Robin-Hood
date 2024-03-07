const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const authProtect = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization;


    if (!token) {
        console.log(not)
        return res.status(401).json({ message: 'Not Authorized: no token' });
    }

    try {
        const decoded = jwt.verify(token,"abcd");
        req.user= await User.findById(decoded.userId).select('-password');
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Not Authorized: invalid token' });
    }
});


module.exports = {
    authProtect
}