import { createSlice } from "@reduxjs/toolkit";

const darkSlice = createSlice({
  name: "dark",
  initialState: {
    dark: false,
  },
  reducers: {
    toggle: function (state) {
      console.log("called asadn");
      state.dark = !state.dark;
    },
    setDark: function (state, action) {
      console.log("called asadn");
      state.dark = action.payload;
    },
  },
});

export const { toggle, setDark } = darkSlice.actions;
export default darkSlice.reducer;
