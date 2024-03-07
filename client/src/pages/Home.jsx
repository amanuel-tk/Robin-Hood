import React from "react";

import HomeWelcome from "../component/Home/HomeWelcome";
import StockLists from "../component/Home/StockLists";

function Home() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-row w-9/12 max-sm:flex-col max-sm:w-11/12 max-md:w-11/12 max-lg:w-11/12 max-xl:w-11/12 justify-around">
        <div className="w-8/12 max-sm:w-full">
          <HomeWelcome />
        </div>
        <div className="w-3/12 max-sm:w-full">
          <StockLists />
        </div>
      </div>
    </div>
  );
}

export default Home;
