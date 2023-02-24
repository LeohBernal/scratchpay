import axios, { AxiosRequestConfig } from 'axios';

type RequestConfig = AxiosRequestConfig;

const executeRequest = <T>(requestConfig: RequestConfig) => {
  return axios.request<T>(requestConfig);
};

export { executeRequest };
