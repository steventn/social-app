// src/components/groups/CreateGroup.js

import React, { useState } from 'react';
import './CreateForm.css';


const CreateGroup = ({ onCreateSuccess, createGroupApi }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');
        setSuccessMessage('');

        const newGroup = { name, description };

        try {
            const response = await createGroupApi(newGroup);

            console.log('Group created:', response.data);
            setSuccessMessage('Group created successfully!');

            // Pass the new group data back to the parent component
            onCreateSuccess(response.data);

            // Reset form fields
            setName('');
            setDescription('');
            // Optional: Hide form on success
            // setShowForm(false);

        } catch (error) {
            console.error('There was an error creating the group!', error);
            setErrorMessage('Failed to create group. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-form-container">
            <button
                className="create-group-toggle-btn"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? 'Hide Form' : 'Start a New Group'}
            </button>

            {showForm && (
                <div className="create-group-form-area">
                    <h2>Create a New Group</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Group Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Description:</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Creating...' : 'Create Group'}
                        </button>
                    </form>
                    {successMessage && <p className="success-banner">{successMessage}</p>}
                    {errorMessage && <p className="error-banner">{errorMessage}</p>}
                </div>
            )}
        </div>
    );
};

export default CreateGroup;