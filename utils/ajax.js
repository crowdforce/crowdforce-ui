import axios from 'axios';

const ajax = axios.create({
  headers: { 'content-type': 'application/json' },
  baseURL: typeof window === 'undefined' ? process.env.API_PATH : window.location.origin,
  credentials: 'same-origin',
  maxRedirects: 0,
  withCredentials: true,
});

export default ajax;
