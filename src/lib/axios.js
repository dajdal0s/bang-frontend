import Vue from 'vue'
import axios from 'axios'
import { getToken } from "./localstorage";

const instance = axios.create({
  baseURL: 'https://bang-backend.onrender.com',
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

instance.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  if (error.response && error.response.status === 403) {
    Vue.notify({
      title: error.response.data,
      type: 'error'
    })
  }
  return Promise.reject(error);
});

export default instance
