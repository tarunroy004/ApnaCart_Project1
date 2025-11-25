import React from 'react'
import { useForm } from "react-hook-form"
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from '../provider/GlobalProvider'

const AddAddress = ({ close }) => {
    const { register, handleSubmit, reset } = useForm()
    const { fetchAddress } = useGlobalContext()

    const onSubmit = async (data) => {
        try {
            const response = await Axios({
                ...SummaryApi.createAddress,
                data: {
                    address_line: data.addressline,
                    city: data.city,
                    state: data.state,
                    country: data.country,
                    pincode: data.pincode,
                    mobile: data.mobile
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                if (close) {
                    close()
                    reset()
                    fetchAddress()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-start justify-center py-10 overflow-auto">

            <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 animate-fadeIn">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg text-neutral-800">
                        Add Address
                    </h2>
                    <button
                        onClick={close}
                        className="p-2 rounded-full hover:bg-neutral-100 transition"
                    >
                        <IoClose size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="mt-5 grid gap-4">

                    {/* Input Group */}
                    {[
                        { id: "addressline", label: "Address Line" },
                        { id: "city", label: "City" },
                        { id: "state", label: "State" },
                        { id: "pincode", label: "Pincode" },
                        { id: "country", label: "Country" },
                        { id: "mobile", label: "Mobile No." },
                    ].map((field) => (
                        <div className="grid gap-1" key={field.id}>
                            <label htmlFor={field.id} className="text-sm font-medium text-neutral-700">
                                {field.label}:
                            </label>
                            <input
                                type="text"
                                id={field.id}
                                className="border border-neutral-300 bg-blue-50 focus:bg-white focus:border-blue-500 outline-none p-2 rounded-lg transition"
                                {...register(field.id, { required: true })}
                            />
                        </div>
                    ))}

                    {/* Button */}
                    <button
                        type="submit"
                        className="bg-primary-200 hover:bg-primary-100 transition font-semibold py-2 rounded-lg mt-3 w-full"
                    >
                        Submit
                    </button>

                </form>
            </div>
        </section>
    )
}

export default AddAddress
