import axios from "axios";
import Cookies from "js-cookie";
// const BASE_URL = "http://localhost:3500/api/v1";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const httpClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// intercept the request and add jwtToken
httpClient.interceptors.request.use(
  function (config) {
    const token = Cookies.get("sh_token") || null;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const getCurrentUser = () => {
  return httpClient.get("/user/me");
};
export const loginUser = (formData) => {
  return httpClient.post("/user/login", formData); // done
};

export const registerUser = (formData) => {
  return httpClient.post("/user/register", formData); // done
};

export const getAllProducts = () => {
  return httpClient.get("/products"); // done
};

export const addProduct = (formData) => {
  return httpClient.post("/products", formData);
};
export const deleteProduct = (id) => {
  return httpClient.delete(`/products/${id}`);
};
export const createCart = (data) => {
  return httpClient.post("/cart", data);
};
export const getCartHistory = () => {
  return httpClient.get("/cart"); // done
};
export const getCartHistoryById = (id) => {
  return httpClient.get(`/cart/${id}`); // done
};

export const getTopCategory = () => {
  return httpClient.get(`/cart/topcategory`); // done
};
export const getTopProduct = () => {
  return httpClient.get(`/cart/topproduct`); // done
};
