import axios from 'axios';
import jwt from 'jsonwebtoken';

const http = axios.create({
  baseURL: "http://localhost:3001",
  crossDomain: true,
  headers: {
    "Content-type": "application/json"
  }
});

http.interceptors.request.use(function(config) {
  const token = localStorage.getItem("accessToken")
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
  }, function (error) {
    return Promise.reject(error);
  });

http.interceptors.response.use(function(response) {
  return response
  }, function (error) {
    if(error.response.status === 500 || error.response.status === 403) {
      const originalRequest = error.config;
      let refreshToken = localStorage.getItem("refreshToken");
      if(refreshToken && !originalRequest._retry) {
        // If refresh token is expired, don't retry request and go to login
        let exp = jwt.decode(refreshToken).exp;
        if (Date.now() >= exp * 1000) {
          localStorage.clear();
          originalRequest._retry = false;
          window.location.href = '/login';
        }
        // Try to get a new access token with the existing non-expired refresh token
        originalRequest._retry = true;
        return http.post('/api/token', {refreshToken: refreshToken}).then((res) => {
            if (res.status === 200) {
              localStorage.setItem("accessToken", res.data.accessToken);
              return http(originalRequest);
            } else {
              localStorage.clear();
              originalRequest._retry = false;
              window.location.href = '/login';
            }
          }).catch(err => {
            localStorage.clear();
            originalRequest._retry = false;
            window.location.href = '/login';
          });
      }
      
    }
    return Promise.reject(error);
  });


export default http;