import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const getAnnouncements = () => API.get('/announcements');
export const addAnnouncement = (data) => API.post('/announcements', data);