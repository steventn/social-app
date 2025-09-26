// src/services/api.js
import axios from 'axios';
import { getAuthHeaders } from "../services/authService";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

export const registerUser = (data) => api.post('users/register/', data);
export const loginUser = (data) => api.post('users/login/', data);
export const fetchProfile = () => api.get('users/profile/', { headers: getAuthHeaders() });
export const addPlayer = (data) => api.post('users/add-player/', data, { headers: getAuthHeaders(), });
export const fetchFriends = () => api.get('users/get-friends/', { headers: getAuthHeaders() });
export const createGame = (data) => api.post('games/create/', data, { headers: getAuthHeaders(), });
export const getGames = () => api.get('games/games-list/', { headers: getAuthHeaders() });
export const fetchChatRooms = (token) => api.get('chat/rooms/', { headers: { Authorization: `Bearer ${token}` } });
export const fetchMessages = (roomId, token) => api.get(`chat/messages/${roomId}/`, { headers: { Authorization: `Bearer ${token}` } });
export const createChatRoom = async (data, token) => {
    return axios.post('http://localhost:8000/api/chat/rooms/create/', data, {
        headers: {
            Authorization: `Token ${token}`
        }
    });
};
