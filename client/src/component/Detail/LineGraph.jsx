import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Loading from "../Images/loading.gif";

function LineGraph({ graphData }) {
  Chart.register(...registerables);
  const [lineColor, setLineColor] = useState("");
  useEffect(() => {
    if (graphData && graphData.length >= 2) {
      const firstPrice = graphData[0].price;
      const lastPrice = graphData[graphData.length - 1].price;
      const isPriceUp = firstPrice >= lastPrice;
      const lineColor = isPriceUp ? "#ff0000" : "#22c55e";
      setLineColor(lineColor);
    } else {
      setLineColor("#22c55e");
    }
  }, [graphData]);
  const data = {
    labels: graphData.map((stock) => stock.date),
    datasets: [
      {
        pointBorderColor: "rgba(0,0,0,0)",
        borderWidth: 1,
        pointBackgroundColor: "rgba(0,0,0,0)",
        pointHoverBackgroundColor: "#5AC53B",
        pointHoverBorderColor: "#000000",
        pointHoverBorderWidth: 4,
        pointHoverRadius: 6,
        borderColor: lineColor,
        data: graphData.map((stock) => stock.price),
        tension: 0.1,
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
              label += ": " + context.parsed.y;
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
  return (
    <div style={{ height: "300px" }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default LineGraph;
