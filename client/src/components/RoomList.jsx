import React, { useEffect, useState } from 'react';
import { fetchRooms, createRoom } from '../api/rooms';
import { useAuth } from '../hooks/useAuth';

export default function RoomList({ onSelect }) {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetchRooms(user.token)
      .then(setRooms)
      .catch(() => setError('Failed to load rooms'))
      .finally(() => setLoading(false));
  }, [user]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newRoom.trim()) return;
    setLoading(true);
    setError('');
    try {
      const room = await createRoom(newRoom, user.token);
      setRooms((prev) => [...prev, room]);
      setNewRoom('');
    } catch {
      setError('Failed to create room');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-xl shadow-lg p-6 w-72 flex flex-col gap-4">
      <h3 className="text-lg font-bold mb-2 text-center">Rooms</h3>
      {loading && <div className="text-blue-400 text-center">Loading...</div>}
      {error && <div className="text-red-400 text-center">{error}</div>}
      <ul className="mb-2 flex-1 overflow-y-auto">
        {rooms.length === 0 && <li className="text-gray-400 text-center">No rooms yet.</li>}
        {rooms.map((room) => (
          <li key={room._id || room.name}>
            <button className="w-full block px-2 py-2 rounded hover:bg-blue-800 transition text-left" onClick={() => onSelect && onSelect(room.name)}>{room.name}</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreate} className="flex gap-2">
        <input
          className="flex-1 border border-gray-700 rounded px-2 py-1 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={newRoom}
          onChange={e => setNewRoom(e.target.value)}
          placeholder="New room name"
        />
        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition whitespace-nowrap" style={{ minWidth: 0, width: 'auto' }} type="submit">Create</button>
      </form>
    </div>
  );
}
