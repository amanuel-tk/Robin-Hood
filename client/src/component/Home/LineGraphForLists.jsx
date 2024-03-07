import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

function LineGraphForLists() {
  Chart.register(...registerables);
  const [stockData, setStockData] = useState([]);

  const formattedLabels = stockData.map((stock) => {
    const date = new Date(stock.x);
    return date.toLocaleDateString(); // Format date to display only the date part
  });

  const data = {
    labels: formattedLabels,
    datasets: [
      {
        pointRadius: 0, // Hide points
        pointHoverRadius: 0,
        borderColor: "rgb(255, 99, 12)",
        data: stockData.map((stock) => stock.y),
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
        enabled: false, // Hide tooltips
      },

      legend: {
        display: false, // Hide the legend
      },
    },
  };

  function createData() {
    let data = [];
    let value = 50;
    for (var i = 0; i < 24; i++) {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(i);
      date.setDate(i);
      value = value + Math.round(Math.random() * Math.random() * 10);
      data.push({ x: date, y: value });
      // console.log(value);
    }
    setStockData(data);
  }
  useEffect(() => {
    createData();
  }, []);
  return (
    <div style={{ height: "50px" }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default LineGraphForLists;
