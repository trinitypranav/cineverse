import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addAllMovies } from "../utils/moviesSlice";

const useAllMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const allMovies = useSelector((store) => store.movies.allMovies);

  const getAllMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const json = await data.json();

    const data2 = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS
    );
    const json2 = await data2.json();
    json.results = [...json.results, ...json2.results];

    dispatch(addAllMovies(json.results));
  };

  useEffect(() => {
    !allMovies && getAllMovies();
  }, []);
};

export default useAllMovies;
