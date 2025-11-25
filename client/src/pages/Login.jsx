import React, { useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const Login = () => {

    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const valid = Object.values(data).every(el => el)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryApi.login,
                data: data
            })

            if (response.data.error) {
                toast.error(response.data.message)
            }

            if (response.data.success) {
                toast.success(response.data.message)
                localStorage.setItem('accesstoken', response.data.data.accesstoken)
                localStorage.setItem('refreshToken', response.data.data.refreshToken)

                const userDetails = await fetchUserDetails()
                dispatch(setUserDetails(userDetails.data))

                setData({ email: "", password: "" })
                navigate("/")
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center bg-blue-50 px-4 py-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 animate-fadeIn">

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Welcome Back 👋
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit}>

                    {/* Email */}
                    <div className="grid gap-1">
                        <label htmlFor="email" className="font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="p-3 bg-blue-50 border border-blue-200 rounded-lg outline-none 
                            focus:border-blue-500 transition-all duration-200"
                        />
                    </div>

                    {/* Password */}
                    <div className="grid gap-1">
                        <label htmlFor="password" className="font-medium text-gray-700">Password</label>

                        <div className="flex items-center bg-blue-50 border border-blue-200 rounded-lg p-3
                        focus-within:border-blue-500 transition duration-200">

                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full bg-transparent outline-none"
                            />

                            <div
                                className="cursor-pointer text-gray-600 hover:text-gray-900 transition"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>

                        <Link
                            to="/forgot-password"
                            className="text-sm text-blue-600 hover:text-blue-800 ml-auto transition"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Login Button */}
                    <button
                        disabled={!valid}
                        className={`w-full py-3 rounded-lg text-white font-semibold transition-all
                        ${valid
                                ? "bg-green-600 hover:bg-green-700 shadow-sm"
                                : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Login
                    </button>

                </form>

                <p className="text-center mt-5 text-gray-700">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-green-700 hover:text-green-900 transition"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </section>
    )
}

export default Login
