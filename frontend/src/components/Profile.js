import React, { useEffect, useState } from 'react';
import { fetchProfile } from "../services/api";
import FriendsList from './FriendsList';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetchProfile();
                setProfile(response.data);
                setError('');
            } catch (err) {
                setError('Failed to fetch profile. Please try again.');
            }
        };

        fetchUserProfile();
    }, []);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1>Your Profile</h1>
            {profile ? (
                <div>
                    <p><strong>Username:</strong> {profile.username}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}

            <FriendsList />
        </div>
    );
};

export default Profile;
