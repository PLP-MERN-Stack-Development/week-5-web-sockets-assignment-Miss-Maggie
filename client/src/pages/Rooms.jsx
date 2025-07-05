import React, { useState } from 'react';
import RoomList from '../components/RoomList';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';

export default function Rooms() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl mx-auto mt-10">
      <div>
        <RoomList onSelect={setSelectedRoom} />
      </div>
      <div className="flex-1 flex flex-col gap-4">
        {selectedRoom && (
          <>
            <h2 className="text-xl font-bold mb-2 text-white">
              Room: {selectedRoom}
            </h2>
            <MessageList room={selectedRoom} />
            <MessageInput room={selectedRoom} />
          </>
        )}
        {!selectedRoom && (
          <div className="text-gray-400 text-center mt-16">
            Select a room to start chatting.
          </div>
        )}
      </div>
    </div>
  );
}
