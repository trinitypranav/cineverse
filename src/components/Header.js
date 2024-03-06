import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { toggle } from "../utils/darkSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const cartSize = useSelector((store) => store.cart.items.length);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const isDarkModeOn = useSelector((state) => state.dark.dark);

  const handleSignOut = () => {
    // console.log("sign out called");
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsiubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-white dark:bg-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
      <div className="flex p-2 justify-between">
        {showGptSearch && (
          <>
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          </>
        )}
        {user && (
          <>
            <button
              className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
              onClick={handleGptSearchClick}
            >
              {showGptSearch ? "Homepage" : "GPT Search"}
            </button>
            <button
              className="mx-4 my-2 text-3xl"
              onClick={() => dispatch(toggle())}
            >
              {isDarkModeOn ? "🌚" : "🌞"}
              {/* {showGptSearch ? "Homepage" : "GPT Search"} */}
            </button>
            <button
              className="text-black dark:text-white"
              onClick={() => navigate("/cart")}
            >
              Cart {cartSize} items
            </button>
          </>
        )}

        {user && (
          <div className="flex p-2">
            {/* <img
              className="hidden md:block w-12 h-12"
              alt="usericon"
              src={user?.photoURL}
            /> */}
            <button
              onClick={handleSignOut}
              className="font-bold text-black dark:text-white border rounded-lg p-2"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
