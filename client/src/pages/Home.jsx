import React from "react";

// Importing components for the home page
import HomeWelcome from "../component/Home/HomeWelcome"; // Component displaying welcome message
import StockLists from "../component/Home/StockLists"; // Component displaying list of stocks

// Functional component representing the home page
function Home() {
  return (
    <div className="flex justify-center"> {/* Flex container to center content */}
      <div className="flex flex-row w-9/12 max-sm:flex-col max-sm:w-11/12 max-md:w-11/12 max-lg:w-11/12 max-xl:w-11/12 justify-around"> {/* Flex container for responsive layout */}
        <div className="w-8/12 max-sm:w-full"> {/* Container for welcome message */}
          <HomeWelcome /> {/* Displaying welcome message */}
        </div>
        <div className="w-3/12 max-sm:w-full"> {/* Container for stock lists */}
          <StockLists /> {/* Displaying list of stocks */}
        </div>
      </div>
    </div>
  );
}

export default Home; // Exporting the Home component as default
