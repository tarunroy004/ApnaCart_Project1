import React, { useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const valideValue = Object.values(data).every(el => el)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (data.password !== data.confirmPassword) {
      toast.error("Password and confirm password must be same")
      return
    }

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data
      })

      if (response.data.error) toast.error(response.data.message)

      if (response.data.success) {
        toast.success(response.data.message)
        setData({ name: "", email: "", password: "", confirmPassword: "" })
        navigate("/login")
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 transition-all">

        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
          Create an Account
        </h2>
        <p className="text-gray-500 text-center mb-6">Welcome to ApnaCart 👋</p>

        <form className="grid gap-5" onSubmit={handleSubmit}>

          {/* Name */}
          <div className="grid gap-1">
            <label htmlFor="name" className="font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              autoFocus
              className="bg-gray-50 p-3 border rounded-xl outline-none focus:border-blue-500 transition-all shadow-sm"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="grid gap-1">
            <label htmlFor="email" className="font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 p-3 border rounded-xl outline-none focus:border-blue-500 transition-all shadow-sm"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="grid gap-1">
            <label htmlFor="password" className="font-medium text-gray-700">Password</label>
            <div className="bg-gray-50 p-3 border rounded-xl flex items-center focus-within:border-blue-500 transition-all shadow-sm">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full outline-none bg-transparent"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <div onClick={() => setShowPassword(prev => !prev)} className="cursor-pointer text-gray-600">
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="grid gap-1">
            <label htmlFor="confirmPassword" className="font-medium text-gray-700">Confirm Password</label>
            <div className="bg-gray-50 p-3 border rounded-xl flex items-center focus-within:border-blue-500 transition-all shadow-sm">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full outline-none bg-transparent"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
              <div onClick={() => setShowConfirmPassword(prev => !prev)} className="cursor-pointer text-gray-600">
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            disabled={!valideValue}
            className={`${
              valideValue ? "bg-blue-600 hover:bg-blue-700 cursor-pointer" : "bg-gray-400 cursor-not-allowed"
            } text-white py-3 rounded-xl font-semibold tracking-wide transition-all shadow-md`}
          >
            Register
          </button>
        </form>

        <p className="text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <Link to={"/login"} className="font-semibold text-blue-600 hover:text-blue-700">
            Login
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Register
