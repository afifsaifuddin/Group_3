import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { Box } from "@chakra-ui/react";

const AdminLaporanChart = ({ transactionGraph }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  console.log(transactionGraph);
  useEffect(() => {
    const generateLineChart = () => {
      const chartLabels = transactionGraph.map((transaction) =>
        format(new Date(transaction.transactionDate), "yyyy-MM-dd")
      );
      const chartData = transactionGraph.map((transaction) => transaction.totalPrice);

      const chartConfig = {
        type: "bar",
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: "Total Sales",
              data: chartData,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      if (chartRef.current) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(chartRef.current, chartConfig);
      }
    };

    generateLineChart();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [transactionGraph]);

  return <canvas ref={chartRef} id="line-chart" />;
};

export default AdminLaporanChart;
