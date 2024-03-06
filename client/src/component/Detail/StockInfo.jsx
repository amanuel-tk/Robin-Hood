import React, { useState } from "react";
import LineGraph from "./LineGraph";

function StockInfo({graphData,handleTimeFrame,stockData}) {
  
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("1D");

  const handleClick = (timeFrame) => {
    handleTimeFrame(timeFrame)
    setSelectedTimeFrame(timeFrame);
  };
  return (
    <div className="w-full border-b ">
      {stockData &&
      <div className=" h-[53vh] flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className=" text-3xl font-semibold">{stockData.symbol}</h1>
          <span className=" text-3xl font-semibold">{stockData.latestPrice}</span>
          <span className={`text-sm font-semibold ${stockData.change>=0 ?"text-green-500" : " text-red-500"}`}>{stockData.change >= 0?"+":""}${ parseFloat(stockData.change.toFixed(3))} ({ parseFloat(stockData.changePercent.toFixed(3))} %)</span>
        </div>
        <div className="">
          <LineGraph graphData={graphData && graphData} />
        </div>
        <div className="flex flex-row flex-nowrap gap-6 font-semibold ">
          <span
            className={`cursor-pointer ${
              selectedTimeFrame === "1D" ? "text-green-500" : "text-black"
            }`}
            onClick={() => handleClick("1D")}
          >
            1D
          </span>
          <span
            className={`cursor-pointer ${
              selectedTimeFrame === "1W" ? "text-green-500" : "text-black"
            }`}
            onClick={() => handleClick("1W")}
          >
            1W
          </span>
          <span
            className={`cursor-pointer ${
              selectedTimeFrame === "1M" ? "text-green-500" : "text-black"
            }`}
            onClick={() => handleClick("1M")}
          >
            1M
          </span>
          <span
            className={`cursor-pointer ${
              selectedTimeFrame === "3M" ? "text-green-500" : "text-black"
            }`}
            onClick={() => handleClick("3M")}
          >
            3M
          </span>
          <span
            className={`cursor-pointer ${
              selectedTimeFrame === "YTD" ? "text-green-500" : "text-black"
            }`}
            onClick={() => handleClick("YTD")}
          >
            YTD
          </span>
          <span
            className={`cursor-pointer ${
              selectedTimeFrame === "1Y" ? "text-green-500" : "text-black"
            }`}
            onClick={() => handleClick("1Y")}
          >
            1Y
          </span>
          <span
            className={`cursor-pointer ${
              selectedTimeFrame === "5Y" ? "text-green-500" : "text-black"
            }`}
            onClick={() => handleClick("5Y")}
          >
            5Y
          </span>
          <span
            className={`cursor-pointer ${
              selectedTimeFrame === "max" ? "text-green-500" : "text-black"
            }`}
            onClick={() => handleClick("max")}
          >
            MAX
          </span>
        </div>
      </div>}
    </div>
  );
}

export default StockInfo;
