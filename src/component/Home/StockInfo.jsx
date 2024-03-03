import React from "react";
import LineGraph from "./LineGraph";

function StockInfo() {
  return (
    <div className="w-full">
      <div className=" h-[60vh]">
        <div className="flex flex-col gap-1">
          <h1 className=" text-3xl font-semibold">Tesla</h1>
          <span className=" text-3xl font-semibold">$203.20</span>
          <span className="text-sm font-semibold">-$1.54 (-0.77%)Today</span>
        </div>
        <div className="">
          <LineGraph  />
        </div>
      </div>
    </div>
  );
}

export default StockInfo;
