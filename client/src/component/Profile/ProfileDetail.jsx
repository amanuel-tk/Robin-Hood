import React, { useEffect, useState } from "react";
import Profile from "../Images/profile.jpg";
import { useAuth } from "../../pages/Auth";
import { useNavigate } from "react-router-dom";

function ProfileDetail({ profileData }) {
  const auth = useAuth();
  const navigate = useNavigate();

  // Function to get the year from a date string
  function getYear() {
    const dateString = "2024-03-05T16:58:36.947Z";
    const date = new Date(dateString);
    const year = date.getFullYear();
    return year;
  }
  // Token for fetching stock prices
  const token = process.env.REACT_APP_API_TOKEN;;

  const [stockPrices, setStockPrices] = useState({});
  const [delay, setDelay] = useState(1000); // Initial delay of 1 second

  useEffect(() => {
    // Function to fetch stock prices
    const fetchStockPrices = async () => {
      const symbols = profileData.userData.boughtStocks.map(
        (stock) => stock.symbol
      );

      // Filter out duplicate symbols
      const uniqueSymbols = Array.from(new Set(symbols));

      try {
        for (let i = 0; i < uniqueSymbols.length; i++) {
          const symbol = uniqueSymbols[i];

          // Check if the symbol's price has already been fetched
          if (stockPrices[symbol]) {
            continue; // Skip fetching if the price already exists
          }

          // Delay between requests
          await new Promise((resolve) => setTimeout(resolve, delay));

          const response = await fetch(
            `https://api.iex.cloud/v1/data/core/quote/${symbol}?token=${token}`
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch data for symbol: ${symbol}`);
          }
          const data = await response.json();

          setStockPrices((prevPrices) => ({
            ...prevPrices,
            [symbol]: data[0].latestPrice,
          }));
        }
      } catch (error) {
        // Handle the error here (e.g., display an error message)
      }
    };

    fetchStockPrices();
  }, [profileData, delay, stockPrices]); // Re-run useEffect when profileData changes
  // Re-run useEffect when profileData changes

  // Function to calculate profit
  function calculateProfit(quantityType, quantity, purchasePrice, latestPrice) {
    let profit = 0;

    if (quantityType === "dollar") {
      // If bought in dollars, calculate the quantity of shares bought
      const shares = quantity / purchasePrice;
      profit = shares * (latestPrice - purchasePrice);
    } else {
      // If bought in shares, use the quantity directly
      profit = quantity * (latestPrice - purchasePrice);
    }

    // Return the calculated profit
    return parseFloat(profit.toFixed(3));
  }
  // Function to handle stock selling
  function handleSell(stockId, quantity, quantityType, symbol) {
    if (localStorage.getItem("token")) {
      fetch(`http://localhost:4000/user/sell/${stockId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          price: stockPrices[symbol],
          quantity,
          quantityType,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            // Handle error, show error message, etc.
          }
          return response.json();
        })
        .then((data) => {
          alert("Stock sold successfully");
          window.location.reload();
          // Optionally, update state or perform any necessary actions after successful removal
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            auth.logout();
            navigate("/login");
          }
          // Handle error, show error message, etc.
        });
    }
  }

  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    // Calculate total profit whenever profileData or stockPrices change
    let sum = 0;
    profileData.userData.boughtStocks.forEach((stock) => {
      const profit = calculateProfit(
        stock.quantityType,
        stock.quantity,
        stock.purchasePrice,
        stockPrices[stock.symbol]
      );
      sum += profit;
    });
    setTotalProfit(sum);
  }, [profileData, stockPrices]);

  // JSX for rendering the profile details
  return (
    <div className="w-6/12 max-sm:w-11/12 max-md:w-11/12 max-lg:w-11/12 max-xl:w-11/12">
      {profileData && (
        <div className=" w-10/12 flex flex-col gap-5">
          <div className="flex flex-row flex-nowrap items-center gap-4">
            <div>
              <img src={Profile} alt="" className="w-20 h-20" />
            </div>
            <div className="flex flex-col ">
              <div>
                <span className="text-xl font-medium ">
                  {profileData.userData.name}
                </span>
              </div>
              <div className="flex flex-row items-baseline flex-nowrap gap-4">
                <span className="text-lg font-normal ">
                  {profileData.userData.email} .{" "}
                </span>
                <span className=" font-normal ">
                  {" "}
                  Joined {getYear(profileData.userData.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 pt-10 pl-1">
            <span className="text-2xl font-semibold">
              {profileData.userData.balance}$
            </span>
            <span className="text-base font-normal">Total in Robinhood</span>
          </div>
          <div className="flex flex-col gap-5 pt-10">
            <span className="text-2xl font-semibold">Investing</span>
            <hr />
            <div>
              <div className="flex flex-col gap-4  pt-5">
                <div className="flex flex-row flex-nowrap justify-between text-lg font-semibold">
                  <span>Total investing value</span>
                  <span>{profileData.userData.balance}$</span>
                </div>
                <div
                  className={`${
                    totalProfit >= 0 ? "text-green-500" : "text-red-500"
                  } flex flex-row flex-nowrap justify-between text-green-500 font-medium`}
                >
                  <span>Total investing Profit</span>
                  <span>{parseFloat(totalProfit.toFixed(3))}$</span>
                </div>
                <div className="flex flex-row flex-nowrap justify-between text-gray-500">
                  <span>Total Number Of Stocks Owned</span>
                  <span>{Object.keys(stockPrices).length} Stocks</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col pt-10 gap-5">
            <span className="text-2xl font-semibold">My Stocks</span>
            <hr />
            <div>
              <table className="bg-white w-full   p-4 h-24">
                <thead>
                  <tr className=" text-lg font-bold underline">
                    <td>No</td>
                    <td>Symbol</td>
                    <td>Invested In</td>
                    <td>Quantity</td>
                    <td>Price</td>
                    <td>Time stamp</td>
                    <td>Profit</td>
                    <td>Action</td>
                  </tr>
                </thead>
                {profileData.userData.boughtStocks.map((stock, index) => {
                  let profit = calculateProfit(
                    stock.quantityType,
                    stock.quantity,
                    stock.purchasePrice,
                    stockPrices[stock.symbol]
                  );
                  return (
                    <thead className=" border-b-2 " key={index}>
                      <tr
                        className={`${
                          profit >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        <td>{index + 1}</td>
                        <td>{stock.symbol}</td>
                        <td>{stock.quantityType}</td>
                        <td>{stock.quantity}</td>
                        <td>{stock.purchasePrice}</td>
                        <td>{new Date(stock.timestamp).toLocaleString()}</td>

                        <td>
                          {" "}
                          <td>{profit}$</td>
                        </td>
                        <td
                          onClick={() => {
                            handleSell(
                              stock._id,
                              stock.quantity,
                              stock.quantityType,
                              stock.symbol
                            );
                          }}
                          className={`text-white flex justify-center  ${
                            profit >= 0 ? "bg-green-500" : "bg-red-500"
                          } px-1 rounded-md py-1 font-semibold cursor-pointer hover:scale-105`}
                        >
                          Sell
                        </td>
                      </tr>
                    </thead>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDetail;
