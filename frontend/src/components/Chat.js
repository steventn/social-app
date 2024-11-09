// src/components/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import { fetchMessages } from '../services/api';

const Chat = ({ token, roomId }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const socket = useRef(null);

    useEffect(() => {
        const fetchMessagesData = async () => {
            try {
                const response = await fetchMessages(roomId, token);
                setMessages(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMessagesData();
    }, [roomId, token]);

    useEffect(() => {
        socket.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomId}/`);
        socket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, data.message]);
        };
        return () => socket.current.close();
    }, [roomId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.current.send(JSON.stringify({ message }));
        setMessage('');
    };

    return (
        <div>
            <h2>Chat Room</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;