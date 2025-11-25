import React, { useState } from 'react'
import { IoClose } from "react-icons/io5"
import uploadImage from '../utils/UploadImage'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'

const EditCategory = ({ close, fetchData, data: CategoryData }) => {
    const [data, setData] = useState({
        _id: CategoryData._id,
        name: CategoryData.name,
        image: CategoryData.image
    })
    const [loading, setLoading] = useState(false)

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!data.name || !data.image) {
            toast.error("Please provide both name and image")
            return
        }

        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateCategory,
                data
            })
            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                close()
                fetchData()
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    const handleUploadCategoryImage = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        try {
            setLoading(true)
            const response = await uploadImage(file)
            const { data: ImageResponse } = response
            setData(prev => ({ ...prev, image: ImageResponse.data.url }))
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section
            className='fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4 overflow-auto'
            onClick={(e) => e.target === e.currentTarget && close && close()}
        >
            <div className='bg-white w-full max-w-lg p-6 rounded-2xl shadow-lg'>
                {/* Header */}
                <div className='flex justify-between items-center border-b pb-3 mb-4'>
                    <h1 className='font-semibold text-xl'>Update Category</h1>
                    <button onClick={close} className='text-gray-600 hover:text-red-500 transition-colors'>
                        <IoClose size={25} />
                    </button>
                </div>

                {/* Form */}
                <form className='grid gap-4' onSubmit={handleSubmit}>
                    {/* Category Name */}
                    <div className='grid gap-1'>
                        <label htmlFor='categoryName' className='font-medium text-gray-700'>Category Name</label>
                        <input
                            type='text'
                            id='categoryName'
                            name='name'
                            placeholder='Enter category name'
                            value={data.name}
                            onChange={handleOnChange}
                            className='border border-gray-300 bg-gray-50 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
                        />
                    </div>

                    {/* Category Image */}
                    <div className='grid gap-1'>
                        <label className='font-medium text-gray-700'>Category Image</label>
                        <div className='flex flex-col lg:flex-row gap-4 items-center'>
                            <div className='border border-gray-200 bg-gray-50 h-36 w-full lg:w-36 rounded flex items-center justify-center'>
                                {data.image ? (
                                    <img
                                        alt='category'
                                        src={data.image}
                                        className='w-full h-full object-contain rounded'
                                    />
                                ) : (
                                    <p className='text-gray-400 text-sm'>No Image</p>
                                )}
                            </div>

                            <label htmlFor='uploadCategoryImage'>
                                <div className={`px-4 py-2 rounded border text-center font-medium
                                    ${!data.name ? "bg-gray-300 cursor-not-allowed" : "border-blue-400 hover:bg-blue-100 cursor-pointer transition"}
                                `}>
                                    {loading ? "Loading..." : "Upload Image"}
                                </div>
                                <input
                                    disabled={!data.name}
                                    type='file'
                                    id='uploadCategoryImage'
                                    className='hidden'
                                    onChange={handleUploadCategoryImage}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        disabled={!data.name || !data.image || loading}
                        className={`w-full py-2 font-semibold rounded text-white transition
                            ${data.name && data.image ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"}
                        `}
                    >
                        {loading ? "Updating..." : "Update Category"}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default EditCategory
