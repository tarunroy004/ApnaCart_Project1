import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const EditSubCategory = ({ close, data, fetchData }) => {
    const [subCategoryData, setSubCategoryData] = useState({
        _id: data._id,
        name: data.name,
        image: data.image,
        category: data.category || []
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

            setSubCategoryData(prev => ({
                ...prev,
                image: ImageResponse.data.url
            }));
        } catch (error) {
            AxiosToastError(error);
        }
    };

    const handleRemoveCategorySelected = (categoryId) => {
        const index = subCategoryData.category.findIndex(el => el._id === categoryId);
        if (index >= 0) {
            subCategoryData.category.splice(index, 1);
            setSubCategoryData(prev => ({ ...prev }));
        }
    };

    const handleSubmitSubCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios({
                ...SummaryApi.updateSubCategory,
                data: subCategoryData
            });
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
            <div className='w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg overflow-y-auto max-h-[95vh]'>
                {/* Header */}
                <div className='flex items-center justify-between mb-4'>
                    <h1 className='font-semibold text-lg'>Edit Sub Category</h1>
                    <button onClick={close} className='text-gray-600 hover:text-red-500'>
                        <IoClose size={25} />
                    </button>
                </div>

                <form className='grid gap-4' onSubmit={handleSubmitSubCategory}>
                    {/* Name */}
                    <div className='grid gap-1'>
                        <label htmlFor='name' className='font-medium'>Name</label>
                        <input
                            id='name'
                            name='name'
                            value={subCategoryData.name}
                            onChange={handleChange}
                            className='p-3 bg-blue-50 border rounded focus:outline-none focus:ring-2 focus:ring-primary-200'
                            placeholder='Enter sub-category name'
                        />
                    </div>

                    {/* Image */}
                    <div className='grid gap-1'>
                        <label className='font-medium'>Image</label>
                        <div className='flex flex-col lg:flex-row items-center gap-3'>
                            <div className='border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center rounded'>
                                {subCategoryData.image ? (
                                    <img
                                        alt='subCategory'
                                        src={subCategoryData.image}
                                        className='w-full h-full object-contain'
                                    />
                                ) : (
                                    <p className='text-sm text-neutral-400'>No Image</p>
                                )}
                            </div>
                            <label htmlFor='uploadSubCategoryImage'>
                                <div className='px-4 py-2 border border-primary-100 text-primary-200 rounded hover:bg-primary-200 hover:text-neutral-900 cursor-pointer'>
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

                    {/* Categories */}
                    <div className='grid gap-1'>
                        <label className='font-medium'>Select Category</label>
                        <div className='border rounded p-2 focus-within:border-primary-200'>
                            {/* Selected Categories */}
                            <div className='flex flex-wrap gap-2 mb-2'>
                                {subCategoryData.category.map((cat, index) => (
                                    <span key={cat._id} className='bg-white shadow px-2 py-1 rounded flex items-center gap-1'>
                                        {cat.name}
                                        <IoClose
                                            className='cursor-pointer hover:text-red-600'
                                            onClick={() => handleRemoveCategorySelected(cat._id)}
                                        />
                                    </span>
                                ))}
                            </div>

                            {/* Select Category Dropdown */}
                            <select
                                className='w-full p-2 border rounded focus:outline-none'
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const categoryDetails = allCategory.find(el => el._id === value);
                                    if (categoryDetails && !subCategoryData.category.some(c => c._id === value)) {
                                        setSubCategoryData(prev => ({
                                            ...prev,
                                            category: [...prev.category, categoryDetails]
                                        }));
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
                        className={`px-4 py-2 rounded font-semibold text-white 
                            ${subCategoryData?.name && subCategoryData?.image && subCategoryData?.category.length
                                ? "bg-primary-200 hover:bg-primary-100"
                                : "bg-gray-400 cursor-not-allowed"}`
                        }
                        disabled={!subCategoryData?.name || !subCategoryData?.image || !subCategoryData?.category.length}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditSubCategory;
