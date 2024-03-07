import React from "react";
import HomeIcon from "../Images/homeIcon.svg";

import X1 from "../Images/1.png";
import X2 from "../Images/2.png";
import X3 from "../Images/3.png";
import X4 from "../Images/4.png";
import X5 from "../Images/5.png";
import X6 from "../Images/6.png";
import X7 from "../Images/7.png";
import X8 from "../Images/8.png";
import X9 from "../Images/9.png";
import X10 from "../Images/10.png";
import X11 from "../Images/11.png";
import X12 from "../Images/12.png";
import X13 from "../Images/13.png";
import X14 from "../Images/14.png";
import X15 from "../Images/15.png";
import X17 from "../Images/17.png";
import X18 from "../Images/18.png";
import X19 from "../Images/19.png";
import X20 from "../Images/20.png";

// HomeWelcome component
function HomeWelcome() {
  // Array containing items with their names and corresponding images
  const items = [
    { name: "Crypto Commodity ETFs", image: X1 },
    { name: "24 Hour Market", image: X2 },
    { name: "Tradable Crypto", image: X3 },
    { name: "IPO Access", image: X4 },
    { name: "Altcoins", image: X5 },
    { name: "100 Most Popular", image: X6 },
    { name: "Daily Movers", image: X7 },
    { name: "Cannabis", image: X8 },
    { name: "Upcoming Earnings", image: X9 },
    { name: "Technology", image: X10 },
    { name: "Tech, Media, & Telecom", image: X11 },
    { name: "ETFs", image: X12 },
    { name: "Energy", image: X13 },
    { name: "Pharma", image: X14 },
    { name: "Newly Listed Crypto", image: X15 },
    { name: "Growth & Value ETFs", image: X17 },
    { name: "Energy & Water", image: X18 },
    { name: "Healthcare", image: X19 },
    { name: "Real Estate", image: X20 },
  ];
  return (
    <div>
      {/* Displaying HomeIcon image */}
      <div className="flex flex-col gap-10">
        <div className="pt-8">
          <img src={HomeIcon} alt="" className="w-11/12 h-80" />
        </div>
        {/* Displaying welcome message */}
        <div>
          <span className="text-5xl font-semibold">Welcome to Robinhood</span>
        </div>
        {/* Displaying list of investment options */}
        <div className="flex flex-col gap-6">
          <span className="text-2xl font-semibold border-b pb-6">
            Discover investments
          </span>
          {/* Iterating through items and displaying them */}
          <div className="flex flex-row flex-wrap gap-1">
            {items.map((list, key) => {
              return (
                // Displaying each item with image and name
                <div
                  key={key}
                  className="hover:bg-gray-100 flex flex-row flex-nowrap gap-2 border rounded-full w-fit py-1 px-2 items-center"
                >
                  <img
                    src={list.image}
                    alt=""
                    className="rounded-full w-7 h-7"
                  />
                  <span className="font-medium text-sm">{list.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeWelcome;
