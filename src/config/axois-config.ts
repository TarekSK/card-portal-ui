import axios, { AxiosResponse } from 'axios';

// API Base URL
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// Config
axios.interceptors.response.use(async (response: any) => {
  try {
    return response;
  } catch (error) {
    return await Promise.reject(error);
  }
});

// Response Body -> To Get Data from Response
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

// Requests
const requests = {
  // Get
  get: <T>(url: string, body?: {}) =>
    axios.get<T>(url, body).then(responseBody),
  // Post
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  // Put
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  // Delete
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const axiosAgent = {
  requests,
};

export default axiosAgent;
