import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import CartItem from "./CartItem";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import getStripe from "../lib/getStripe";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log("store contains" + items);

  async function handleCheckout() {
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: process.env.REACT_APP_STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      successUrl: `https://cineverse-jcjw.onrender.com/success`,
      cancelUrl: `https://cineverse-jcjw.onrender.com/cancel`,
      billingAddressCollection: "auto",
      customerEmail: user.email,
      billingAddressCollection: "required",
      shippingAddressCollection: {
        allowedCountries: ["US", "CA", "IN"],
      },
    });
    console.warn(error.message);
  }

  return (
    <div className="m-5 text-2xl font-bold">
      <h1>
        Cart Details
        <button
          className="text-base font-normal bg-green-600 p-2 rounded-lg ml-4"
          onClick={() => navigate("/browse")}
        >
          Go Back
        </button>
        <button
          className="text-base font-normal bg-orange-400 p-2 rounded-lg ml-4"
          onClick={() => {
            dispatch(clearCart());
          }}
        >
          Clear Cart
        </button>
      </h1>
      <div className="flex flex-wrap justify-evenly">
        {cartItems.length !== 0 &&
          cartItems.map((item) => <CartItem key={item.id} {...item} />)}
      </div>
      <div className="text-3xl mt-10 ">
        Billing
        <span
          onClick={handleCheckout}
          className="text-base font-normal bg-green-600 p-4 rounded-lg ml-4 text-white"
        >
          Subscribe for Rs.10/month
        </span>
      </div>
    </div>
  );
};

export default Cart;
