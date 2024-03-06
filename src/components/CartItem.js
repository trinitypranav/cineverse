import React from "react";
import { useDispatch } from "react-redux";
import { removeItem } from "../utils/cartSlice";
import { IMG_CDN_URL } from "../utils/constants";

const CartItem = (props) => {
  const dispatch = useDispatch();
  // console.log(props);
  const { id, title, poster_path, release_date, popularity } = props;
  return (
    <div
      data-testid="cartItem"
      className="flex restaurant-card w-1/3 m-5 rounded-lg shadow-lg border p-3"
    >
      <img
        className="cardImage w-32 h-32 rounded-lg"
        src={IMG_CDN_URL + poster_path}
      ></img>
      <div className="ml-5">
        <h2 className="text-xl font-bold mt-2">{title}</h2>
        <div className="my-2 text-green-600 font-bold">
          {" "}
          Release Date {release_date}
        </div>
        <h3>Rs. {popularity}</h3>
        <button
          className="bg-orange-400 p-2 rounded-lg font-normal text-base"
          onClick={() => {
            dispatch(removeItem(id));
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
