// frontend/src/App.js
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import HomeScreen from './components/HomeScreen';
import ChatRoomList from './components/ChatRoomList';
import Chat from './components/Chat';
import CreateChatRoom from './components/CreateChatRoom';

const ChatWrapper = ({ token }) => {
    const { roomId } = useParams();
    return <Chat token={token} roomId={roomId} />;
};

const App = () => {
    const [token] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/chat-rooms" element={<ChatRoomList token={token} />} />
                <Route path="/chat/:roomId" element={<ChatWrapper token={token} />} />
                <Route path="/create-chat-room" element={<CreateChatRoom token={token} />} />
            </Routes>
        </Router>
    );
};

export default App;