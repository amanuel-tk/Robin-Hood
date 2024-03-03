import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

function LineGraph() {
  Chart.register(...registerables);
  const [stockData, setStockData] = useState([]);

  const formattedLabels = stockData.map((stock) => {
    const date = new Date(stock.x);
    return date.toLocaleDateString(); // Format date to display only the date part
  });
  
  const data = {
    labels:formattedLabels,
    datasets: [
      {
        pointBorderColor: "rgba(0,0,0,0)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(0,0,0,0)",
        pointHoverBackgroundColor: "#5AC53B",
        pointHoverBorderColor: "#000000",
        pointHoverBorderWidth: 4,
        pointHoverRadius: 6,
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
        intersect: false, // Display tooltip at any path hovered
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || '';
            if (context.parsed.y !== null) {
              label += ': ' + context.parsed.y;
            }
            return label;
          },}
    },
    
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  function createData() {
    let data = [];
    let value = 50;
    for (var i = 0; i < 365; i++) {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(i);
      date.setDate(i);
      value =
        value + Math.round((Math.random() < 0.5 ? 1 : 0) * Math.random() * 10);
      data.push({ x: date, y: value });
    }
    setStockData(data);
  }
  useEffect(() => {
    createData();
  }, []);
  return (
    <div style={{ height: '300px' }}>
      <Line   data={data} options={options} />
    </div>
  );
}

export default LineGraph;
