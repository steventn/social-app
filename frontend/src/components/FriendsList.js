import React, { useState } from 'react';
import { fetchFriends } from "../services/api";

const FriendsList = () => {
    const [friends, setFriends] = useState([]);
    const [error, setError] = useState('');

    const fetchFriendsList = async () => {
        try {
            const response = await fetchFriends();
            setFriends(response.data.friends);
            setError('');
        } catch (err) {
            setError('Failed to fetch friends. Please try again.');
        }
    };

    return (
        <div>
            <button onClick={fetchFriendsList}>Show Friends</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {friends.length > 0 && (
                <ul>
                    {friends.map((friend) => (
                        <li key={friend.id}>
                            {friend.username}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FriendsList;