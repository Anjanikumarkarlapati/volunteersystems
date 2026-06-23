import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const getApplications = () => API.get('/applications');
export const approveApplication = (id) => API.put(`/applications/approve/${id}`);
export const rejectApplication = (id) => API.put(`/applications/reject/${id}`);
export const deleteApplication = (id) => API.delete(`/applications/${id}`);