// src/services/authService.js
// import axios from 'axios';
//
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/auth';
//
// export const signup = async (username, email, password) => {
//   return axios.post(`${API_URL}/register/`, { username, email, password });
// };

export const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    return {
        Authorization: `Bearer ${token}`,
    };
};

// export const login = async (username, password) => {
//   const response = await axios.post(`${API_URL}/login/`, { username, password });
//   if (response.data.token) {
//     localStorage.setItem('token', response.data.token);
//   }
//   return response.data;
// };
//
// export const logout = () => {
//   localStorage.removeItem('token');
// };
//
// export const getToken = () => {
//   return localStorage.getItem('token');
// };
