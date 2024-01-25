import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="app background"
        />
      </div>
      <form className="w-3/12 h-auto absolute p-8 bg-black my-24 mx-auto right-0 left-0 text-white rounded-xl bg-opacity-80">
        <h1 className="font-medium text-3xl py-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            type="text"
            placeholder="Fullname"
            className="px-4 py-2 my-2 w-full bg-gray-700 rounded-xl"
          />
        )}

        <input
          type="text"
          placeholder="Email"
          className="px-4 py-2 my-2 w-full bg-gray-700 rounded-xl"
        />
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 my-2 w-full bg-gray-700 rounded-xl"
        />
        <button className="p-2 my-3 bg-red-700 w-full rounded-xl">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-2 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Cineverse? Sign up now"
            : "Already registered? Sign in now."}
        </p>
      </form>
    </div>
  );
};
export default Login;
