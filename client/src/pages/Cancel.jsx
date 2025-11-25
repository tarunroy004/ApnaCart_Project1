import React from "react";
import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";

const Cancel = () => {
  return (
    <div className="m-4 w-full max-w-md bg-white shadow-xl border border-red-300 p-7 rounded-xl mx-auto flex flex-col justify-center items-center gap-4">
      <MdCancel className="text-red-600" size={60} />

      <p className="text-red-700 font-bold text-xl text-center">
        Your Payment Was Cancelled
      </p>

      <p className="text-gray-600 text-center text-sm">
        The transaction could not be completed.  
        Please try again or return to home.
      </p>

      <Link
        to="/"
        className="w-full text-center border border-red-600 text-red-700 font-medium rounded-lg px-5 py-2 hover:bg-red-600 hover:text-white transition-all"
      >
        Go To Home
      </Link>
    </div>
  );
};

export default Cancel;
