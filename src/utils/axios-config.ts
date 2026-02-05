import { AxiosConfig } from "@/types/axios";
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const createAxiosInstance = (config: AxiosConfig = {}): AxiosInstance => {
  const defaultConfig: AxiosConfig = {
    baseURL: "",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Fix: Use deep merge for headers to avoid losing default configuration
  const mergedConfig = {
    ...defaultConfig,
    ...config,
    headers: {
      ...defaultConfig.headers,
      ...config.headers,
    },
  };

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: mergedConfig.baseURL,
    timeout: mergedConfig.timeout,
    headers: mergedConfig.headers,
  });

  axiosInstance.interceptors.request.use(
    (requestConfig: InternalAxiosRequestConfig) => {
      return requestConfig;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      // In many parts of the project, the code expects response.data directly.
      // We keep this behavior but ensure the types are handled correctly.
      return response.data;
    },
    (error: any) => {
      const errorMessage =
        error.response?.data?.message || error.message || "An unknown error occurred";
      console.error("API Error:", errorMessage);
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

// API instances for different domains
export const mediumApiInstance = createAxiosInstance({
  baseURL: import.meta.env.VITE_MEDIUM_RSS ?? "",
});

export const githubApiInstance = createAxiosInstance({
  baseURL: import.meta.env.VITE_GITHUB ?? "",
  headers: {
    Authorization: import.meta.env.VITE_GITHUB_TOKEN ? `${import.meta.env.VITE_GITHUB_TOKEN}` : "",
  },
});

export default createAxiosInstance;
