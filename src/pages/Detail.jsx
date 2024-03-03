import React from "react";
import StockInfo from "../component/Detail/StockInfo";
import BuySell from "../component/Detail/BuySell";
import AboutStock from "../component/Detail/AboutStock";
function Detail() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-row w-9/12">
        <div className="w-8/12 flex flex-col gap-4">
          <StockInfo />
          <AboutStock />
        </div>
        <div className="w-3/12">
        <BuySell />
        </div>
      </div>
    </div>
  );
}

export default Detail;
