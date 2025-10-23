import React, { useEffect, useState } from 'react';
import CreateGame from "./CreateGame";
import { getGames } from '../services/api';

const ScheduleEmptyState = () => (
    <div className="schedule-view">
        <h2 className="no-games-header">No games scheduled.</h2>

        <div className="empty-state-card">
            {/* Replace this text '🎾' with a proper icon/illustration in a real app */}
            <div className="empty-state-icon">🎾</div>

            <h3>Ready to Play?</h3>
            <p>Create the first match!</p>

        </div>
        <CreateGame />

    </div>
);

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
                <ScheduleEmptyState />
            )}
        </div>
    );
};

export default DisplaySchedule;