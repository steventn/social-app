import React, { useEffect, useState } from 'react';
import { getGames } from '../services/api';
const DisplaySchedule = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await getGames();
                setGames(response.data);
            } catch (error) {
                console.error('There was an error fetching the games!', error);
            }
        };

        fetchGames();
    }, []);

    return (
        <div>
            <h2>Schedule</h2>
            {games.length > 0 ? (
                <ul>
                    {games.map((game) => (
                        <li key={game.id}>
                            <p>Title: {game.title}</p>
                            <p>Date: {game.date}</p>
                            <p>Time: {game.time}</p>
                            <p>Location: {game.location}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No games scheduled.</p>
            )}
        </div>
    );
};

export default DisplaySchedule;