import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const getVolunteers = () => API.get('/volunteers');
export const addVolunteer = (data) => API.post('/volunteers', data);
export const updateVolunteer = (id, data) => API.put(`/volunteers/${id}`, data);
export const deleteVolunteer = (id) => API.delete(`/volunteers/${id}`);