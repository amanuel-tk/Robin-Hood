const mongoose = require('mongoose');

const BoughtStockSchema = new mongoose.Schema({
  symbol: { type: String, required: true }, // Stock symbol (e.g., AAPL)
  quantityType: { type: String, enum: ['dollar', 'shares'], required: true }, // Type of quantity (dollars or shares)
  quantity: { type: Number, required: true }, // Quantity of stocks bought or amount in dollars
  purchasePrice: { type: Number, required: true }, // Purchase price per stock
  timestamp: { type: Date, default: Date.now } // Timestamp of when the stock was bought
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true
    },
    password: {
        type: String,
        // required:[true,"Please Enter Your Password"]
    },
    boughtStocks: [BoughtStockSchema],
    balance: { type: Number, default: 0 }  // Array of bought stocks
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);
