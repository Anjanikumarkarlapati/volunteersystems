import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const getShifts = () => API.get('/shifts');
export const addShift = (data) => API.post('/shifts', data);
export const deleteShift = (id) => API.delete(`/shifts/${id}`);