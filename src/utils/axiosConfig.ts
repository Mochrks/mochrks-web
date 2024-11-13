
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

//  instance Axios
const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_MEDIUM_RSS, 
    timeout: 10000, 
});

// Interceptor  request
axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        console.log('Request:', config); 
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor response
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log('Response:', response.data); 
        return response.data; 
    },
    (error) => {
        console.error('Error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;