// Import required modules
const express = require('express');
const router = express.Router();

// Import middleware and controllers
const { authProtect } = require('../middleware/authMiddleware');
const { registerUser, recharge, profile, loginUser, buyStock, getStocksBySymbol, sellStock } = require('../controllers/userControllers');

// Define routes
router.post('/register', registerUser); // Route to register a new user
router.post('/login', loginUser); // Route to login a user
router.post('/buy', authProtect, buyStock); // Route to buy stocks (protected)
router.post('/recharge', authProtect, recharge); // Route to recharge balance (protected)
router.get('/profile', authProtect, profile); // Route to get user profile (protected)
router.get('/stocks/:symbol', authProtect, getStocksBySymbol); // Route to get stocks by symbol (protected)
router.delete('/sell/:symbol', authProtect, sellStock); // Route to sell stocks by symbol (protected)

// Export router for use in other files
module.exports = router;
