import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const UploadSubCategoryModel = ({ close, fetchData }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: []
  });
  const allCategory = useSelector(state => state.product.allCategory);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData(prev => ({ ...prev, [name]: value }));
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const response = await uploadImage(file);
      const { data: ImageResponse } = response;
      setSubCategoryData(prev => ({ ...prev, image: ImageResponse.data.url }));
    } catch (error) {
      toast.error("Image upload failed!");
    }
  };

  const handleRemoveCategorySelected = (categoryId) => {
    setSubCategoryData(prev => ({
      ...prev,
      category: prev.category.filter(cat => cat._id !== categoryId)
    }));
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();
    if (!subCategoryData.name || !subCategoryData.image || subCategoryData.category.length === 0) return;

    try {
      const response = await Axios({ ...SummaryApi.createSubCategory, data: subCategoryData });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        close && close();
        fetchData && fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className='fixed inset-0 bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg'>
        
        {/* Header */}
        <div className='flex items-center justify-between mb-5'>
          <h1 className='font-semibold text-lg'>Add Sub Category</h1>
          <button onClick={close} className='text-gray-600 hover:text-gray-900 transition'>
            <IoClose size={25} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmitSubCategory} className='grid gap-4'>

          {/* Subcategory Name */}
          <div className='flex flex-col gap-1'>
            <label htmlFor='name' className='text-sm font-medium'>Name</label>
            <input
              id='name'
              name='name'
              value={subCategoryData.name}
              onChange={handleChange}
              placeholder='Enter subcategory name'
              className='p-3 border rounded-lg bg-gray-50 focus:border-primary-200 focus:ring-1 focus:ring-primary-200 outline-none transition'
            />
          </div>

          {/* Subcategory Image */}
          <div className='flex flex-col gap-2'>
            <p className='text-sm font-medium'>Image</p>
            <div className='flex flex-col lg:flex-row items-center gap-4'>
              <div className='border rounded-lg h-36 w-full lg:w-36 bg-gray-50 flex items-center justify-center shadow-sm'>
                {subCategoryData.image ? (
                  <img
                    src={subCategoryData.image}
                    alt='subcategory'
                    className='w-full h-full object-contain rounded-lg'
                  />
                ) : (
                  <p className='text-gray-400 text-sm'>No Image</p>
                )}
              </div>

              <label htmlFor='uploadSubCategoryImage'>
                <div className='px-4 py-2 rounded-lg border border-primary-200 text-primary-200 font-medium cursor-pointer hover:bg-primary-200 hover:text-white transition'>
                  Upload Image
                </div>
                <input
                  type='file'
                  id='uploadSubCategoryImage'
                  className='hidden'
                  onChange={handleUploadSubCategoryImage}
                />
              </label>
            </div>
          </div>

          {/* Select Category */}
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium'>Select Category</label>
            <div className='border rounded-lg p-2 focus-within:border-primary-200 transition'>
              
              {/* Selected categories */}
              <div className='flex flex-wrap gap-2 mb-2'>
                {subCategoryData.category.map(cat => (
                  <div key={cat._id} className='flex items-center gap-1 bg-primary-100 text-primary-800 px-2 py-1 rounded-full shadow-sm'>
                    <span>{cat.name}</span>
                    <IoClose
                      size={16}
                      className='cursor-pointer hover:text-red-600'
                      onClick={() => handleRemoveCategorySelected(cat._id)}
                    />
                  </div>
                ))}
              </div>

              {/* Category dropdown */}
              <select
                className='w-full p-2 bg-transparent outline-none border rounded'
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryDetails = allCategory.find(el => el._id === value);
                  if (categoryDetails && !subCategoryData.category.some(c => c._id === value)) {
                    setSubCategoryData(prev => ({ ...prev, category: [...prev.category, categoryDetails] }));
                  }
                }}
              >
                <option value=''>Select Category</option>
                {allCategory.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={!subCategoryData.name || !subCategoryData.image || subCategoryData.category.length === 0}
            className={`w-full py-2 rounded-lg font-semibold transition
              ${subCategoryData.name && subCategoryData.image && subCategoryData.category.length ? 'bg-primary-200 hover:bg-primary-100 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategoryModel;
