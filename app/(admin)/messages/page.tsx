"use client"
import React from 'react';
import Link from 'next/link';

const messagesData = [
  {
    id: 1,
    username: 'Jane Doe',
    email: 'jane.doe@example.com',
    messages: [
      'I love the food and the delivery was super fast!',
      'Will definitely order again.'
    ],
    timeDelivered: '2025-05-23 10:15 AM',
  },
  {
    id: 2,
    username: 'John Smith',
    email: 'john.smith@example.com',
    messages: [
      'The pizza was a bit cold when it arrived.',
      'But the taste was great!'
    ],
    timeDelivered: '2025-05-22 08:45 PM',
  },
  {
    id: 3,
    username: 'Emily Johnson',
    email: 'emily.j@example.com',
    messages: [
      'Amazing service and friendly staff.',
      'Thank you for the quick response to my query.'
    ],
    timeDelivered: '2025-05-21 03:30 PM',
  },
];

const Messages = () => {
  return (
    <div className="min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-[#000000]">User Messages & Reviews</h1>
      <div className="max-w-3xl mx-auto space-y-6">
        {messagesData.map((msg) => (
          <div key={msg.id} className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center gap-4 border border-gray-100">
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                <div>
                  <div className="font-semibold text-lg text-gray-800">{msg.username}</div>
                  <div className="text-gray-500 text-sm">{msg.email}</div>
                </div>
                <div className="mt-2 md:mt-0 md:ml-8">
                  <span className="inline-block bg-gray-100 text-gray-700 rounded px-2 py-1 text-xs font-medium mr-2">{msg.messages.length} messages</span>
                  <span className="inline-block bg-gray-100 text-gray-700 rounded px-2 py-1 text-xs font-medium">Delivered: {msg.timeDelivered}</span>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  href={`/admin/messages/${msg.id}`}
                  className="text-[#ff2c2c] underline text-sm font-medium hover:text-[#e01b1b] transition"
                >
                  Open Chat
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
