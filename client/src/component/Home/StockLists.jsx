import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Loading from "../Images/loading.gif";
import { NavLink } from "react-router-dom";

// StockLists component
function StockLists() {
  // State to store graph data received from the server
  const [graphData, setGraphData] = useState([]);

  // useEffect hook to establish socket connection and fetch data
  useEffect(() => {
    // Connect to socket server
    const socket = io.connect("http://localhost:4000/");

    // Listen for 'data' event from server
    socket.on("data", (data) => {
      // Update graph data state with received data
      setGraphData(data);
    });

    // Cleanup function to disconnect socket when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  // Display loading animation if graphData is empty or not yet fetched
  if (!graphData || graphData.length === 0) {
    return (
      <div className="loading">
        <img src={Loading} alt="Loading..." />
      </div>
    );
  }

  // Return the list of stock items if graphData is available
  return (
    <div className="w-full border h-[80vh] overflow-y-scroll overflow-x-hidden">
      <div>
        <div className="p-4 border-b">
          <div>
            <span className="text-base font-bold text-green-400">Top Stocks</span>
          </div>

          {/* Displaying stock items */}
          <div className="w-full flex flex-col gap-2 justify-center" style={{ scrollbarWidth: "5px" }}>
            {graphData.map((list, key) => {
              return (
                // Link to stock detail page
                <NavLink to={"/detail/" + list.symbol} key={key} className="w-full flex flex-row flex-nowrap justify-between items-center h-10 py-6 px-2 rounded-md hover:bg-gray-100">
                  <div className="font-bold text-sm">
                    <span>{list.symbol}</span>
                  </div>

                  <div className="flex flex-col">
                    {/* Display latest price and change percentage */}
                    <span className="font-bold text-sm">${list[0].latestPrice}</span>
                    <span className={`font-medium ${list[0].change > 0 ? "text-green-500" : "text-red-500"} text-sm`}>
                      {list[0].change}%
                    </span>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockLists;
