import axios from 'axios';

const api = axios.create({
  baseURL: 'api/v1/',
});

const request = async (method, url, params) => {
  if (method !== 'get') {
    return (await api[method](url, params)).data;
  }
  return (await api[method](url)).data;
};

export default {
  get: (...args) => request('get', ...args),
  post: (...args) => request('post', ...args),
  put: (...args) => request('put', ...args),
  delete: (...args) => request('delete', ...args),
};
