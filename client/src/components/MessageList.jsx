import React, { useEffect, useRef } from 'react';
import { useMessages } from '../hooks/useMessages';
import { useAuth } from '../hooks/useAuth';

export default function MessageList({ room }) {
  const [messages] = useMessages(room);
  const { user } = useAuth();
  const bottomRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!room) return <div className="text-gray-400">Select a room to view messages.</div>;
  return (
    <div className="bg-gray-900 text-white rounded-xl shadow-lg p-6 mb-2 max-h-80 overflow-y-auto min-h-[120px] flex flex-col gap-2">
      {messages.length === 0 && <div className="text-gray-400 text-center">No messages yet.</div>}
      {messages.map((msg) => (
        <div
          key={msg._id || Math.random()}
          className={`mb-1 px-2 py-1 rounded bg-gray-800/80 flex flex-col ${msg.from?.userId === user?.userId ? 'items-end' : 'items-start'}`}
        >
          <span className="text-xs text-blue-300 font-semibold mb-1">{msg.from?.username || 'Unknown'}</span>
          <span className="text-base">{msg.content}</span>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
