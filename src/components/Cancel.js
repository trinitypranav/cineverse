import React from "react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          Payment Failed!
        </h1>
        <p className="text-gray-600 mb-8">
          Oops! It seems there was an issue processing your payment. Please try
          again.
        </p>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            onClick={() => {
              navigate("/browse");
            }}
          >
            Retry Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
