import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterBy: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addFilter: (state, action) => {
      state.filterBy.push(action.payload);
    },
    removeFilter: (state, action) => {
      state.filterBy = state.filterBy.filter(
        (filter) => filter !== action.payload
      );
    },
    initiateFilter: (state, action) => {
      state.filterBy = action.payload;
    },
  },
});

export const { addFilter, initiateFilter, removeFilter } = filterSlice.actions;

export default filterSlice.reducer;
