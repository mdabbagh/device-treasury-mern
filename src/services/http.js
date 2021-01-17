import axios from 'axios';

export var token = localStorage.getItem("token")

const http = axios.create({
  baseURL: "http://localhost:3001",
  crossDomain: true,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default http;