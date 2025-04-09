import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllSpots = () => api.get('/').then(res => res.data);

export const getSpotById = id => api.get(`/${id}`).then(res => res.data);

export const createSpot = async (description) => {
  console.log('description', description);
  const response = await api.post('/', {
    description: description,
  });
  return response.data;
};

export const updateDescription = (id, description) => api.patch(`/edit/${id}`, { description });

export const toggleCompleted = id => api.patch(`/complete/${id}`);

export const updateRating = (id, rating) => api.patch(`/rate/${id}`, { rating });

export const deleteSpot = id => api.delete(`/${id}`);
