"use client";
import React, { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const salesData = {
  "24h": [
    { product: "Pizza", sales: 12 },
    { product: "Burger", sales: 8 },
    { product: "Pasta", sales: 5 },
    { product: "Drinks", sales: 10 },
  ],
  "7d": [
    { product: "Pizza", sales: 60 },
    { product: "Burger", sales: 40 },
    { product: "Pasta", sales: 25 },
    { product: "Drinks", sales: 50 },
  ],
  "30d": [
    { product: "Pizza", sales: 200 },
    { product: "Burger", sales: 150 },
    { product: "Pasta", sales: 90 },
    { product: "Drinks", sales: 170 },
  ],
  general: [
    { product: "Pizza", sales: 1200 },
    { product: "Burger", sales: 900 },
    { product: "Pasta", sales: 600 },
    { product: "Drinks", sales: 1100 },
  ],
};

const filterOptions = [
  { label: "Last 24 Hours", value: "24h" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "General", value: "general" },
];

const Analysis = () => {
  const [filter, setFilter] = useState("24h");
  const data = salesData[filter];

  const pieData = {
    labels: data.map((d) => d.product),
    datasets: [
      {
        data: data.map((d) => d.sales),
        backgroundColor: [
          "#ff2c2c",
          "#ff9800",
          "#4caf50",
          "#2196f3",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: data.map((d) => d.product),
    datasets: [
      {
        label: "Sales",
        data: data.map((d) => d.sales),
        backgroundColor: "#ff2c2c",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-[#000000]">Sales Analysis</h1>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            className={`px-4 py-2 rounded font-semibold border transition
              ${filter === opt.value ? "bg-[#ff2c2c] text-white border-[#ff2c2c]" : "bg-white text-[#ff2c2c] border-[#ff2c2c] hover:bg-[#ff2c2c] hover:text-white"}
            `}
            onClick={() => setFilter(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-[#ff2c2c]">Sales Distribution (Pie Chart)</h2>
          <Pie data={pieData} />
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-[#ff2c2c]">Sales by Product (Bar Chart)</h2>
          <Bar data={barData} options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              title: { display: false },
            },
            scales: {
              y: { beginAtZero: true },
            },
          }} />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
