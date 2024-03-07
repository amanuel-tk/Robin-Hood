import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Loading from "../Images/loading.gif";

function LineGraph({ graphData }) {
  // Register chart.js components
  Chart.register(...registerables);

  // State to manage line color
  const [lineColor, setLineColor] = useState("");

  // Effect to determine line color based on price change
  useEffect(() => {
    if (graphData && graphData.length >= 2) {
      const firstPrice = graphData[0].price;
      const lastPrice = graphData[graphData.length - 1].price;
      const isPriceUp = firstPrice >= lastPrice;
      const lineColor = isPriceUp ? "#ff0000" : "#22c55e"; // Set line color based on price trend
      setLineColor(lineColor);
    } else {
      setLineColor("#22c55e"); // Default line color
    }
  }, [graphData]);

  // Define chart data and options
  const data = {
    labels: graphData.map((stock) => stock.date), // Labels for x-axis
    datasets: [
      {
        pointBorderColor: "rgba(0,0,0,0)",
        borderWidth: 1,
        pointBackgroundColor: "rgba(0,0,0,0)",
        pointHoverBackgroundColor: "#5AC53B",
        pointHoverBorderColor: "#000000",
        pointHoverBorderWidth: 4,
        pointHoverRadius: 6,
        borderColor: lineColor, // Line color
        data: graphData.map((stock) => stock.price), // Data points for y-axis
        tension: 0.1, //Smoothness of the Line
      },
    ],
  };
  const options = {
    scales: {
      x: {
        display: false, // Hide x-axis gridlines
      },
      y: {
        display: false, // Hide the y-axis
      },
    },
    plugins: {
      tooltip: {
        intersect: false, // Display tooltip at any path hovered
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || "";
            if (context.parsed.y !== null) {
              label += ": " + context.parsed.y; // Display tooltip with value on hover
            }
            return label;
          },
        },
      },

      legend: {
        display: false, // Hide the legend
      },
    },
  };

  if (!graphData || graphData.length === 0) {
    // If graphData is not available or empty, return a loading indicator or placeholder
    return (
      <div className="loading">
        <img src={Loading} alt="Loading..." />
      </div>
    );
  }
  // Render the LineGraph component with data and options
  return (
    <div style={{ height: "300px" }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default LineGraph;
