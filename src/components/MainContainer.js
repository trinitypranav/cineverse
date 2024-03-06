import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { movieObject } from "../utils/movieObject";

const MainContainer = () => {
  const allMovies = useSelector((store) => store.movies?.allMovies);
  const trailerVideoId = useSelector((store) => store.movies?.trailerVideoId);
  if (!allMovies) return;

  let mainMovie = trailerVideoId
    ? allMovies.filter((m) => {
        console.log(m.id);
        console.log(trailerVideoId);
        return m.id === trailerVideoId;
      })[0]
    : allMovies[0];
  if (!mainMovie) mainMovie = movieObject;
  const { title, overview, id } = mainMovie;

  return (
    <div className="pt-[30%] bg-white md:pt-0">
      <VideoTitle title={title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};
export default MainContainer;
