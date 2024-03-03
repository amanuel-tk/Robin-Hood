import React, { useState } from "react";

function BuySell() {
  const [activeBuyOrSell, setActiveBuyOrSell] = useState("buy");
  return (
    <div>
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
            Buy TSLA
          </span>
          <span
            className={` cursor-pointer ${
              activeBuyOrSell === "sell" ? "text-green-500" : ""
            }`}
            onClick={() => {
              setActiveBuyOrSell("sell");
            }}
          >
            Sell TSLA
          </span>
        </div>
        <hr/>
        <div className="pt-3 flex flex-col gap-6">
          <div className="flex flex-row justify-between items-center">
            <span className="font-medium text-base">Invest In</span>
            <select name="" id="" className="border pl-3 pr-14  py-2 rounded-md outline-none">
               <option value="dollar">Dollar</option><option disabled value="shares">Shares</option>
             
            </select>
          </div>
          <div className="flex flex-row justify-between items-center">
            <span className="font-medium text-base">Amount</span>
            <input type="number" name="amount" id="" className="border w-24 h-10 rounded-md p-2 outline-none" />
          </div>
          <div className=" font-semibold text-green-500 font-lg flex flex-row flex-nowrap  justify-between">
            <span>Market Price</span>
            <span>$15.42</span>
          </div>
          <hr/>
          <div className=" font-semibold  font-lg flex flex-row flex-nowrap  justify-between">
            <span>Estimated Cost</span>
            <span>$0.00</span>
          </div>
        </div>

        <div className=" flex flex-row justify-center items-center pt-3">
          <span className="border cursor-pointer bg-green-500 font-semibold text-white py-4 w-full flex justify-center rounded-md">Review Order</span>
        </div>
        <div className=" text-green-500 flex justify-center pt-3">
          <span>$41.3 Buying Power Available</span>
        </div>
      </div>
    </div>
  );
}

export default BuySell;
