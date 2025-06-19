"use client";
import React, { useState, useEffect } from "react";

interface OrderItem {
	name: string;
	qty: number;
}

interface Order {
	id: string;
	items: OrderItem[];
	total: number;
	time: string;
	location: string;
	status: "Delivered" | "Pending" | "Canceled";
}

const ordersData: Order[] = [
	{
		id: "ORD-1001",
		items: [
			{ name: "Pizza Margherita", qty: 2 },
			{ name: "Coke", qty: 3 },
		],
		total: 5,
		time: "2025-05-23 12:30 PM",
		location: "123 Main St, Springfield",
		status: "Delivered",
	},
	{
		id: "ORD-1002",
		items: [
			{ name: "Burger", qty: 1 },
			{ name: "Fries", qty: 2 },
			{ name: "Sprite", qty: 1 },
		],
		total: 4,
		time: "2025-05-23 01:15 PM",
		location: "456 Oak Ave, Shelbyville",
		status: "Pending",
	},
	{
		id: "ORD-1003",
		items: [{ name: "Chicken Wrap", qty: 2 }],
		total: 2,
		time: "2025-05-22 06:45 PM",
		location: "789 Pine Rd, Capital City",
		status: "Canceled",
	},
	{
		id: "ORD-1004",
		items: [
			{ name: "Veggie Pizza", qty: 1 },
			{ name: "Lemonade", qty: 2 },
		],
		total: 3,
		time: "2025-05-22 07:30 PM",
		location: "321 Elm St, Ogdenville",
		status: "Delivered",
	},
	{
		id: "ORD-1005",
		items: [
			{ name: "Fish Tacos", qty: 3 },
			{ name: "Water", qty: 2 },
		],
		total: 5,
		time: "2025-05-23 02:00 PM",
		location: "654 Maple Ave, North Haverbrook",
		status: "Pending",
	},
	{
		id: "ORD-1006",
		items: [
			{ name: "BBQ Ribs", qty: 2 },
			{ name: "Coleslaw", qty: 1 },
		],
		total: 3,
		time: "2025-05-21 05:20 PM",
		location: "987 Cedar Blvd, Brockway",
		status: "Delivered",
	},
	{
		id: "ORD-1007",
		items: [
			{ name: "Pasta Alfredo", qty: 1 },
			{ name: "Garlic Bread", qty: 2 },
		],
		total: 3,
		time: "2025-05-23 03:10 PM",
		location: "159 Spruce St, Springfield",
		status: "Canceled",
	},
];

const statusColors: Record<Order["status"], string> = {
	Delivered: "bg-green-100 text-green-700 border-green-300",
	Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
	Canceled: "bg-red-100 text-red-700 border-red-300",
};

const FoodOrder = () => {
	const [orders] = useState<Order[]>(ordersData);
	const [filter, setFilter] = useState<Order["status"] | "All">("All");
	const [showTopBtn, setShowTopBtn] = useState(false);

	useEffect(() => {
		const handleScroll = () => setShowTopBtn(window.scrollY > 0);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const filteredOrders =
		filter === "All"
			? orders
			: orders.filter((order) => order.status === filter);

	const handleEdit = (id: string) => {
		alert(`Edit order: ${id}`);
	};

	return (
		<div className="min-h-screen py-10 px-4">
			<h1 className="text-3xl font-bold mb-8 text-[#000000]">
				Food Orders
			</h1>
			<div className="mb-6 flex flex-wrap gap-4 items-center">
				<label className="font-medium text-gray-700">Filter by status:</label>
				<select
					className="border rounded px-3 py-2 focus:outline-none focus:border-[#ff2c2c] transition"
					value={filter}
					onChange={(e) =>
						setFilter(e.target.value as Order["status"] | "All")
					}
				>
					<option value="All">All</option>
					<option value="Pending">Pending</option>
					<option value="Delivered">Delivered</option>
					<option value="Canceled">Canceled</option>
				</select>
			</div>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white rounded-lg shadow border">
					<thead>
						<tr className="bg-gray-100 text-gray-700 text-sm">
							<th className="py-3 px-4 text-left">Order ID</th>
							<th className="py-3 px-4 text-left">Items (Group)</th>
							<th className="py-3 px-4 text-center">Total</th>
							<th className="py-3 px-4 text-left">Time of Order</th>
							<th className="py-3 px-4 text-left">Delivery Location</th>
							<th className="py-3 px-4 text-center">Status</th>
							<th className="py-3 px-4 text-center">Edit</th>
						</tr>
					</thead>
					<tbody>
						{filteredOrders.map((order) => (
							<tr
								key={order.id}
								className="border-b last:border-b-0 hover:bg-gray-50 transition"
							>
								<td className="py-3 px-4 font-semibold">{order.id}</td>
								<td className="py-3 px-4">
									<ul className="list-disc pl-5 space-y-1">
										{order.items.map((item, idx) => (
											<li key={idx} className="text-gray-700">
												{item.name}{" "}
												<span className="text-xs text-gray-400">
													x{item.qty}
												</span>
											</li>
										))}
									</ul>
								</td>
								<td className="py-3 px-4 text-center font-bold">
									{order.total}
								</td>
								<td className="py-3 px-4">{order.time}</td>
								<td className="py-3 px-4">{order.location}</td>
								<td className="py-3 px-4 text-center">
									<span
										className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${statusColors[order.status]}`}
									>
										{order.status}
									</span>
								</td>
								<td className="py-3 px-4 text-center">
									<button
										className={`bg-[#ff2c2c] text-white px-3 py-1 rounded transition text-xs font-semibold
										${
											order.status !== "Pending"
												? " opacity-50 cursor-not-allowed"
												: " hover:bg-[#e01b1b] cursor-pointer"
										}`}
										onClick={() =>
											order.status === "Pending" &&
											handleEdit(order.id)
										}
										disabled={order.status !== "Pending"}
									>
										Edit
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{showTopBtn && (
				<button
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					className="fixed bottom-8 right-8 bg-[#ff2c2c] text-white rounded-full p-4 shadow-lg hover:bg-[#e01b1b] transition z-50"
					aria-label="Back to top"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
					</svg>
				</button>
			)}
		</div>
	);
};

export default FoodOrder;
