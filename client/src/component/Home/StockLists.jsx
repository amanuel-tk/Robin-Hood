import React, { useEffect, useState } from "react";
// import LineGraphForLists from "./LineGraphForLists";
import { io } from "socket.io-client";
import Loading from "../Images/loading.gif";
import { NavLink } from "react-router-dom";

function StockLists() {
  const [graphData, setGraphData] = useState([]);
  useEffect(() => {
    const socket = io.connect("http://localhost:4000/");

    socket.on("data", (data) => {
      console.log(data)

      setGraphData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (!graphData || graphData.length === 0) {
    // If graphData is not available or empty, return a loading indicator or placeholder
    return (
      <div className="loading">
        <img src={Loading} alt="Loading..." />
      </div>
    );
  }
  return (
    <div className=" w-full border h-[80vh] overflow-y-scroll overflow-x-hidden">
      <div>
        <div className="p-4 border-b">
          <div>
            <span className=" text-base font-bold text-green-400">
              My Stocks
            </span>
          </div>

          <div
            className="w-full flex flex-col gap-2 justify-center "
            style={{ scrollbarWidth: "5px" }}
          >
            {graphData.map((list, key) => {
              return (
                <NavLink
                to={"/detail/"+list.symbol}
                  key={key}
                  className="w-full flex flex-row flex-nowrap justify-between items-center h-10 py-6 px-2 rounded-md hover:bg-gray-100"
                >
                  <div className="font-bold text-sm ">
                    <span>{list.symbol}</span>
                  </div>
                  <div className="">
                    <span>
                      {/* <LineGraphForLists /> */}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-bold text-sm">${list[0].latestPrice}</span>
                    <span
                      className={` font-medium ${
                        list[0].change > 0 ? "text-green-500" : "text-red-500"
                      } text-sm`}
                    >
                      {list[0].change}%
                    </span>
                  </div>
                </NavLink>
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
            {/* {stockDataList.map((list, key) => {
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
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockLists;
