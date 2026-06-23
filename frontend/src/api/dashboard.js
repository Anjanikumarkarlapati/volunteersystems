import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const getEvents = () => API.get('/events');
export const getVolunteers = () => API.get('/volunteers');
export const getApplications = () => API.get('/applications');
export const getActivities = () => API.get('/activities');