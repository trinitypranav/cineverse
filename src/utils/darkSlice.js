import { createSlice } from "@reduxjs/toolkit";

const darkSlice = createSlice({
  name: "dark",
  initialState: {
    dark: true,
  },
  reducers: {
    toggle: function (state) {
      // console.log("called toggle");
      state.dark = !state.dark;
    },
    setDark: function (state, action) {
      // console.log("called setDark");
      state.dark = action.payload;
    },
  },
});

export const { toggle, setDark } = darkSlice.actions;
export default darkSlice.reducer;
