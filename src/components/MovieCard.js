import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, IMG_CDN_URL } from "../utils/constants";
import { addTrailerVideo, setTrailerVideoId } from "../utils/moviesSlice";
import { addItem } from "../utils/cartSlice";
import { useState } from "react";

const MovieCard = ({ movieId, posterPath }) => {
  let allMovies = useSelector((store) => store.movies.allMovies);
  let cartItems = useSelector((store) => store.cart.items);
  const [isAdded, setIsAdded] = useState(
    cartItems.some((item) => item.id === movieId)
  );

  const dispatch = useDispatch();
  if (!posterPath) return null;

  const getMovieVideos = async (movieId) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();

    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
    dispatch(setTrailerVideoId(movieId));
  };

  const handleCardClick = () => {
    // console.log("movie id is " + movieId);
    getMovieVideos(movieId);
  };

  // cartItems.forEach((item) => {
  //   if (item.id === movieId) setIsAdded(true);
  // });

  return (
    <div className="w-36 md:w-48 pr-4 cursor-pointer rounded-3xl">
      <img
        alt="Movie Card"
        src={IMG_CDN_URL + posterPath}
        onClick={handleCardClick}
        className="rounded-t-lg"
      />
      {!isAdded && (
        <button
          className="p-4 w-full bg-green-600 hover:bg-green-800"
          onClick={() => {
            dispatch(
              addItem(allMovies.filter((movie) => movie.id === movieId)[0])
            );
            alert("Movie added to cart");
            setIsAdded(true);
          }}
        >
          Add to cart
        </button>
      )}
    </div>
  );
};
export default MovieCard;
