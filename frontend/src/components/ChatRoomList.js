// src/components/ChatRoomList.js
import React, { useState, useEffect } from 'react';
import { fetchChatRooms } from '../services/api';

const ChatRoomList = ({ token }) => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetchChatRooms(token);
                setRooms(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRooms();
    }, [token]);

    return (
        <div>
            <h2>Chat Rooms</h2>
            <ul>
                {rooms.map((room) => (
                    <li key={room.id}>{room.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ChatRoomList;