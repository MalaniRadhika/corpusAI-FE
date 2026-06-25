import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});




API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("================================");
    console.log("API REQUEST");
    console.log("Method:", config.method?.toUpperCase());
    console.log("URL:", `${config.baseURL}${config.url}`);
    console.log("Payload:", config.data);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("JWT Attached");
    } else {
      console.log("No JWT Found");
    }

    console.log("================================");

    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    console.log("================================");
    console.log("API RESPONSE");
    console.log("URL:", response.config.url);
    console.log("Status:", response.status);
    console.log("Data:", response.data);
    console.log("================================");

    return response;
  },
  (error) => {
    console.error("================================");
    console.error("API ERROR");

    if (error.response) {
      console.error("URL:", error.config.url);
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error(error.message);
    }

    console.error("================================");

    return Promise.reject(error);
  }
);

export default API;