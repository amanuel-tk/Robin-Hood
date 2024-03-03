import React, { useState } from "react";
import LineGraph from "./LineGraph";

function StockInfo() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");

  const handleClick = (timeframe) => {
    setSelectedTimeframe(timeframe);
  };
  return (
    <div className="w-full border-b ">
      <div className=" h-[53vh] flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className=" text-3xl font-semibold">Tesla</h1>
          <span className=" text-3xl font-semibold">$203.20</span>
          <span className="text-sm font-semibold">-$1.54 (-0.77%)Today</span>
        </div>
        <div className="">
          <LineGraph />
        </div>
        <div className="flex flex-row flex-nowrap gap-6 font-semibold ">
          <span
            className={`cursor-pointer ${
              selectedTimeframe === "1D" ? "text-green-500" : "text-black"
            }`}
            onClick={() => handleClick("1D")}
          >
            1D
          </span>
          <span
            className={`cursor-pointer ${
              selectedTimeframe === "1W" ? "text-green-500" : "text-black"
            }`}
            onClick={() => handleClick("1W")}
          >
            1W
          </span>
          <span
            className={`cursor-pointer ${
              selectedTimeframe === "1M" ? "text-green-500" : "text-black"
            }`}
            onClick={() => handleClick("1M")}
          >
            1M
          </span>
          <span
            className={`cursor-pointer ${
              selectedTimeframe === "3M" ? "text-green-500" : "text-black"
            }`}
            onClick={() => handleClick("3M")}
          >
            3M
          </span>
          <span
            className={`cursor-pointer ${
              selectedTimeframe === "YTD" ? "text-green-500" : "text-black"
            }`}
            onClick={() => handleClick("YTD")}
          >
            YTD
          </span>
          <span
            className={`cursor-pointer ${
              selectedTimeframe === "1Y" ? "text-green-500" : "text-black"
            }`}
            onClick={() => handleClick("1Y")}
          >
            1Y
          </span>
          <span
            className={`cursor-pointer ${
              selectedTimeframe === "5Y" ? "text-green-500" : "text-black"
            }`}
            onClick={() => handleClick("5Y")}
          >
            5Y
          </span>
          <span
            className={`cursor-pointer ${
              selectedTimeframe === "MAX" ? "text-green-500" : "text-black"
            }`}
            onClick={() => handleClick("MAX")}
          >
            MAX
          </span>
        </div>
      </div>
    </div>
  );
}

export default StockInfo;
