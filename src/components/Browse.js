import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";
import useAllMovies from "../hooks/useAllMovies";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  useAllMovies();
  useNowPlayingMovies();
  usePopularMovies();

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <div>
          <MainContainer />
          <SecondaryContainer />
        </div>
      )}
      {/* 
          MainContainer
            - VideoBackground
            - VideoTitle
          SecondaryContainer
            - MovieList * n
              - cards * n
      */}
    </div>
  );
};
export default Browse;
