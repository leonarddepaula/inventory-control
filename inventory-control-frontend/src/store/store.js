import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import rawMaterialsReducer from "../features/rawMaterials/rawMaterialsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    rawMaterials: rawMaterialsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
});
