import React, { useState } from "react";
import LineGraph from "./LineGraph";

function StockInfo({ graphData, handleTimeFrame, stockData }) {
  // State to manage the selected time frame Default
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("1D");

  // Function to handle time frame selection
  const handleClick = (timeFrame) => {
    handleTimeFrame(timeFrame); // Call the handleTimeFrame function passed as prop
    setSelectedTimeFrame(timeFrame); // Update the selected time frame
  };
  return (
    <div className="w-full border-b ">
      {stockData && (
        <div className=" h-[53vh] flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className=" text-3xl font-semibold">{stockData.symbol}</h1>
            <span className=" text-3xl font-semibold">
              {stockData.latestPrice}$
            </span>
            <span
              className={`text-sm font-semibold ${
                stockData.change >= 0 ? "text-green-500" : " text-red-500"
              }`}
            >
               {/* Display change and change percent */}
              {stockData.change >= 0 ? "+" : ""}$
              {parseFloat(stockData.change.toFixed(3))} (
              {parseFloat(stockData.changePercent.toFixed(3))} %)
            </span>
          </div>
           {/* Line graph component */}
          <div className="">
            <LineGraph graphData={graphData && graphData} />
          </div>
           {/* Time frame selection */}
          <div className="flex flex-row flex-nowrap gap-6 font-semibold ">
             {/* Iterate over time frame options */}
             {["1D", "1W", "1M", "3M", "YTD", "1Y", "5Y", "max"].map(
              (timeFrame) => (
                <span
                  key={timeFrame}
                  className={`cursor-pointer capitalize ${
                    selectedTimeFrame === timeFrame
                      ? "text-green-500"
                      : "text-black"
                  }`}
                  onClick={() => handleClick(timeFrame)} // Handle click event for time frame selection
                >
                  {timeFrame}
                </span>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default StockInfo;
