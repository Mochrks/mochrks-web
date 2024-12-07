import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Optional configuration for Axios instance
interface AxiosConfig {
    baseURL?: string;
    timeout?: number;
    headers?: Record<string, string>;
}

// Create flexible Axios instance
const createAxiosInstance = (config: AxiosConfig = {}): AxiosInstance => {
    // Default configuration
    const defaultConfig: AxiosConfig = {
        baseURL: '', // Optional base URL
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Merge configurations
    const mergedConfig = { ...defaultConfig, ...config };

    // Create Axios instance
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
    baseURL: import.meta.env.VITE_MEDIUM_RSS || ''
});

export const githubApiInstance = createAxiosInstance({
    baseURL: import.meta.env.VITE_GITHUB || '',
    headers: {
        Authorization: `${import.meta.env.VITE_GITHUB_TOKEN}`, 
     },
});

export default createAxiosInstance;