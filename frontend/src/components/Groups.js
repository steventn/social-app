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

const createGroup = async (newGroup) => {
    // Replace this with your actual API call (e.g., using axios or fetch)
    console.log("Simulating API call to create group:", newGroup);
    return { data: newGroup, status: 201 };
};

const Groups = () => {
  const [name, setName] = useState(''); // Changed from 'title'
  const [description, setDescription] = useState(''); // New field
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userIdInput, setUserIdInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Updated data structure for a Group
    const newGroup = { name, description };

    try {
        // Updated API function call
        const response = await createGroup(newGroup);

        console.log('Group created:', response.data);
        setSuccessMessage('Group created successfully!');

        // Reset form fields
        setName('');
        setDescription('');

    } catch (error) {
        console.error('There was an error creating the group!', error);
        // Optionally, set an error message here
    }
  };

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
    <div>
        <div className="groups-page">
          <header className="page-header">
            <h2>Groups</h2>
          </header>

          {/* 🤝 Add Player by User ID Section */}
          <AddPlayer />

          <hr />

          {/* 👥 Your Groups List */}
          <div className="group-list">
            {groups.map(group => (
            //                 <div key={group.id} className="group-item-card" onClick={() => navigateToGroup(group.id)}>
                <div key={group.id} className="group-item-card">
                    <div className="group-info">
                        <h4>{group.name}</h4>
                        <p>{group.memberCount} members</p>
                    </div>
                </div>
            ))}
          </div>

          <div className="create-form-container">
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Hide Create Group Form' : 'Create Group'}
            </button>
            {showForm && (
                <div>
                    <h2>Create a New Group</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Group Name:</label>
                            <input
                                type="text"
                                value={name} // State variable: name
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Description:</label>
                            <textarea // Using textarea for description
                                value={description} // State variable: description
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit">Create Group</button>
                    </form>
                    {successMessage && <p className="success-banner">{successMessage}</p>}
                </div>
                )}
          </div>
        </div>
    </div>
  );
};

export default Groups;