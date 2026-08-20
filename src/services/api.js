import axios from 'axios';

// Update port if your Spring Boot app uses something other than 8080
const API = axios.create({
  baseURL: 'http://localhost:8080/api', 
});

export const registerUser = (userData) => API.post('/register', userData);
export const loginUser = (credentials) => API.post('/login', credentials);