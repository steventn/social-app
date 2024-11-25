import React, { useState } from "react";
import { addPlayer } from "../services/api";

const AddPlayer = () => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  const handleAddPlayer = async () => {
    try {
      const intUserId = parseInt(userId, 10);
      const response = await addPlayer({ intUserId });
      setMessage(`Player added: ${response.data.username}`);
    } catch (err) {
      setMessage("Error adding player");
    }
  };

  return (
    <div>
      <h3>Add Player by User ID</h3>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleAddPlayer}>Add Player</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddPlayer;
