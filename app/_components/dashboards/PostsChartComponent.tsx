"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

interface PostsChartComponentProps {
  stats: number[];
}
const PostsChartComponent: React.FC<PostsChartComponentProps> = ({ stats }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const chartOptions = {
    responsive: true,
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Number of posts",
        data: stats,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Bar options={chartOptions} data={chartData} />
    </div>
  );
};

export default PostsChartComponent;
