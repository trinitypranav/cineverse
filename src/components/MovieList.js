import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies, addPopularMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const titleMapping = {
  "Now Playing": "now_playing",
  Popular: "popular",
};

const methodMapping = {
  "Now Playing": addNowPlayingMovies,
  Popular: addPopularMovies,
};

const MovieList = ({ title, movies }) => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const getNowPlayingMovies = async (searchText) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + titleMapping[title] + "?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    if (!json.results) return null;
    json.results = json.results.filter(
      (movie) =>
        movie.original_title.includes(searchText) ||
        movie.title.includes(searchText)
    );
    // console.log(json.results);
    dispatch(methodMapping[title](json.results));
  };

  useEffect(() => {
    getNowPlayingMovies(searchText);
  }, [searchText]);

  return (
    <div className="px-6">
      <div className="flex">
        <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
        <input
          value={searchText}
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          className="p-4 m-4 col-span-3"
          placeholder="Suggestions"
        />
      </div>

      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              movieId={movie.id}
              posterPath={movie.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieList;
