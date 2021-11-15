import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
const ENV = require('../../../environments');
let instance: AxiosInstance = axios.create({ baseURL: ENV.BASE_URL });

function create(config?: AxiosRequestConfig): AxiosInstance {
  instance = axios.create(config);
  return instance;
}
function setDefaultHeader(key: string, value: any): any {
  return instance.defaults.headers.common[key] = value;
}
function clearDefaultHeader(key: string): any {
  delete instance.defaults.headers.common[key];
}
function request(config: AxiosRequestConfig) {
  return instance.request(config);
}
function get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
  return instance.get(url, config);
}
function post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
  return instance.post(url, data, config);
}
function put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
  return instance.put(url, data, config);
}
function patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
  return instance.patch(url, data, config);
}
function _delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
  return instance.delete(url, config);
}
function requestInterceptor(onFulfilled?: ((value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>) | undefined, onRejected?: (error: any) => any): number {
  return instance.interceptors.request.use(onFulfilled, onRejected);
}
function responseInterceptor(onFulfilled?: ((value: AxiosResponse<any>) => AxiosResponse<any> | Promise<AxiosResponse<any>>) | undefined, onRejected?: (error: any) => any): number {
  return instance.interceptors.response.use(onFulfilled, onRejected);
}
export const Http = { create, setDefaultHeader, clearDefaultHeader, request, get, post, put, patch, delete: _delete, requestInterceptor, responseInterceptor, CancelToken: axios.CancelToken };
