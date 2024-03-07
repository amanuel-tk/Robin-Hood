import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import StockInfo from "../component/Detail/StockInfo";
import BuySell from "../component/Detail/BuySell";
import AboutStock from "../component/Detail/AboutStock";

import { useParams } from "react-router-dom";

function Detail() {
  const [graphData, setGraphData] = useState([]); // State to store the graph data
  const [stockData, setStockData] = useState(); // State to store the graph data
  const socketRef = useRef(null); // Ref to hold the socket instance

  let params = useParams();
  // Effect to establish and manage socket connection
  useEffect(() => {
    // Create the socket instance
    socketRef.current = io.connect("http://localhost:4000/detail");

    // Listen for 'data' event from the socket
    socketRef.current.emit("stockInfo", params.symbol.toUpperCase());
    socketRef.current.emit(
      "timeFrameSelected",
      "1D",
      params.symbol.toUpperCase()
    );

    socketRef.current.on("stockInfo", (data) => {
      // console.log(data[0])
      setStockData(data[0]);
    });
    socketRef.current.on("data", (data) => {
      // console.log(data);
      if (data[0]) {
        if (data[0].minute) {
          const newData = data
            .filter((entry) => entry.close !== null)
            .map((entry) => ({ date: entry.minute, price: entry.close }));
          setGraphData(newData);
        } else if (data[0].priceDate) {
          const newData = data
            .filter((entry) => entry.close !== null)
            .map((entry) => ({ date: entry.priceDate, price: entry.close }));
          setGraphData(newData);
        }
      }
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [params.symbol]);
  // Function to handle time frame button click
  const handleTimeFrameButtonClick = (timeFrame) => {
    if (socketRef.current) {
      socketRef.current.emit(
        "timeFrameSelected",
        timeFrame,
        params.symbol.toUpperCase()
      );
    } else {
      console.error("Socket is not initialized.");
    }
  };

  // JSX rendering
  return (
    <div className="flex justify-center ">
      <div className="flex flex-col w-9/12 max-sm:w-11/12 max-md:w-11/12 max-lg:w-11/12 max-xl:w-11/12 ">
        <div className="flex flex-row max-sm:w-11/12 max-sm:flex-col max-md:w-11/12 max-md:flex-col gap-2">
          <div className="w-8/12 max-lg:w-7/12 max-sm:w-11/12 max-md:w-11/12 flex flex-col gap-4">
            {graphData && (
              <StockInfo
                graphData={graphData}
                stockData={stockData}
                handleTimeFrame={handleTimeFrameButtonClick}
              />
            )}
          </div>
          <div className="w-3/12 max-lg:w-4/12 max-sm:w-11/12 max-md:w-11/12">
            {stockData && <BuySell stockData={stockData} />}
          </div>
        </div>
        <div className="w-10/12 max-sm:w-11/12 max-md:w-11/12">
          {stockData && <AboutStock stockData={stockData} />}
        </div>
      </div>
    </div>
  );
}

export default Detail;
