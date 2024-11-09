import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import ChatRoomList from './components/ChatRoomList';
import Chat from './components/Chat';
import CreateChatRoom from './components/CreateChatRoom';

const ChatWrapper = ({ token }) => {
    const { roomId } = useParams();
    return <Chat token={token} roomId={roomId} />;
};

const App = () => {
    const [token, setToken] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/chat-rooms" element={<ChatRoomList token={token} />} />
                <Route path="/chat/:roomId" element={<ChatWrapper token={token} />} />
                <Route path="/create-chat-room" element={<CreateChatRoom token={token} />} />
            </Routes>
        </Router>
    );
};

export default App;