// import openai from "../utils/openai";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
import OpenAI from "openai";
import { cacheResults } from "../utils/searchCacheSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  // const searchText = useRef({});
  const gptKeyText = useRef(null);

  const searchCache = useSelector((state) => state.searchCache);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchText]) {
        console.log("from cache");
        setSuggestions(searchCache[searchText]);
      } else {
        // console.log("from api");
        getSuggestions(searchText);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);

  const getSuggestions = async (searchText) => {
    if (searchText === "") {
      setSuggestions([]);
      return null;
    }
    // console.log(process.env.REACT_APP_YOUTUBE_SEARCH_API + searchText);
    const data = await fetch(
      process.env.REACT_APP_YOUTUBE_SEARCH_API + searchText
    );
    const response = await data.json();
    // console.log("setting suggestions to ", response);
    setSuggestions(response);
    dispatch(cacheResults({ [searchText]: response }));
  };

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    //console.log(searchText.current.value);
    // Make an API call to GPT API and get Movie Results

    if (!gptKeyText.current.value) {
      alert("GPT Key Required");
      return null;
    }
    //console.log(gptKeyText.current.value);
    const openai = new OpenAI({
      apiKey: gptKeyText.current.value,
      dangerouslyAllowBrowser: true,
    });

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
      // TODO: Write Error Handling
    }

    //console.log(gptResults.choices?.[0]?.message?.content);

    // Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    // ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"]

    // For each movie I will search TMDB API

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);

    //console.log(tmdbResults);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <>
      <div className="pt-[35%] h-auto md:pt-[10%] flex justify-center">
        <form
          className="w-full md:w-2/3 bg-gray-800 grid grid-cols-12 rounded-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            // ref={searchText}
            type="text"
            className="p-4 my-4 ml-2 col-span-7 font-extralight text-xs rounded-lg"
            placeholder={lang[langKey].gptSearchPlaceholder}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            // onBlur={() => setShowSuggestions(false)}
          />
          <input
            ref={gptKeyText}
            type="text"
            className="p-4 my-4 mx-2 col-span-3 font-extralight text-xs rounded-lg"
            placeholder="GPT Key"
          />
          <button
            className="col-span-2 my-4 mr-2 py-2 px-2 bg-red-700 text-white rounded-lg text-sm"
            onClick={handleGptSearchClick}
          >
            {lang[langKey].search}
          </button>
        </form>
      </div>
      <div>
        {showSuggestions && suggestions.length > 0 && (
          <div className="w-60 ml-60 bg-white p-5 border">
            <ul>
              {suggestions.map((s) => {
                return (
                  <div
                    key={s}
                    className="py-1 cursor-pointer"
                    onClick={(e) => {
                      console.log(s);
                      setSearchText(s);
                      setShowSuggestions(false);
                    }}
                  >
                    🔍 {s}
                  </div>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
export default GptSearchBar;
