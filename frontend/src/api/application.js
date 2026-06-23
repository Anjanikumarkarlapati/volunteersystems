import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const getApplications = () => API.get('/applications');
export const approveApplication = (id) => API.put(`/applications/approve/${id}`);
export const rejectApplication = (id) => API.put(`/applications/reject/${id}`);
export const deleteApplication = (id) => API.delete(`/applications/${id}`);