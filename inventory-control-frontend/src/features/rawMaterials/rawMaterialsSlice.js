import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as rawMaterialsAPI from "../../services/rawMaterialsAPI";

// Async thunks
export const fetchRawMaterials = createAsyncThunk(
  "rawMaterials/fetchRawMaterials",
  async (_, { rejectWithValue }) => {
    try {
      const response = await rawMaterialsAPI.getAllRawMaterials();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchRawMaterialById = createAsyncThunk(
  "rawMaterials/fetchRawMaterialById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await rawMaterialsAPI.getRawMaterialById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const createRawMaterial = createAsyncThunk(
  "rawMaterials/createRawMaterial",
  async (rawMaterialData, { rejectWithValue }) => {
    try {
      const response = await rawMaterialsAPI.createRawMaterial(rawMaterialData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const updateRawMaterial = createAsyncThunk(
  "rawMaterials/updateRawMaterial",
  async ({ id, rawMaterialData }, { rejectWithValue }) => {
    try {
      const response = await rawMaterialsAPI.updateRawMaterial(
        id,
        rawMaterialData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const updateStockQuantity = createAsyncThunk(
  "rawMaterials/updateStockQuantity",
  async ({ id, stockQuantity }, { rejectWithValue }) => {
    try {
      const response = await rawMaterialsAPI.updateStockQuantity(
        id,
        stockQuantity,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const deleteRawMaterial = createAsyncThunk(
  "rawMaterials/deleteRawMaterial",
  async (id, { rejectWithValue }) => {
    try {
      await rawMaterialsAPI.deleteRawMaterial(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const searchRawMaterials = createAsyncThunk(
  "rawMaterials/searchRawMaterials",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await rawMaterialsAPI.searchRawMaterials(searchTerm);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchRawMaterialsWithStock = createAsyncThunk(
  "rawMaterials/fetchRawMaterialsWithStock",
  async (_, { rejectWithValue }) => {
    try {
      const response = await rawMaterialsAPI.getRawMaterialsWithStock();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchRawMaterialsOutOfStock = createAsyncThunk(
  "rawMaterials/fetchRawMaterialsOutOfStock",
  async (_, { rejectWithValue }) => {
    try {
      const response = await rawMaterialsAPI.getRawMaterialsOutOfStock();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const initialState = {
  rawMaterials: [],
  currentRawMaterial: null,
  loading: false,
  error: null,
};

const rawMaterialsSlice = createSlice({
  name: "rawMaterials",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentRawMaterial: (state) => {
      state.currentRawMaterial = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all raw materials
      .addCase(fetchRawMaterials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRawMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.rawMaterials = action.payload;
      })
      .addCase(fetchRawMaterials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch raw material by ID
      .addCase(fetchRawMaterialById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRawMaterialById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRawMaterial = action.payload;
      })
      .addCase(fetchRawMaterialById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create raw material
      .addCase(createRawMaterial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRawMaterial.fulfilled, (state, action) => {
        state.loading = false;
        state.rawMaterials.push(action.payload);
      })
      .addCase(createRawMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update raw material
      .addCase(updateRawMaterial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRawMaterial.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.rawMaterials.findIndex(
          (rm) => rm.id === action.payload.id,
        );
        if (index !== -1) {
          state.rawMaterials[index] = action.payload;
        }
        state.currentRawMaterial = action.payload;
      })
      .addCase(updateRawMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update stock quantity
      .addCase(updateStockQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStockQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.rawMaterials.findIndex(
          (rm) => rm.id === action.payload.id,
        );
        if (index !== -1) {
          state.rawMaterials[index] = action.payload;
        }
      })
      .addCase(updateStockQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete raw material
      .addCase(deleteRawMaterial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRawMaterial.fulfilled, (state, action) => {
        state.loading = false;
        state.rawMaterials = state.rawMaterials.filter(
          (rm) => rm.id !== action.payload,
        );
      })
      .addCase(deleteRawMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search raw materials
      .addCase(searchRawMaterials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchRawMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.rawMaterials = action.payload;
      })
      .addCase(searchRawMaterials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch raw materials with stock
      .addCase(fetchRawMaterialsWithStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRawMaterialsWithStock.fulfilled, (state, action) => {
        state.loading = false;
        state.rawMaterials = action.payload;
      })
      .addCase(fetchRawMaterialsWithStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch raw materials out of stock
      .addCase(fetchRawMaterialsOutOfStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRawMaterialsOutOfStock.fulfilled, (state, action) => {
        state.loading = false;
        state.rawMaterials = action.payload;
      })
      .addCase(fetchRawMaterialsOutOfStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentRawMaterial } =
  rawMaterialsSlice.actions;
export default rawMaterialsSlice.reducer;
