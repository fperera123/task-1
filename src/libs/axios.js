import Vue from "vue";

// axios
import axios from "axios";

const SERVER_URL = "https://scadanet.lk/apps/railways/api";

const ApiPublic = axios.create({
  baseURL: SERVER_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

const ApiFileUpload = axios.create({
  baseURL: SERVER_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});


const ApiAuth = axios.create({
  baseURL: SERVER_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
})

ApiAuth.interceptors.request.use((config) => {
  let authUser = JSON.parse(localStorage.getItem('authUser'));
  if (authUser != null) {
    config.headers.token = authUser.token;
  }
  else {
    config.headers.token = null;
  }

  return config;
}, (error) => Promise.reject(error));

Vue.prototype.$http = ApiPublic;

export { ApiAuth, ApiPublic, ApiFileUpload };
