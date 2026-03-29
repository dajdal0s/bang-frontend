import Vue from 'vue'
import axios from 'axios'

import { getToken } from "./localstorage";

function getHostname () {
  return window.location.hostname === 'localhost' ? 'http://' : 'https://'
}

const hostname = getHostname();

export const getApiUrl = () => {
  return window.location.hostname === 'localhost' ? process.env.VUE_APP_API_URL_DEV : process.env.VUE_APP_API_URL_PROD
}

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
  if (error.response.status === 403) {
    Vue.notify({
      title: error.response.data,
      type: 'error'
    })
  }
  return Promise.reject(error);
});

export default instance
