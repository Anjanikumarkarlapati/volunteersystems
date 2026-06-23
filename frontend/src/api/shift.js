import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const getShifts = () => API.get('/shifts');
export const addShift = (data) => API.post('/shifts', data);
export const deleteShift = (id) => API.delete(`/shifts/${id}`);