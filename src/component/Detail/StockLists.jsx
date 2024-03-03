import React from "react";
import LineGraphForLists from "./LineGraphForLists";

function StockLists() {
  const stockDataList = [
    { symbol: "AAPL", price: 148.56, change: -1.23 },
    { symbol: "GOOGL", price: 2775.19, change: 0.45 },
    { symbol: "MSFT", price: 304.23, change: 1.87 },
    { symbol: "AMZN", price: 3306.99, change: -0.78 },
    { symbol: "TSLA", price: 792.71, change: -2.56 },
    { symbol: "FB", price: 353.29, change: 0.89 },
    { symbol: "NVDA", price: 221.45, change: 2.34 },
    { symbol: "NFLX", price: 579.38, change: -0.65 },
    { symbol: "PYPL", price: 272.09, change: -0.12 },
    { symbol: "INTC", price: 54.32, change: 0.76 },
    { symbol: "AMD", price: 101.45, change: 1.98 },
    { symbol: "NVAX", price: 137.87, change: -1.56 },
    { symbol: "SQ", price: 246.78, change: 0.32 },
    { symbol: "SHOP", price: 1492.33, change: -1.09 },
    { symbol: "ZM", price: 306.55, change: 0.78 },
    { symbol: "CRM", price: 260.44, change: -0.45 },
    { symbol: "NKE", price: 168.91, change: 0.56 },
    { symbol: "DIS", price: 182.78, change: -0.89 },
    { symbol: "PYPL", price: 272.09, change: -0.12 },
    { symbol: "INTC", price: 54.32, change: 0.76 },
  ];

  const myStockDataList = [
    { symbol: "AAPL", price: 148.56, change: -1.23 },
    { symbol: "GOOGL", price: 2775.19, change: 0.45 },
    { symbol: "MSFT", price: 304.23, change: 1.87 },

  ];

  return (
    <div className=" w-full border h-[80vh] overflow-y-scroll overflow-x-hidden">
      <div>
        <div className="p-4 border-b">
          <div>
            <span className=" text-base font-bold text-green-400">My Stocks</span>
          </div>

          <div
            className="w-full flex flex-col gap-2 justify-center "
            style={{ scrollbarWidth: "5px" }}
          >
            {myStockDataList.map((list, key) => {
              return (
                <div
                  key={key}
                  className="w-full flex flex-row flex-nowrap justify-between items-center h-10 py-6 px-2 rounded-md hover:bg-gray-100"
                >
                  <div className="font-bold text-sm ">
                    <span>{list.symbol}</span>
                  </div>
                  <div className="">
                    <span>
                      <LineGraphForLists />
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-bold text-sm">${list.price}</span>
                    <span
                      className={` font-medium ${
                        list.change > 0 ? "text-green-500" : "text-red-500"
                      } text-sm`}
                    >
                      {list.change}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-4">
          <div>
            <span className=" text-base font-bold  text-green-400">Stocks</span>
          </div>
          <div
            className="w-full flex flex-col gap-2 justify-center "
            style={{ scrollbarWidth: "5px" }}
          >
            {stockDataList.map((list, key) => {
              return (
                <div
                  key={key}
                  className="w-full flex flex-row flex-nowrap justify-between items-center h-10 py-6 px-2 rounded-md hover:bg-gray-100"
                >
                  <div className="font-bold text-sm ">
                    <span>{list.symbol}</span>
                  </div>
                  <div className="">
                    <span>
                      <LineGraphForLists />
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-bold text-sm">${list.price}</span>
                    <span
                      className={` font-medium ${
                        list.change > 0 ? "text-green-500" : "text-red-500"
                      } text-sm`}
                    >
                      {list.change}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockLists;
