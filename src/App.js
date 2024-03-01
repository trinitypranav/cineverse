import { Provider, useDispatch, useSelector } from "react-redux";
import Body from "./components/Body";
import appStore from "./utils/appStore";
import { useEffect } from "react";
import { setDark } from "./utils/darkSlice";

function App() {
  const darkTheme = useSelector((state) => state.dark.dark);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.localStorage.getItem("DarkTheme") !== null) {
      dispatch(setDark(window.localStorage.getItem("DarkTheme")));
    }
  }, []);

  useEffect(() => {
    if (darkTheme === true) {
      document.getElementById("html").classList.add("dark");
      dispatch(setDark(darkTheme));
    } else {
      document.getElementById("html").classList.remove("dark");
      dispatch(setDark(darkTheme));
    }

    window.localStorage.setItem("DarkTheme", JSON.stringify(darkTheme));
  }, [darkTheme]);

  return (
    // <Provider store={appStore}>
    <Body />
    // </Provider>
  );
}

export default App;
