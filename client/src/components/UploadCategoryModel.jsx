import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const UploadCategoryModel = ({ close, fetchData }) => {
  const [data, setData] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.image) return;

    try {
      setLoading(true);
      const response = await Axios({ ...SummaryApi.addCategory, data });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        close();
        fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const response = await uploadImage(file);
    const { data: ImageResponse } = response;

    setData(prev => ({ ...prev, image: ImageResponse.data.url }));
  };

  return (
    <section className='fixed inset-0 bg-neutral-800 bg-opacity-60 flex items-center justify-center p-4 z-50'>
      <div className='bg-white max-w-3xl w-full p-6 rounded-2xl shadow-lg'>
        {/* Header */}
        <div className='flex items-center justify-between mb-4'>
          <h1 className='font-semibold text-lg'>Add Category</h1>
          <button onClick={close} className='text-gray-600 hover:text-gray-900 transition'>
            <IoClose size={25} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='grid gap-4'>
          
          {/* Category Name */}
          <div className='flex flex-col gap-1'>
            <label htmlFor='categoryName' className='text-sm font-medium'>Name</label>
            <input
              type='text'
              id='categoryName'
              name='name'
              value={data.name}
              onChange={handleOnChange}
              placeholder='Enter category name'
              className='p-2 border border-gray-200 rounded-lg bg-gray-50 focus:border-primary-200 focus:ring-1 focus:ring-primary-200 outline-none transition'
            />
          </div>

          {/* Category Image */}
          <div className='flex flex-col gap-2'>
            <p className='text-sm font-medium'>Image</p>
            <div className='flex flex-col lg:flex-row gap-4 items-center'>
              
              {/* Image Preview */}
              <div className='border h-36 w-full lg:w-36 rounded-lg bg-gray-50 flex items-center justify-center shadow-sm'>
                {data.image ? (
                  <img src={data.image} alt='category' className='w-full h-full object-contain rounded-lg' />
                ) : (
                  <p className='text-gray-400 text-sm'>No Image</p>
                )}
              </div>

              {/* Upload Button */}
              <label htmlFor='uploadCategoryImage'>
                <div className={`px-4 py-2 rounded-lg font-medium border transition cursor-pointer 
                  ${!data.name ? 'bg-gray-300 text-gray-500 border-gray-300' : 'bg-primary-200 hover:bg-primary-100 border-primary-300 text-white'}`}>
                  Upload Image
                </div>
                <input
                  type='file'
                  id='uploadCategoryImage'
                  className='hidden'
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={!data.name || !data.image || loading}
            className={`w-full py-2 rounded-lg font-semibold transition
              ${data.name && data.image ? 'bg-primary-200 hover:bg-primary-100 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;
