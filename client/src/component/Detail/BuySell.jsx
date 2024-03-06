import React, { useState } from "react";
import axios from "axios";
function BuySell({ stockData }) {
  const [activeBuyOrSell, setActiveBuyOrSell] = useState("buy");

  const [quantityType, setQuantityType] = useState("dollar"); // Default to dollars
  const [amount, setAmount] = useState(0);

  const handleBuy = () => {
    // Prepare the data to send to the backend
    const data = {
      quantityType: quantityType,
      amount: amount,
      symbol:stockData.symbol,
      price:stockData.latestPrice
    };

    // Send the data to the backend
    axios.post("http://localhost:4000/user/buy", data)
      .then(response => {
        // Handle successful response from the backend
        console.log("Stock bought successfully:", response.data);
        // You can handle further actions here, such as updating the UI
      })
      .catch(error => {
        // Handle error from the backend
        console.error("Error buying stock:", error);
        // You can display an error message to the user or handle the error in another way
      });
  };
  return (
    <div>
      {stockData && (
        <div className="border p-4 flex flex-col  gap-3">
          <div className="font-bold text-lg flex flex-row flex-nowrap gap-12 ">
            <span
              className={` cursor-pointer ${
                activeBuyOrSell === "buy" ? "text-green-500" : ""
              }`}
              onClick={() => {
                setActiveBuyOrSell("buy");
              }}
            >
              Buy {stockData.symbol}
            </span>
            <span
              className={` cursor-pointer ${
                activeBuyOrSell === "sell" ? "text-green-500" : ""
              }`}
              onClick={() => {
                setActiveBuyOrSell("sell");
              }}
            >
              Sell {stockData.symbol}
            </span>
          </div>
          <hr />
          <div className="pt-3 flex flex-col gap-6">
            <div className="flex flex-row justify-between items-center">
              <span className="font-medium text-base">Invest In</span>
              <select
              name="quantityType"
              value={quantityType}
              onChange={(e) => setQuantityType(e.target.value)}
                className="border pl-3 pr-14  py-2 rounded-md outline-none"
              >
                <option value="dollar">Dollar</option>
                <option value="shares">
                  Shares
                </option>
              </select>
            </div>
            <div className="flex flex-row justify-between items-center">
              <span className="font-medium text-base">Amount</span>
              <input
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
                className="border w-24 h-10 rounded-md p-2 outline-none"
              />
            </div>
            <div className=" font-semibold text-green-500 font-lg flex flex-row flex-nowrap  justify-between">
              <span>Market Price</span>
              <span>${stockData.latestPrice}</span>
            </div>
            <hr />
            <div className=" font-semibold  font-lg flex flex-row  justify-between">
              <span>Estimated Cost</span>
              <span className="pl-6">{quantityType==="dollar"?parseFloat((stockData.latestPrice*amount).toFixed(3)):parseFloat(stockData.latestPrice*amount.toFixed(3))}</span>
            </div>
          </div>

          <div className=" flex flex-row justify-center items-center pt-3">
            <span className="border cursor-pointer bg-green-500 font-semibold text-white py-4 w-full flex justify-center rounded-md" onClick={handleBuy}>
              Review Order
            </span>
          </div>
          <div className=" text-green-500 flex justify-center pt-3">
            <span>$41.3 Buying Power Available</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuySell;
