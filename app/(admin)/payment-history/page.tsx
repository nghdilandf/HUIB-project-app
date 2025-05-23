"use client";
import React, { useState } from "react";

interface PaymentItem {
  name: string;
  qty: number;
}

interface Payment {
  id: string;
  items: PaymentItem[];
  total: number;
  date: string;
  status: "Paid" | "Unpaid" | "Took on Promo";
}

const paymentData: Payment[] = [
  {
    id: "ORD-1001",
    items: [
      { name: "Pizza Margherita", qty: 2 },
      { name: "Coke", qty: 3 },
    ],
    total: 45,
    date: "2025-05-23",
    status: "Paid",
  },
  {
    id: "ORD-1002",
    items: [
      { name: "Burger", qty: 1 },
      { name: "Fries", qty: 2 },
      { name: "Sprite", qty: 1 },
    ],
    total: 32,
    date: "2025-05-23",
    status: "Unpaid",
  },
  {
    id: "ORD-1003",
    items: [
      { name: "Chicken Wrap", qty: 2 },
    ],
    total: 20,
    date: "2025-05-22",
    status: "Took on Promo",
  },
  {
    id: "ORD-1004",
    items: [
      { name: "Veggie Pizza", qty: 1 },
      { name: "Lemonade", qty: 2 },
    ],
    total: 28,
    date: "2025-05-22",
    status: "Paid",
  },
  {
    id: "ORD-1005",
    items: [
      { name: "Fish Tacos", qty: 3 },
      { name: "Water", qty: 2 },
    ],
    total: 35,
    date: "2025-05-23",
    status: "Unpaid",
  },
  {
    id: "ORD-1006",
    items: [
      { name: "BBQ Ribs", qty: 2 },
      { name: "Coleslaw", qty: 1 },
    ],
    total: 30,
    date: "2025-05-21",
    status: "Paid",
  },
  {
    id: "ORD-1007",
    items: [
      { name: "Pasta Alfredo", qty: 1 },
      { name: "Garlic Bread", qty: 2 },
    ],
    total: 25,
    date: "2025-05-23",
    status: "Unpaid",
  },
];

const statusColors: Record<Payment["status"], string> = {
  Paid: "bg-green-100 text-green-700 border-green-300",
  Unpaid: "bg-red-100 text-red-700 border-red-300",
  "Took on Promo": "bg-yellow-100 text-yellow-700 border-yellow-300",
};

const PaymentHistory = () => {
  const [payments] = useState<Payment[]>(paymentData);
  const [filter, setFilter] = useState<Payment["status"] | "All">("All");

  const filteredPayments = filter === "All"
    ? payments
    : payments.filter((p) => p.status === filter);

  return (
    <div className="min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-[#000000]">Payment History</h1>
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <label className="font-medium text-gray-700">Filter by status:</label>
        <select
          className="border rounded px-3 py-2 focus:outline-none focus:border-[#ff2c2c] transition"
          value={filter}
          onChange={e => setFilter(e.target.value as Payment["status"] | "All")}
        >
          <option value="All">All</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Took on Promo">Took on Promo</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow border">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">Items (Group)</th>
              <th className="py-3 px-4 text-center">Total Amount ($)</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id} className="border-b last:border-b-0 hover:bg-gray-50 transition">
                <td className="py-3 px-4 font-semibold">{payment.id}</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    {payment.items.map((item, idx) => (
                      <li key={idx} className="text-gray-700">
                        {item.name} <span className="text-xs text-gray-400">x{item.qty}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-3 px-4 text-center font-bold">${payment.total}</td>
                <td className="py-3 px-4">{payment.date}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${statusColors[payment.status]}`}>{payment.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
