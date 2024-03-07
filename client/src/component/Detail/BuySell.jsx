import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../pages/Auth";
import { useNavigate } from "react-router-dom";
function BuySell({ stockData }) {
  const [activeBuyOrSell, setActiveBuyOrSell] = useState("buy");
  const navigate = useNavigate();
  const [quantityType, setQuantityType] = useState("dollar"); // Default to dollars
  const [amount, setAmount] = useState(0);
  const auth = useAuth();
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4000/user/profile", {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        return response.json();
      })
      .then((data) => {
        setProfileData(data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          auth.logout();
          navigate("/login");
        }
      });
  }, [auth, navigate]);
  function calculate(amount, latestPrice) {
    if (quantityType === "dollar") {
      return amount;
    } else {
      return latestPrice * amount;
    }
  }

  const handleBuy = () => {
    // Prepare the data to send to the backend
    if (localStorage.getItem("token")) {
      if (amount) {
        if (calculate(amount, stockData.latestPrice)<=profileData.userData.balance) {
          const data = {
            quantityType: quantityType,
            amount: amount,
            symbol: stockData.symbol,
            price: stockData.latestPrice,
          };

          // Send the data to the backend
          axios
            .post("http://localhost:4000/user/buy", data, {
              headers: {
                Authorization: `${localStorage.getItem("token")}`,
              },
            })
            .then((response) => {
              // Handle successful response from the backend
              alert("Stock bought successfully");
              window.location.reload();

              // You can handle further actions here, such as updating the UI
            })
            .catch((error) => {
              // Handle error from the backend
              console.error("Error buying stock:", error);
              if (error.response && error.response.status === 401) {
                auth.logout();
                navigate("/login");
              }
              // You can display an error message to the user or handle the error in another way
            });
        } else {
          alert("Please recharge first.");
        }
      } else {
        alert("Please add proper amount.");
      }
    } else {
      alert("Please login first.");
    }
  };
  return (
    <div>
      {stockData && (
        <div className="border p-4 flex flex-col  gap-3">
          <div className="font-bold text-lg flex flex-row flex-nowrap  ">
            <span className="cursor-pointer text-green-500">
              Buy {stockData.symbol}
            </span>
          </div>
          <hr />
          <div className="pt-3 flex flex-col gap-6">
            <div className="flex flex-row justify-between items-center">
              <span className="font-medium text-base">Invest In</span>
              <select
                name="quantityType"
                value={quantityType}
                onChange={(e) => setQuantityType(e.target.value)}
                className="border pl-3 pr-14  py-2 rounded-md outline-none"
              >
                <option value="dollar">Dollar</option>
                <option value="shares">Shares</option>
              </select>
            </div>
            <div className="flex flex-row justify-between items-center">
              <span className="font-medium text-base">Amount</span>
              <input
                type="number"
                name="amount"
                min={0}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border w-24 h-10 rounded-md p-2 outline-none"
              />
            </div>
            <div className=" font-semibold text-green-500 font-lg flex flex-row flex-nowrap  justify-between">
              <span>Market Price</span>
              <span>${stockData.latestPrice}</span>
            </div>
            <hr />
            <div className=" font-semibold  font-lg flex flex-row  justify-between">
              <span>
                {quantityType === "dollar"
                  ? "Estimated Shares"
                  : "Estimated Price"}
              </span>
              <span className="pl-6">
                {quantityType === "dollar"
                  ? parseFloat((amount / stockData.latestPrice).toFixed(3))
                  : parseFloat((stockData.latestPrice * amount).toFixed(3))}
              </span>
            </div>
          </div>

          <div className=" flex flex-row justify-center items-center pt-3">
            <span
              className={`border cursor-pointer ${
                amount <= 0 ? "bg-gray-400" : "bg-green-500"
              } font-semibold text-white py-4 w-full flex justify-center rounded-md`}
              onClick={handleBuy}
            >
              Buy
            </span>
          </div>
          <div className=" text-green-500 flex justify-center pt-3">
            {profileData && (
              <span>
                ${profileData.userData.balance} Buying Power Available
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BuySell;
