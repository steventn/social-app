import React, { useState } from 'react';
import Schedule from './Schedule';
import Nearby from './Nearby';
import Groups from './Groups';
import Profile from './Profile';
import './HomeScreen.css';

const HomeScreen = () => {
    const [selectedView, setSelectedView] = useState('Schedule');

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
                return <Schedule />;
        }
    };

    return (
        <div className="home-screen">
            <div className="nav-bar">
                <button onClick={() => setSelectedView('Schedule')}>Schedule</button>
                <button onClick={() => setSelectedView('Nearby')}>Nearby</button>
                <button onClick={() => setSelectedView('Groups')}>Groups</button>
                <button onClick={() => setSelectedView('Profile')}>Profile</button>
            </div>
            <div className="view-container">
                {renderView()}
            </div>
        </div>
    );
};

export default HomeScreen;