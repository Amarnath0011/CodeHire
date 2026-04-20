import axios from "axios";

const api = axios.create({
  baseURL:"https://codehire-backend-wjsj.onrender.com" ,
});

export default api;
