import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const $fetcher = axios.create({
  responseType: 'json',
});

$fetcher.interceptors.request.use(
  function success(request) {
    console.log('request succeeded');
    return request;
  },
  function exception(error) {
    console.log('request failed');
    return Promise.reject(error);
  },
);

$fetcher.interceptors.response.use(
  function success(response) {
    console.log('response succeeded');
    return response;
  },
  function exception(error) {
    console.log('response failed');
    return Promise.reject(error);
  },
);

export default function fetcher(): AxiosInstance {
  return $fetcher;
}
