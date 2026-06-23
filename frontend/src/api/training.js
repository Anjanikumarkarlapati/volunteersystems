import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const getTraining = () => API.get('/training');
export const addTraining = (data) => API.post('/training', data);
export const deleteTraining = (id) => API.delete(`/training/${id}`);