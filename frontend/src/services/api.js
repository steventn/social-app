// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

export const registerUser = (data) => api.post('auth/register/', data);
export const loginUser = (data) => api.post('auth/login/', data);
export const fetchChatRooms = (token) => api.get('chat/rooms/', { headers: { Authorization: `Bearer ${token}` } });
export const fetchMessages = (roomId, token) => api.get(`chat/messages/${roomId}/`, { headers: { Authorization: `Bearer ${token}` } });
export const createChatRoom = async (data, token) => {
    return axios.post('http://localhost:8000/api/chat/rooms/create/', data, {
        headers: {
            Authorization: `Token ${token}`
        }
    });
};
