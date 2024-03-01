import React from "react";
import StockInfo from "../component/Home/StockInfo";
import StockLists from "../component/Home/StockLists";
function Home() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-row w-9/12">
        <div className="w-8/12">
 <StockInfo  />
        </div>
         <div  className="w-4/12">
          <StockLists/>
         </div>
          
      </div>
    </div>
  );
}

export default Home;
