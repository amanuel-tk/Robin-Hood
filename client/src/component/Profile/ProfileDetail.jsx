import React from "react";
import Profile from "../Images/profile.jpg";

function ProfileDetail() {
  return (
    <div className="w-6/12 ">
      <div className=" w-10/12 flex flex-col gap-5">
        <div className="flex flex-row flex-nowrap items-center gap-4">
          <div>
            <img src={Profile} alt="" className="w-20 h-20" />
          </div>
          <div className="flex flex-col ">
            <div>
              <span className="text-xl font-medium ">Amanuel</span>
            </div>
            <div className="flex flex-row flex-nowrap gap-4">
              <span className="text-lg font-normal ">@amanuellll.</span>
              <span className="text-base font-normal ">Joined 2024</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 pt-10 pl-1">
          <span className="text-2xl font-semibold">$200,000</span>
          <span className="text-base font-normal">Total in Robinhood</span>
        </div>
        <div className="flex flex-col gap-5 pt-10">
          <span className="text-2xl font-semibold">Investing</span>
          <hr />
          <div>
            <div className="flex flex-col gap-4  pt-5">
              <div className="flex flex-row flex-nowrap justify-between text-lg font-semibold">
                <span>Total investing value</span>
                <span>100,000$</span>
              </div>
              <div className="flex flex-row flex-nowrap justify-between text-green-500 font-medium">
                <span>Total investing Profit</span>
                <span className="text-green-500">+2,000$</span>
              </div>
              <div className="flex flex-row flex-nowrap justify-between text-gray-500">
                <span>Total Number Of Stocks Owned</span>
                <span>5 Stocks</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-10 gap-5">
          <span className="text-2xl font-semibold">My Stocks</span>
          <hr />
          <div>
            <table className="w-full ">
              <tbody className="gap-4">
                <tr className="text-lg font-semibold">
                  <td className="py-6">No</td>
                  <td>Stock</td>
                  <td>Buying price</td>
                  <td>Current Price</td>
                  <td>Profit</td>
                </tr>
                <tr className="hover:bg-gray-100 cursor-pointer">
                  <td>1</td>
                  <td>Apple</td>
                  <td>$150.00</td>
                  <td>$175.50</td>
                  <td>$25.50</td>
                </tr>
                <tr className="hover:bg-gray-100 cursor-pointer">
                  <td>2</td>
                  <td>Google</td>
                  <td>$200.00</td>
                  <td>$220.75</td>
                  <td>$20.75</td>
                </tr>
                <tr className="hover:bg-gray-100 cursor-pointer">
                  <td>3</td>
                  <td>Amazon</td>
                  <td>$3000.00</td>
                  <td>$3250.25</td>
                  <td>$250.25</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetail;
