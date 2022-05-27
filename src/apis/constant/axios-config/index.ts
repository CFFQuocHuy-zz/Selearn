import axios from 'axios';

export const host = process.env.REACT_APP_API_URL;

export const appAxios = axios.create({
  baseURL: host,
});

appAxios.interceptors.response.use(
  (response) => {
    delete response.data.message;
    delete response.data.success;
    return response.data;
  },
  (error) => {
    return Promise.reject(error.message);
  },
);
