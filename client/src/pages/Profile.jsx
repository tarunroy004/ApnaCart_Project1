import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';

const Profile = () => {
  const user = useSelector(state => state.user)
  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false)
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    })
  }, [user])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        const userData = await fetchUserDetails()
        dispatch(setUserDetails(userData.data))
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 flex justify-center w-full">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg p-8 border border-gray-100">

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 rounded-full overflow-hidden shadow-md bg-gray-100 flex justify-center items-center">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaRegUserCircle size={90} className="text-gray-400" />
            )}
          </div>

          <button
            onClick={() => setProfileAvatarEdit(true)}
            className="mt-4 text-sm px-5 py-2 rounded-full border border-red-300
                       text-red-400 hover:bg-red-300 hover:text-white transition-all shadow-sm"
          >
            Edit Profile Picture
          </button>

          {openProfileAvatarEdit && (
            <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid gap-5">

          {/* Name */}
          <div className="grid">
            <label className="font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={userData.name}
              onChange={handleOnChange}
              required
              className="p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none 
                         focus:ring-2 focus:ring-primary-200 focus:bg-white transition-all"
            />
          </div>

          {/* Email */}
          <div className="grid">
            <label className="font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={userData.email}
              onChange={handleOnChange}
              required
              className="p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none 
                         focus:ring-2 focus:ring-primary-200 focus:bg-white transition-all"
            />
          </div>

          {/* Mobile */}
          <div className="grid">
            <label className="font-medium text-gray-700 mb-1">Mobile</label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter your mobile number"
              value={userData.mobile}
              onChange={handleOnChange}
              required
              className="p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none 
                         focus:ring-2 focus:ring-primary-200 focus:bg-white transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            className="mt-3 bg-red-400 text-white font-semibold py-3 rounded-xl 
                       hover:bg-red-500 transition-all shadow-md active:scale-[0.98]"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>

      </div>
    </div>
  )
}

export default Profile
