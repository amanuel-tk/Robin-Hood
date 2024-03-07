import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../pages/Auth";
import { useNavigate } from "react-router-dom";

function AboutStock({ stockData }) {
  // Empty dependency array ensures the effect runs only once
  const auth = useAuth();
  const navigate = useNavigate();
  let params = useParams();
  const [myStocks, setMyStocks] = useState([]);
  const symbol = params.symbol.toUpperCase(); // Symbol of the stock to retrieve
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch(`http://localhost:4000/user/stocks/${symbol}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Handle the retrieved stocks data
          setMyStocks(data);
          // console.log('Stocks:', data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            auth.logout();
            navigate("/login");
          }
          console.error("Error retrieving stocks:", error);
        });
    }
  }, [symbol, auth, navigate]);

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

  function handleSell(stockId,quantity,quantityType) {
    if (localStorage.getItem("token")) {
      fetch(`http://localhost:4000/user/sell/${stockId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ price: stockData.latestPrice,quantity,quantityType }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to remove stock");
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
          console.error("Error removing stock:", error);
          // Handle error, show error message, etc.
        });
    }
  } 
  // console.log(myStocks);
  return (
    <div>
      {stockData && (
        <div className="flex flex-col gap-4">
          <div className=" pb-4">
            <span className="font-bold text-2xl">My Stocks</span>
          </div>
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
            {myStocks.map((stock, index) => {
              let profit = calculateProfit(
                stock.quantityType,
                stock.quantity,
                stock.purchasePrice,
                stockData.latestPrice
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

                    <td>{profit}$</td>
                    <td
                      onClick={() => {
                        handleSell(stock._id,stock.quantity,stock.quantityType);
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

          <div className=" border-b pb-4">
            <span className="font-bold text-2xl">Key statistics</span>
          </div>
          <div className="flex flex-row justify-between flex-wrap">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold">Company Name</span>
                <span className="text-sm">{stockData.companyName}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold">Week 52 High</span>
                <span className="text-sm">{stockData.week52High}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold">Week 52 Low</span>
                <span className="text-sm">{stockData.week52Low}</span>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold">Market Cap</span>
                <span className="text-sm">{stockData.marketCap}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold">Primary Exchange</span>
                <span className="text-sm">{stockData.primaryExchange}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold">Symbol</span>
                <span className="text-sm">{stockData.symbol}</span>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold">Iex Close</span>
                <span className="text-sm">{stockData.iexClose}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold">Iex Market Percent</span>
                <span className="text-sm">{stockData.iexMarketPercent}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold">Iex Open</span>
                <span className="text-sm">{stockData.iexOpen}</span>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold">Calculation Price</span>
                <span className="text-sm">{stockData.calculationPrice}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold">
                  Average Total Volume
                </span>
                <span className="text-sm">{stockData.avgTotalVolume}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AboutStock;
