import { createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import Cart from "./Cart";
import { RouterProvider } from "react-router-dom";
import Success from "./Success";
import Cancel from "./Cancel";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/success",
      element: <Success />,
    },
    {
      path: "/cancel",
      element: <Cancel />,
    }
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};
export default Body;
