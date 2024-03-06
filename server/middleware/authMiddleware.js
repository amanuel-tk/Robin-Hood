const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const authProtect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.userToken
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decode.id).select('-password')
        next()

    } catch (error) {
        res.status(401).cookie('userToken', '', { expires: new Date('2024-01-01') });
        throw new Error('Not Authorized no token')
    }
    if (!token) {
        res.status(401).cookie('userToken', '', { expires: new Date('2024-01-01') });
        throw new Error('Not Authorized no token')
    }
})

module.exports = {
    authProtect
}