const user = require('../model/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await user.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User exists. Please login.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await user.create({
        name: name,
        email,
        password: hashPassword,
    });

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
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const users = await user.findOne({ email });

    if (users && (await bcrypt.compare(password, users.password))) {
        const token = jwt.sign({ userId: users._id }, "abcd", {
            expiresIn: '1h' // Token expiry time
        });

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

const buyStock = async (req, res) => {
    const { quantityType, amount, symbol,price } = req.body;
    console.log(symbol);

    try {
        // Find the user in the database
        const stock = await user.findOne({ email: 'z@gmail.com' });

        if (!stock) {
            return res.status(400).json({ message: 'User not found' });
        }

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

const getStocksBySymbol = async (req, res) => {
    const { symbol } = req.params; // Assuming symbol is passed as a route parameter
    
    try {
      // Find the user in the database
      const  userFind= await user.findOne({ email: 'z@gmail.com' });
  
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

  const { ObjectId } = require('mongodb');

  const sellStock = async (req, res) => {
      try {
          const { symbol } = req.params;
          console.log(symbol);
  
          const sellMyStock = await user.findOne({ email: 'z@gmail.com' }); // Replace with proper user retrieval
          if (!sellMyStock) {
              return res.status(404).json({ message: 'User not found' });
          }
  
          const stockIndex = sellMyStock.boughtStocks.findIndex(stock => stock._id.equals(new ObjectId(symbol)));
          console.log(stockIndex);
          if (stockIndex === -1) {
              return res.status(404).json({ message: 'Stock not found in user\'s portfolio' });
          }
  
          // Simulate selling logic (update user's virtual portfolio)
          // - Deduct selling price (mocked in a demo) from user's buying power
          // ... (implement selling logic here)
  
          // Remove the stock from the boughtStocks array
          sellMyStock.boughtStocks.splice(stockIndex, 1);
  
          // Save the updated user document to persist the change in the database
          await sellMyStock.save();
  
          res.json({ message: 'Stock sold successfully' }); // Or provide more specific message
      } catch (error) {
          console.error('Error selling stock:', error);
          res.status(500).json({ message: 'Internal server error' });
      }
  }
  

module.exports = {
    registerUser,
    loginUser,
    buyStock,
    getStocksBySymbol,
    sellStock
    // Add other exported functions as needed
};
