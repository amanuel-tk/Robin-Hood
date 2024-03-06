import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AboutStock({ stockData }) {
  // Empty dependency array ensures the effect runs only once
  
  let params = useParams();
  const [myStocks, setMyStocks] = useState([]);
  const symbol = params.symbol; // Symbol of the stock to retrieve
  useEffect(() => {
    fetch(`http://localhost:4000/user/stocks/${symbol}`) // Assuming the backend route is defined as '/api/stocks/:symbol'
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the retrieved stocks data
        setMyStocks(data);
        // console.log('Stocks:', data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error retrieving stocks:", error);
      });
  }, [symbol]);

  function handleSell(stockId) {
    alert(stockId)
    fetch(`http://localhost:4000/user/sell/${stockId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to remove stock');
      }
      return response.json();
    })
    .then(data => {
      console.log('Stock removed successfully:', data);
      // Optionally, update state or perform any necessary actions after successful removal
    })
    .catch(error => {
      console.error('Error removing stock:', error);
      // Handle error, show error message, etc.
    });
  }
  console.log(myStocks);
  return (
    <div>
      {stockData && (
        <div className="flex flex-col gap-4">
          <div className=" border-b pb-4">
            <span className="font-bold text-2xl">My Stocks</span>
          </div>

          <table>
            <tbody>
              <tr>
                <td>Symbol</td>
                <td>Quantity Type</td>
                <td>Quantity</td>
                <td>Purchase Price</td>
                <td>Timestamp</td>
              </tr>
              {myStocks.map((stock, index) => (
                <tr key={index}>
                  <td>{stock.symbol}</td>
                  <td>{stock.quantityType}</td>
                  <td>{stock.quantity}</td>
                  <td>{stock.purchasePrice}</td>
                  <td>{new Date(stock.timestamp).toLocaleString()}</td>
                  <td onClick={()=>{handleSell(stock._id)}}>Sell</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className=" border-b pb-4">
            <span className="font-bold text-2xl">Key statistics</span>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold">Company Name</span>
                <span className="text-sm">{stockData.companyName}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold">Week 52 High</span>
                <span className="text-sm">{stockData.week52High}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold">Week 52 Low</span>
                <span className="text-sm">{stockData.week52Low}</span>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold">Market Cap</span>
                <span className="text-sm">{stockData.marketCap}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold">Primary Exchange</span>
                <span className="text-sm">{stockData.primaryExchange}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold">Symbol</span>
                <span className="text-sm">{stockData.symbol}</span>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold">Iex Close</span>
                <span className="text-sm">{stockData.iexClose}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold">Iex Market Percent</span>
                <span className="text-sm">{stockData.iexMarketPercent}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold">Iex Open</span>
                <span className="text-sm">{stockData.iexOpen}</span>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold">Calculation Price</span>
                <span className="text-sm">{stockData.calculationPrice}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold">
                  Average Total Volume
                </span>
                <span className="text-sm">{stockData.avgTotalVolume}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AboutStock;
