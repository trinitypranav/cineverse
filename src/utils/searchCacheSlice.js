import { createSlice } from "@reduxjs/toolkit";

const searchCacheSlice = createSlice({
  name: "searchCache",
  initialState: {},
  reducers: {
    cacheResults: function (state, action) {
      console.log("reached here", action.payload);
      state = Object.assign(state, action.payload);
    },
  },
});

export const { cacheResults } = searchCacheSlice.actions;
export default searchCacheSlice.reducer;
