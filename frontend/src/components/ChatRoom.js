import React, { useEffect, useState } from 'react';

function ChatRoom({ roomName }) {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    let socket;

    useEffect(() => {
        socket = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);

        socket.onmessage = function (event) {
            const data = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, data.message]);
        };

        return () => socket.close();
    }, [roomName]);

    const sendMessage = () => {
        if (messageInput.trim() && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ message: messageInput }));
            setMessageInput('');
        }
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default ChatRoom;
