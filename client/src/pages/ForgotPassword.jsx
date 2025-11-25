import React, { useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => ({
      ...preve,
      [name]: value
    }));
  };

  const valideValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password,
        data: data
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/verification-otp", {
          state: data,
        });
        setData({
          email: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center px-4 py-6 bg-gray-50">
      <div className="bg-white w-full max-w-md shadow-lg rounded-xl p-8 border border-gray-200">

        {/* Header */}
        <p className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Forgot Password
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-blue-50 p-3 border border-blue-200 rounded-lg outline-none 
              focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <button
            disabled={!valideValue}
            className={`w-full py-3 rounded-lg font-semibold text-white tracking-wide transition 
            ${valideValue
                ? "bg-green-700 hover:bg-green-600 shadow-md"
                : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            Send OTP
          </button>
        </form>

        {/* Redirect */}
        <p className="text-center mt-4 text-sm text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-green-700 hover:text-green-800 transition"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
