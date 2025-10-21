import React, { useState } from 'react';
import Schedule from './Schedule';
import Nearby from './Nearby';
import Groups from './Groups';
import Profile from './Profile';
import './HomeScreen.css';
import { Link } from "react-router-dom";

// A simple component to render the modern 'No Games Scheduled' state
const ScheduleEmptyState = () => (
    <div className="schedule-view">
        <h2 className="no-games-header">No games scheduled.</h2>

        <div className="empty-state-card">
            {/* Replace this text '🎾' with a proper icon/illustration in a real app */}
            <div className="empty-state-icon">🎾</div>

            <h3>Ready to Play?</h3>
            <p>Create the first match!</p>

            <button className="create-game-btn">
                {/* Plus Icon */}
                <span style={{ fontSize: '1.2em' }}>+</span>
                Create Game
            </button>
        </div>
    </div>
);


const HomeScreen = () => {
    // Note: The 'selectedView' state controls both the content and the active tab style
    const [selectedView, setSelectedView] = useState('Schedule');

    const navItems = [
        { name: 'Schedule', icon: '🗓️' },
        { name: 'Nearby', icon: '📍' },
        { name: 'Groups', icon: '💬' },
        { name: 'Profile', icon: '👤' },
    ];

    const renderView = () => {
        switch (selectedView) {
            case 'Schedule':
                return <Schedule />;
            case 'Nearby':
                return <Nearby />;
            case 'Groups':
                return <Groups />;
            case 'Profile':
                return <Profile />;
            default:
                return <ScheduleEmptyState />;
        }
    };

    return (
        <div className="home-screen">
            {/* --- Top Header (Title and Logout) --- */}
            <div className="top-header">
                {/* The title should match the active tab for a better experience */}
                <h1 className="screen-title">{selectedView}</h1>
                <Link to="/logout" className="logout-link">Logout</Link>
            </div>

            {/* --- Main Content View --- */}
            <div className="view-container">
                {renderView()}
            </div>

            {/* --- Bottom Navigation Bar --- */}
            <div className="nav-bar">
                {navItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setSelectedView(item.name)}
                        className={`nav-item ${selectedView === item.name ? 'active' : ''}`}
                    >
                        {/* Icon */}
                        <span className="nav-item-icon">{item.icon}</span>
                        {/* Text Label */}
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HomeScreen;