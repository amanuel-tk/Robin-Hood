import React from "react";
import HomeWelcome from "../component/Home/HomeWelcome";
import StockLists from "../component/Home/StockLists";

function Home() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-row w-9/12 justify-around">
        <div className="w-8/12 ">
          
          <HomeWelcome />
        </div>
        <div className="w-3/12">
          <StockLists />
        </div>
      </div>
    </div>
  )
}

export default Home