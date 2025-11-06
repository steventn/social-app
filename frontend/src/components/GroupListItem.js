// src/components/groups/GroupListItem.js
import React from 'react';
import './GroupListItem.css'; // Assume you have a CSS file for styling

const GroupListItem = ({ group, onClick }) => {
  const { id, name, lastMessage } = group;

  const handleItemClick = () => {
    onClick(id); // Pass the group ID back to the parent to navigate to chat
  };

  return (
    <div className="group-list-item" onClick={handleItemClick}>
      <div className="group-details">
        <h3 className="group-name">{name}</h3>
        <p className="last-message">Last message: "{lastMessage}"</p>
      </div>
    </div>
  );
};

export default GroupListItem;