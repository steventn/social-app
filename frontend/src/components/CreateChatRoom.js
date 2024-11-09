// src/components/CreateChatRoom.js
import React, { useState } from 'react';
import { createChatRoom } from '../services/api';

const CreateChatRoom = ({ token }) => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createChatRoom({ name }, token);
            alert('Chat room created successfully');
            setName('');
        } catch (error) {
            console.error(error);
            alert('Failed to create chat room');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Chat Room Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <button type="submit">Create Chat Room</button>
        </form>
    );
};

export default CreateChatRoom;