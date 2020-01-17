import axios from "axios";

const token = localStorage.getItem("token");

const options = {
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {}
};

if (token) {
  options.headers["Authorization"] = `Bearer ${token}`;
}

export default axios.create(options);
