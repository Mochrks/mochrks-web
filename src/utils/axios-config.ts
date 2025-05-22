import { AxiosConfig } from '@/types/axios';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const createAxiosInstance = (config: AxiosConfig = {}): AxiosInstance => {
   
    const defaultConfig: AxiosConfig = {
        baseURL: '',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const mergedConfig = { ...defaultConfig, ...config };

    const axiosInstance: AxiosInstance = axios.create({
        baseURL: mergedConfig.baseURL,
        timeout: mergedConfig.timeout,
        headers: mergedConfig.headers
    });

    // Request interceptor for logging
    axiosInstance.interceptors.request.use(
        (requestConfig: AxiosRequestConfig) => {
            console.log('Request:', requestConfig);
            return requestConfig;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor for logging
    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
            console.log('Response:', response); 
            return response.data; 
        },
        (error) => {
            console.error('Error:', error);
            return Promise.reject(error);
        }
    );


    return axiosInstance;
};

// API instances for different domains
export const mediumApiInstance = createAxiosInstance({
    baseURL: import.meta.env.VITE_MEDIUM_RSS ?? ''
});

export const githubApiInstance = createAxiosInstance({
    baseURL: import.meta.env.VITE_GITHUB ?? '',
    headers: {
        Authorization: `${import.meta.env.VITE_GITHUB_TOKEN}`, 
     },
});

export default createAxiosInstance;