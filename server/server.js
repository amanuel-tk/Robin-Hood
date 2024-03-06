const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require('./config/dbConnection')
var mongoose = require('mongoose');
// const { errorHandler } = require('./middleware/errorMiddleware')
connectDB()

app.use(cors());
app.use(express.json());
const axios = require('axios');

const token = 'pk_7a198a348fd94d629443f457047fcc8c'; // Replace with your IEX Cloud token
// const symbol = 'AMZN';

const server = app.listen(4000, () => {
    console.log("Server is up on port 4000");
});

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});
const homeNamespace = io.of("/");
const detailNamespace = io.of("/detail");



app.use('/user',require('./route/userRoutes'))
    


homeNamespace.on("connection", (socket) => {
    // console.log("Connected & Socket id is", socket.id);

    // Function to fetch stock data for a single symbol
    const fetchStockData = (symbol) => {
        const endpoint = `https://api.iex.cloud/v1/data/core/quote/${symbol}?token=${token}`;
        return axios.get(endpoint);
    };

    // Function to fetch data for multiple symbols
    const fetchMultipleStockData = (symbols) => {
        // Map each symbol to a promise that fetches its data
        const promises = symbols.map((symbol) => fetchStockData(symbol));

        // Wait for all promises to resolve
        return Promise.all(promises);
    };

    // Function to emit data for multiple stocks
    const sendMultipleStockData = () => {
        const stockDataList = [
            { symbol: "AAPL" },
            { symbol: "GOOGL" },
            { symbol: "MSFT" },
            { symbol: "AMZN" },
            { symbol: "TSLA" },
            { symbol: "META" },
            { symbol: "NVDA" },
            { symbol: "NFLX" },
            { symbol: "PYPL" },
            { symbol: "INTC" },
            { symbol: "AMD" },
            { symbol: "NVAX" },
            { symbol: "SQ" },
            { symbol: "SHOP" },
            { symbol: "ZM" },
            { symbol: "CRM" },
            { symbol: "NKE" },
            { symbol: "DIS" }
        ];
        const symbols = stockDataList.map((stock) => stock.symbol);
        fetchMultipleStockData(symbols)
            .then((responses) => {
                // Extract relevant data from each response
                const data = responses.map((response, index) => ({
                    ...stockDataList[index],
                    ...response.data,
                }));
                socket.emit("data", data); // Emit data to the client
            })
            .catch((error) => {
                // console.error("Error fetching stock data:", error);
            });
    };

    // Send initial data when a client connects
    sendMultipleStockData();

    // Set interval to send data every 1 second
    const intervalId = setInterval(sendMultipleStockData, 5000000);

    // Handle disconnection
    socket.on("disconnect", () => {
        // console.log("Disconnected & Socket id is", socket.id);
        clearInterval(intervalId); // Clear the interval when client disconnects
    });
});


detailNamespace.on("connection", (socket) => {
    // console.log("Connected & Socket id is detail", socket.id);
    let lastStockSymbol;
    const stockTimeFrameGraph = (timeFrame, symbol) => {
        const endpoint = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/${timeFrame}?token=${token}`
        axios.get(endpoint)
            .then(response => {
                socket.emit("data", response.data);
            })
            .catch(error => {
                // console.error('Error:', error);
            });
    };
    socket.on("timeFrameSelected", (timeFrame, symbol) => {
        // console.log('Received timeframe:', timeFrame);
        stockTimeFrameGraph(timeFrame, symbol);
    });


    const stockInfo = (stockSymbol) => {
        lastStockSymbol = stockSymbol;
        const endPointStockData = `https://api.iex.cloud/v1/data/core/quote/${stockSymbol}?token=${token}`;
        axios.get(endPointStockData)
            .then(response => {
                // Handle successful response
                // console.log('Response:', response.data);
                socket.emit("stockInfo", response.data);

            })
            .catch(error => {
                // Handle error
                // console.error('Error:', error);
            });
    }

    const callStockInfo = () => {
        if (lastStockSymbol) {
            stockInfo(lastStockSymbol);
        }
    };
    const intervalId = setInterval(callStockInfo, 1000);

    socket.on("stockInfo", (stockSymbol) => {
        // console.log('Received timeframe:', stockSymbol);
        stockInfo(stockSymbol);
    });

    socket.on("disconnect", () => {
        // console.log("Disconnected & Socket id is", socket.id);
        clearInterval(intervalId);
    });
});

// app.use(errorHandler)