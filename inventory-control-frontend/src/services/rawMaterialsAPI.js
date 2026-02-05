import api from "./api";

const RAW_MATERIALS_ENDPOINT = "/api/raw-materials";

export const getAllRawMaterials = () => {
  return api.get(RAW_MATERIALS_ENDPOINT);
};

export const getRawMaterialById = (id) => {
  return api.get(`${RAW_MATERIALS_ENDPOINT}/${id}`);
};

export const createRawMaterial = (rawMaterialData) => {
  return api.post(RAW_MATERIALS_ENDPOINT, rawMaterialData);
};

export const updateRawMaterial = (id, rawMaterialData) => {
  return api.put(`${RAW_MATERIALS_ENDPOINT}/${id}`, rawMaterialData);
};

export const updateStockQuantity = (id, stockQuantity) => {
  return api.patch(`${RAW_MATERIALS_ENDPOINT}/${id}/stock`, null, {
    params: { stockQuantity },
  });
};

export const deleteRawMaterial = (id) => {
  return api.delete(`${RAW_MATERIALS_ENDPOINT}/${id}`);
};

export const searchRawMaterials = (name) => {
  return api.get(`${RAW_MATERIALS_ENDPOINT}/search`, {
    params: { name },
  });
};

export const getRawMaterialsWithStock = () => {
  return api.get(`${RAW_MATERIALS_ENDPOINT}/with-stock`);
};

export const getRawMaterialsOutOfStock = () => {
  return api.get(`${RAW_MATERIALS_ENDPOINT}/out-of-stock`);
};
