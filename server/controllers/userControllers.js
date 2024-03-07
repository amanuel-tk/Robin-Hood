const user = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

// Controller function to register a new user
const registerUser = async (req, res) => {
    // Extract user details from request body
    const { name, email, password } = req.body;
    // Check if user with given email already exists
    const userExists = await user.findOne({ email });
    // If user already exists, return error message
    if (userExists) {
        return res.status(400).json({ message: 'User exists. Please login.' });
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new user in database
    const newUser = await user.create({
        name: name,
        email,
        password: hashPassword,
    });

    // If user creation is successful, generate JWT token
    if (newUser) {
        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, "abcd", {
            expiresIn: '1h' // Token expiry time
        });

        return res.status(201).json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            token: token // Include token in response
        });
    } else {
        return res.status(404).json({ message: "Invalid data" });
    }
};

// Controller function to log in a user
const loginUser = async (req, res) => {

    // Extract email and password from request body    
    const { email, password } = req.body;
    // If email is not provided, return error message
    if (!email) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const users = await user.findOne({ email });

    if (users && (await bcrypt.compare(password, users.password))) {
        const token = jwt.sign({ userId: users._id }, "abcd", {
            expiresIn: '1h' // Token expiry time
        });
        // Return user details and token in response
        return res.status(200).json({
            _id: users.id,
            name: users.name,
            email: users.email,
            token: token // Include token in response
        });
    } else {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

};

// Controller function to buy a stock
const buyStock = async (req, res) => {

    // Extract details of the stock purchase from request body
    const { quantityType, amount, symbol, price } = req.body;
    // console.log(symbol);

    try {
        // Find the user in the database
        const stock = await user.findById(req.user.id);

        // If user is not found, return error message
        if (!stock) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Calculate total purchase amount based on quantity type
        const totalPurchaseAmount = quantityType === 'dollar' ? amount : amount * price;


        // Deduct the purchase amount from the user's balance
        stock.balance -= totalPurchaseAmount;

        // Add the bought stock to the user's boughtStocks array
        stock.boughtStocks.push({
            symbol: symbol,
            quantityType: quantityType,
            quantity: amount,
            purchasePrice: price
        });

        // Save the updated user document back to the database
        await stock.save();

        // Send a success response back to the client
        return res.status(200).json({ message: 'Bought stock added to user successfully' });
    } catch (error) {
        console.error('Error buying stock:', error);
        return res.status(500).json({ message: 'Internal server error' }); // Handle the error gracefully
    }
};

// Controller function to retrieve stocks by symbol
const getStocksBySymbol = async (req, res) => {
    const { symbol } = req.params; // Assuming symbol is passed as a route parameter

    try {
        // Find the user in the database
        const userFind = await await user.findById(req.user.id);

        if (!userFind) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Filter the user's boughtStocks array based on the symbol
        const stocks = userFind.boughtStocks.filter(stock => stock.symbol === symbol);

        return res.status(200).json(stocks); // Send the filtered stocks array back to the client
    } catch (error) {
        console.error('Error retrieving stocks:', error);
        return res.status(500).json({ message: 'Internal server error' }); // Handle the error gracefully
    }
};


// Controller function to sell a stock
const sellStock = async (req, res) => {
    // console.log( req.user.id)
    const userId = req.user._id;
    console.log(userId)
    try {

        const { symbol } = req.params;
        const { price, quantity, quantityType } = req.body;
        //   console.log(symbol);

        const sellMyStock = await await user.findById(req.user.id) // Replace with proper user retrieval
        if (!sellMyStock) {
            return res.status(404).json({ message: 'User not found' });
        }

        const stockIndex = sellMyStock.boughtStocks.findIndex(stock => stock._id.equals(new ObjectId(symbol)));
        //   console.log(stockIndex);
        if (stockIndex === -1) {
            return res.status(404).json({ message: 'Stock not found in user\'s portfolio' });
        }

        sellMyStock.boughtStocks.splice(stockIndex, 1);

        const totalPurchaseAmount = quantityType === 'dollar' ? quantity : quantity * price;


        // Deduct the purchase amount from the user's balance
        sellMyStock.balance += totalPurchaseAmount;

        // Save the updated user document to persist the change in the database
        await sellMyStock.save();

        res.json({ message: 'Stock sold successfully' }); // Or provide more specific message
    } catch (error) {
        console.error('Error selling stock:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Controller function to retrieve user profile
const profile = async (req, res) => {
    // console.log(req.user.id)
    try {
        const userData = await user.findById(req.user.id).select('-password');
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user data without the password
        res.json({ userData });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Controller function to recharge user balance
const recharge = async (req, res) => {
    try {
        const userData = await user.findById(req.user.id);
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user data without the password
        const amountToAdd = 1000; // Example amount to add
        userData.balance += amountToAdd;

        // Save the updated user data to the database
        await userData.save();
        if (userData) {
            // console.log(userData)
            return res.status(200).json({ message: 'Success fully recharged.' });
        } else {
            return res.status(400).json({ message: 'Please try again' });
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// Export user controller functions
module.exports = {
    registerUser,
    loginUser,
    buyStock,
    getStocksBySymbol,
    sellStock,
    profile,
    recharge,
    // Add other exported functions as needed
};
