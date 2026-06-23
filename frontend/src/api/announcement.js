import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const getAnnouncements = () => API.get('/announcements');
export const addAnnouncement = (data) => API.post('/announcements', data);