"use client"
import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const messagesData = [
  {
    id: 1,
    username: 'Jane Doe',
    email: 'jane.doe@example.com',
    messages: [
      { text: 'I love the food and the delivery was super fast!', from: 'user' },
      { text: 'Will definitely order again.', from: 'user' }
    ],
    timeDelivered: '2025-05-23 10:15 AM',
  },
  {
    id: 2,
    username: 'John Smith',
    email: 'john.smith@example.com',
    messages: [
      { text: 'The pizza was a bit cold when it arrived.', from: 'user' },
      { text: 'But the taste was great!', from: 'user' }
    ],
    timeDelivered: '2025-05-22 08:45 PM',
  },
  {
    id: 3,
    username: 'Emily Johnson',
    email: 'emily.j@example.com',
    messages: [
      { text: 'Amazing service and friendly staff.', from: 'user' },
      { text: 'Thank you for the quick response to my query.', from: 'user' }
    ],
    timeDelivered: '2025-05-21 03:30 PM',
  },
];

const ChatPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const user = messagesData.find((m) => m.id === id);
  const [chat, setChat] = useState(user ? [...user.messages] : []);
  const [reply, setReply] = useState('');

  if (!user) return <div className="p-8 text-center">User not found.</div>;

  const handleReply = () => {
    if (reply.trim()) {
      setChat([...chat, { text: reply, from: 'admin' }]);
      setReply('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow p-6">
        <button className="mb-4 text-[#ff2c2c] underline" onClick={() => router.back()}>&larr; Back to Messages</button>
        <div className="mb-4">
          <div className="font-semibold text-lg text-gray-800">{user.username}</div>
          <div className="text-gray-500 text-sm">{user.email}</div>
          <div className="text-xs text-gray-400 mt-1">Delivered: {user.timeDelivered}</div>
        </div>
        <div className="h-64 overflow-y-auto bg-gray-50 rounded p-4 mb-4 flex flex-col gap-2 border">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.from === 'admin' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs break-words shadow text-sm ${
                  msg.from === 'admin'
                    ? 'bg-[#ff2c2c] text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:border-[#ff2c2c] transition"
            placeholder="Type your reply..."
            value={reply}
            onChange={e => setReply(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleReply(); }}
          />
          <button
            className="bg-[#ff2c2c] text-white px-4 py-2 rounded hover:bg-[#e01b1b] transition font-semibold"
            onClick={handleReply}
            disabled={!reply.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
