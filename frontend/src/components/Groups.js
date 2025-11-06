// src/pages/Groups/Groups.js
import React, { useState, useEffect } from 'react';
import AddPlayer from "./AddPlayer";
import GroupListItem from './GroupListItem';
import './Groups.css'; // Assume a CSS file for page layout

// Dummy data structure mirroring the UI mock-up
const DUMMY_GROUPS = [
  { id: 1, name: 'Monday Night Crew', lastMessage: 'See you all @ 7!' },
  { id: 2, name: 'Westside Advanced Players', lastMessage: 'Court 3 is open.' },
  { id: 3, name: 'Lunchtime Games', lastMessage: 'Anyone free tmrw?' },
  { id: 4, name: 'Family Fun Group', lastMessage: 'Got ah neo new paddles' },
];

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userIdInput, setUserIdInput] = useState('');

  // Simulating data fetching from the Django API
  useEffect(() => {
    // In a real app, you'd make an API call here:
    // fetch('/api/groups')
    //   .then(res => res.json())
    //   .then(data => { setGroups(data); setLoading(false); });

    setTimeout(() => {
      setGroups(DUMMY_GROUPS);
      setLoading(false);
    }, 500);
  }, []);

  const handleGroupClick = (groupId) => {
    console.log(`Navigating to ChatRoom ID: ${groupId}`);
    // In a real app, use React Router: history.push(`/chat/${groupId}`);
  };

  const handleAddPlayer = () => {
    if (userIdInput) {
      console.log(`Adding player with User ID: ${userIdInput}`);
      // API call to add member: POST /api/groups/add-member/
      setUserIdInput('');
    }
  };

  const handleCreateNewGroup = () => {
    console.log('Opening Create New Group modal/page...');
    // In a real app, this would open a modal or navigate to a creation form
  };

  if (loading) {
    return <div className="groups-page">Loading groups...</div>;
  }

  return (
    <div className="groups-page">
      <header className="page-header">
        <h2>Groups</h2>
      </header>

      {/* 🤝 Add Player by User ID Section */}
      <AddPlayer />


      <hr />

      {/* 👥 Your Groups List */}
      <section className="group-list-section">
        <h3>Your Groups ({groups.length})</h3>
        <div className="group-list-container">
          {groups.map((group) => (
            <GroupListItem key={group.id} group={group} onClick={handleGroupClick} />
          ))}
        </div>
      </section>

      {/* ➕ Floating Action Button (FAB) */}
      <button className="fab-button" onClick={handleCreateNewGroup}>
        +
      </button>

      {/* Note: The bottom Navigation Bar would typically be a separate layout component */}
    </div>
  );
};

export default Groups;