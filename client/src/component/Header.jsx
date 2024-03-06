import React, { useState } from "react";
import logoWithNoText from "./Images/logoWithNoText.png";
import { GoSearch } from "react-icons/go";
import { useAuth } from "../pages/Auth";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Header() {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const [autocompleteResults, setAutocompleteResults] = useState([]);

  const fetchAutocompleteResults = async (searchTerm) => {
    try {
      const response = await axios.get(
        `https://api.iex.cloud/v1/search/${searchTerm}?token=pk_7a198a348fd94d629443f457047fcc8c`
      );
      console.log(response.data)
      setAutocompleteResults(response.data);
    } catch (error) {
      console.error("Error fetching autocomplete results:", error);
      throw new Error("Failed to fetch autocomplete results");
    }
  };
  return (
    <div>
      <div className="flex flex-row flex-nowrap gap-3 justify-around items-center">
        <div className="w-2/12">
          <img
            src={logoWithNoText}
            className="h-16 p-2"
            alt="logo robin hood "
          />
        </div>
        <div className="relative w-3/12 flex flex-col">
          <div className="flex border flex-row flex-nowrap items-center  px-2 rounded-md">
            <span className="text-2xl hover:cursor-pointer font-bold text-gray-600">
              <GoSearch />
            </span>
            <input
              type="text"
              className="w-full h-10 outline-none border-none p-2"
              placeholder="Search"
              name="search"
              onChange={(e) => {
                const searchTerm = e.target.value;
                if (searchTerm.length > 0) {
                    fetchAutocompleteResults(searchTerm);
                    setIsOpen(true);
                }
            }}
            />
          </div>
          {autocompleteResults.length > 0 && isOpen &&  (
            <div className=" p-2 absolute top-[37px] bg-white w-full mt-2 flex flex-col rounded-md border border-gray-300 gap-1 z-10">
              <span className="font-bold text-base p-2">Stocks</span>
              {autocompleteResults.map((result, index) => {
                return(
                <NavLink to={'/detail/'+result.symbol} key={index} className="pl-4 pb-2 gap-10 font-semibold cursor-pointer flex flex-row  hover:bg-gray-100" 
                onClick={() => setIsOpen(false)}
                >
                  <span>{result.symbol}</span>
                  <span className="truncate ">{result.name}</span>
                </NavLink>)
})}
            </div>
          )}
        </div>

        <div className="w-4/12 flex flex-row flex-nowrap justify-around text-base font-medium">
          <span className=" hover:cursor-pointer hover:text-green-500">
            Rewards
          </span>
          <span className=" hover:cursor-pointer hover:text-green-500">
            Investing
          </span>
          <span className=" hover:cursor-pointer hover:text-green-500">
            Crypto
          </span>
          <span className=" hover:cursor-pointer hover:text-green-500">
            Spending
          </span>
          <span className=" hover:cursor-pointer hover:text-green-500">
            Retirement
          </span>
          <span className=" hover:cursor-pointer hover:text-green-500">
            Notifications
          </span>

          <div className="dropdown">
            <span className=" hover:cursor-pointer hover:text-green-500 dropbtn hover:bg-white">
              Account
            </span>
            <div className="dropdown-content">
              <span className=" cursor-pointer hover:text-green-500">
                Profile
              </span>
              <span className=" cursor-pointer hover:text-green-500">
                Log Out
              </span>
            </div>
          </div>
        </div>
        {!auth.user && (
          <div className="flex flex-row flex-nowrap gap-4">
            <span className=" border rounded-full  px-6 py-2 text-base font-semibold border-green-500 hover:text-white text-green-500 hover:bg-green-500 cursor-pointer hover:scale-105">
              Login
            </span>
            <span className=" border rounded-full  px-6 py-2 text-base font-semibold border-green-500 text-white bg-green-500 hover:text-green-500 hover:bg-white cursor-pointer hover:scale-105">
              Sign up
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
