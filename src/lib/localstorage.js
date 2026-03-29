import axios from './axios'

export const setToken = token => {
  axios.defaults.headers['Authorization'] = `Bearer ${token}`;
  sessionStorage.setItem('token', token)
}

export const getToken = () => {
  return sessionStorage.getItem('token')
}

export const setUsername = username => {
  localStorage.setItem('username', username)
}

export const getUsername = () => {
  return localStorage.getItem('username') || ''
}

