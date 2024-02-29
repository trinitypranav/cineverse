import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    allMovies: null,
    nowPlayingMovies: null,
    popularMovies: null,
    trailerVideo: null,
    trailerVideoId: null,
  },
  reducers: {
    addAllMovies: (state, action) => {
      state.allMovies = action.payload;
    },
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    setTrailerVideoId: (state, action) => {
      state.trailerVideoId = action.payload;
    },
  },
});

export const {
  addAllMovies,
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  setTrailerVideoId,
} = moviesSlice.actions;

export default moviesSlice.reducer;
