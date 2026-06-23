import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const getAttendance = () => API.get('/attendance');
export const updateAttendanceAPI = (id, data) =>
  API.put(`/attendance/${id}`, data);