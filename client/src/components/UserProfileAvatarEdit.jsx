import React, { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { updatedAvatar } from '../store/userSlice';
import { IoClose } from "react-icons/io5";

const UserProfileAvatarEdit = ({ close }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      setLoading(true);
      const response = await Axios({ ...SummaryApi.uploadAvatar, data: formData });
      const { data: responseData } = response;

      dispatch(updatedAvatar(responseData.data.avatar));
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <section className='fixed inset-0 bg-neutral-900 bg-opacity-70 flex items-center justify-center p-4 z-50'>
      <div className='bg-white max-w-sm w-full rounded-xl p-6 flex flex-col items-center shadow-lg relative'>
        
        {/* Close Button */}
        <button 
          onClick={close} 
          className='absolute top-3 right-3 text-neutral-700 hover:text-red-500 transition'
        >
          <IoClose size={22} />
        </button>

        {/* Avatar */}
        <div className='w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 drop-shadow-md mb-4'>
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className='w-full h-full object-cover' />
          ) : (
            <FaRegUserCircle size={65} className='text-gray-400' />
          )}
        </div>

        {/* Upload Form */}
        <form>
          <label htmlFor='uploadProfile'>
            <div 
              className={`px-6 py-2 rounded text-sm font-medium border cursor-pointer transition 
                          ${loading ? 'bg-gray-300 cursor-not-allowed' : 'border-primary-200 hover:bg-primary-200'}`}
            >
              {loading ? "Uploading..." : "Upload New Avatar"}
            </div>
            <input 
              type='file' 
              id='uploadProfile' 
              className='hidden' 
              onChange={handleUploadAvatarImage} 
              disabled={loading}
            />
          </label>
        </form>

      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
