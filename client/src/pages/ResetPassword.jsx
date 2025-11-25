import React, { useEffect, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'

const ResetPassword = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const valideValue = Object.values(data).every(el => el)

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/")
    }

    if (location?.state?.email) {
      setData(prev => ({
        ...prev,
        email: location.state.email
      }))
    }
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (data.newPassword !== data.confirmPassword) {
      toast.error("New password and confirm password must be same.")
      return
    }

    try {
      const response = await Axios({
        ...SummaryApi.resetPassword,
        data
      })

      if (response.data.error) toast.error(response.data.message)

      if (response.data.success) {
        toast.success(response.data.message)
        navigate("/login")
        setData({
          email: "",
          newPassword: "",
          confirmPassword: ""
        })
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className="w-full min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Reset Your Password
        </h2>
        <p className="text-center text-gray-500 mb-6">Enter a new password below</p>

        <form className="grid gap-5" onSubmit={handleSubmit}>

          {/* New Password */}
          <div className="grid gap-1">
            <label htmlFor="newPassword" className="font-medium text-gray-700">New Password</label>
            <div className="bg-gray-50 p-3 border rounded-xl flex items-center focus-within:border-blue-500 transition-all shadow-sm">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                className="w-full outline-none bg-transparent"
                name="newPassword"
                value={data.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
              />
              <div className="cursor-pointer text-gray-600" onClick={() => setShowPassword(prev => !prev)}>
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
              <div className="cursor-pointer text-gray-600" onClick={() => setShowConfirmPassword(prev => !prev)}>
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={!valideValue}
            className={`${
              valideValue ? "bg-blue-600 hover:bg-blue-700 cursor-pointer" : "bg-gray-400 cursor-not-allowed"
            } text-white py-3 rounded-xl font-semibold shadow-md transition-all`}
          >
            Change Password
          </button>
        </form>

        <p className="text-center mt-5 text-gray-600">
          Back to Login?{" "}
          <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
            Login
          </Link>
        </p>

      </div>
    </section>
  )
}

export default ResetPassword
