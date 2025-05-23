"use client";
import React from "react";

const reviews = [
	{
		username: "Jane Doe",
		email: "jane.doe@example.com",
		review:
			"The pizza was delicious and the delivery was super fast! Highly recommend.",
		rating: 5,
	},
	{
		username: "John Smith",
		email: "john.smith@example.com",
		review:
			"Burger was juicy but the fries were a bit cold. Overall good experience.",
		rating: 4,
	},
	{
		username: "Emily Johnson",
		email: "emily.j@example.com",
		review: "Loved the pasta! The garlic bread was fresh and tasty.",
		rating: 5,
	},
	{
		username: "Michael Brown",
		email: "michael.brown@example.com",
		review:
			"The drinks were great but my order took longer than expected.",
		rating: 3,
	},
	{
		username: "Sarah Lee",
		email: "sarah.lee@example.com",
		review: "Amazing service and friendly staff. Will order again!",
		rating: 5,
	},
];

const Star = ({ filled }: { filled: boolean }) => (
	<span className={filled ? "text-yellow-400" : "text-gray-300"}>&#9733;</span>
);

const Feedback = () => {
	return (
		<div className="min-h-screen py-10 px-4">
			<h1 className="text-3xl font-bold mb-8 text-[#000000]">
				Product Reviews & Feedback
			</h1>
			<div className="max-w-2xl mx-auto space-y-6">
				{reviews.map((r, idx) => (
					<div
						key={idx}
						className="bg-white rounded-lg shadow p-6 border border-gray-100"
					>
						<div className="flex items-center mb-2 justify-between">
							<div>
								<div className="font-semibold text-lg text-gray-800">
									{r.username}
								</div>
								<div className="text-gray-500 text-sm">{r.email}</div>
							</div>
							<div className="flex">
								{[1, 2, 3, 4, 5].map((n) => (
									<Star key={n} filled={n <= r.rating} />
								))}
							</div>
						</div>
						<div className="text-gray-700 text-base mb-4">{r.review}</div>
						<button
							className="bg-[#ff2c2c] text-white px-4 py-2 rounded hover:bg-[#e01b1b] transition font-semibold text-sm"
							onClick={() => alert(`Contacting back: ${r.email}`)}
						>
							Contact Back
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Feedback;
