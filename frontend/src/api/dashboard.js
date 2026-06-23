import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const getEvents = () => API.get('/events');
export const getVolunteers = () => API.get('/volunteers');
export const getApplications = () => API.get('/applications');
export const getActivities = () => API.get('/activities');