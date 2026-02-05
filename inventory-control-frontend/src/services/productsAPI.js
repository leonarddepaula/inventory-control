import api from "./api";

const PRODUCTS_ENDPOINT = "/api/products";

export const getAllProducts = () => {
  return api.get(PRODUCTS_ENDPOINT);
};

export const getProductById = (id) => {
  return api.get(`${PRODUCTS_ENDPOINT}/${id}`);
};

export const createProduct = (productData) => {
  return api.post(PRODUCTS_ENDPOINT, productData);
};

export const updateProduct = (id, productData) => {
  return api.put(`${PRODUCTS_ENDPOINT}/${id}`, productData);
};

export const deleteProduct = (id) => {
  return api.delete(`${PRODUCTS_ENDPOINT}/${id}`);
};

export const searchProducts = (name) => {
  return api.get(`${PRODUCTS_ENDPOINT}/search`, {
    params: { name },
  });
};

export const getProductionSuggestions = () => {
  return api.get(`${PRODUCTS_ENDPOINT}/production-suggestions`);
};
