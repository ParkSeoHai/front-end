import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://back-end-gray-pi.vercel.app//api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchData = async (endpoint, config = {}) => {
  try {
    const response = await axiosInstance(endpoint, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
