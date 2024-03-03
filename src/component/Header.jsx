import React from "react";
import logoWithNoText from "./Images/logoWithNoText.png";
import { GoSearch } from "react-icons/go";

function Header() {
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
        <div className="flex border flex-row flex-nowrap items-center w-3/12 px-2 rounded-md">
          <span className="text-2xl hover:cursor-pointer font-bold text-gray-600">
            <GoSearch />
          </span>
          <input
            type="text"
            className="w-full h-10 outline-none border-none p-2"
            placeholder="Search"
            name="search"
          />
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
          <span className=" hover:cursor-pointer hover:text-green-500">
            Account
          </span>
        </div>

        <div className="flex flex-row flex-nowrap gap-4">
          <span className=" border rounded-full  px-6 py-2 text-base font-semibold border-green-500 hover:text-white text-green-500 hover:bg-green-500 cursor-pointer hover:scale-105">
            Login
          </span>
          <span className=" border rounded-full  px-6 py-2 text-base font-semibold border-green-500 text-white bg-green-500 hover:text-green-500 hover:bg-white cursor-pointer hover:scale-105">
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
