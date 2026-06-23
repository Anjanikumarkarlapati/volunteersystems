import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const getTraining = () => API.get('/training');
export const addTraining = (data) => API.post('/training', data);
export const deleteTraining = (id) => API.delete(`/training/${id}`);