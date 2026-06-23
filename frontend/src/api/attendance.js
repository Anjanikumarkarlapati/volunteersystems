import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});
export const getAttendance = () => API.get('/attendance');
export const updateAttendanceAPI = (id, data) =>
  API.put(`/attendance/${id}`, data);