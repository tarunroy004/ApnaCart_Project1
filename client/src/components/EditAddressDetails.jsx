import React from 'react'
import { useForm } from "react-hook-form"
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { IoClose } from "react-icons/io5"
import { useGlobalContext } from '../provider/GlobalProvider'

const EditAddressDetails = ({ close, data }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            _id: data._id,
            userId: data.userId,
            address_line: data.address_line,
            city: data.city,
            state: data.state,
            country: data.country,
            pincode: data.pincode,
            mobile: data.mobile
        }
    })

    const { fetchAddress } = useGlobalContext()

    const onSubmit = async (formData) => {
        try {
            const response = await Axios({
                ...SummaryApi.updateAddress,
                data: formData
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                close && close()
                reset()
                fetchAddress()
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section
            className='fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-start p-4 overflow-auto'
            onClick={(e) => e.target === e.currentTarget && close && close()}
        >
            <div className='bg-white p-6 w-full max-w-lg mt-8 rounded shadow-lg'>
                {/* Header */}
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='font-semibold text-lg text-gray-800'>Edit Address</h2>
                    <button onClick={close} className='text-gray-600 hover:text-red-500 transition-colors'>
                        <IoClose size={25} />
                    </button>
                </div>

                {/* Form */}
                <form className='grid gap-4' onSubmit={handleSubmit(onSubmit)}>
                    {/* Address Line */}
                    <div className='grid gap-1'>
                        <label htmlFor='addressline'>Address Line :</label>
                        <input
                            type='text'
                            id='addressline'
                            placeholder='Enter address'
                            className='border bg-blue-50 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400'
                            {...register("address_line", { required: "Address is required" })}
                        />
                        {errors.address_line && <span className="text-red-500 text-xs">{errors.address_line.message}</span>}
                    </div>

                    {/* City */}
                    <div className='grid gap-1'>
                        <label htmlFor='city'>City :</label>
                        <input
                            type='text'
                            id='city'
                            placeholder='Enter city'
                            className='border bg-blue-50 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400'
                            {...register("city", { required: "City is required" })}
                        />
                        {errors.city && <span className="text-red-500 text-xs">{errors.city.message}</span>}
                    </div>

                    {/* State */}
                    <div className='grid gap-1'>
                        <label htmlFor='state'>State :</label>
                        <input
                            type='text'
                            id='state'
                            placeholder='Enter state'
                            className='border bg-blue-50 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400'
                            {...register("state", { required: "State is required" })}
                        />
                        {errors.state && <span className="text-red-500 text-xs">{errors.state.message}</span>}
                    </div>

                    {/* Pincode */}
                    <div className='grid gap-1'>
                        <label htmlFor='pincode'>Pincode :</label>
                        <input
                            type='text'
                            id='pincode'
                            placeholder='Enter pincode'
                            className='border bg-blue-50 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400'
                            {...register("pincode", { required: "Pincode is required" })}
                        />
                        {errors.pincode && <span className="text-red-500 text-xs">{errors.pincode.message}</span>}
                    </div>

                    {/* Country */}
                    <div className='grid gap-1'>
                        <label htmlFor='country'>Country :</label>
                        <input
                            type='text'
                            id='country'
                            placeholder='Enter country'
                            className='border bg-blue-50 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400'
                            {...register("country", { required: "Country is required" })}
                        />
                        {errors.country && <span className="text-red-500 text-xs">{errors.country.message}</span>}
                    </div>

                    {/* Mobile */}
                    <div className='grid gap-1'>
                        <label htmlFor='mobile'>Mobile No. :</label>
                        <input
                            type='text'
                            id='mobile'
                            placeholder='Enter mobile number'
                            className='border bg-blue-50 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400'
                            {...register("mobile", { required: "Mobile number is required" })}
                        />
                        {errors.mobile && <span className="text-red-500 text-xs">{errors.mobile.message}</span>}
                    </div>

                    <button
                        type='submit'
                        className='bg-green-600 w-full py-2 font-semibold mt-4 text-white rounded hover:bg-green-500 transition-colors'
                    >
                        Submit
                    </button>
                </form>
            </div>
        </section>
    )
}

export default EditAddressDetails
