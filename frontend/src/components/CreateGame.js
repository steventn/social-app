import React, { useState } from 'react';
import { createGame } from "../services/api";
import './CreateGame.css';

const CreateGame = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newGame = { title, date, time, location };
        try {
            const response = await createGame(newGame);
            console.log('Game created:', response.data);
            setSuccessMessage('Game created successfully!');
            setTitle('');
            setDate('');
            setTime('');
            setLocation('');
        } catch (error) {
            console.error('There was an error creating the game!', error);
        }
    };

    return (
        <div className="create-game-container">
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Hide Create Game Form' : 'Create Game'}
            </button>
            {showForm && (
                <div>
                    <h2>Create a New Game</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Title:</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Date:</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Time:</label>
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Location:</label>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Create Game</button>
                    </form>
                    {successMessage && <p className="success-banner">{successMessage}</p>}
                </div>
            )}
        </div>
    );
};

export default CreateGame;