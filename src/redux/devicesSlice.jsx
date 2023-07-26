import { createSlice } from "@reduxjs/toolkit";

const devicesSlice = createSlice({
  name: "devices",
  initialState: [],
  reducers: {
    addEntry: (state, action) => {
      state.push(action.payload);
    },
    deleteEntry: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
    },
    reorderEntries: (state, action) => {
      return action.payload;
    },
  },
});

export const { addEntry, deleteEntry, reorderEntries } = devicesSlice.actions; // Corrected the typo

export default devicesSlice.reducer;
