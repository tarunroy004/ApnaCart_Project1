import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OtpVerification = () => {
    const [data, setData] = useState(["","","","","",""])
    const navigate = useNavigate()
    const inputRef = useRef([])
    const location = useLocation()

    useEffect(()=>{
        if(!location?.state?.email){
            navigate("/forgot-password")
        }
    },[])

    const valideValue = data.every(el => el)

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password_otp_verification,
                data : {
                    otp : data.join(""),
                    email : location?.state?.email
                }
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData(["","","","","",""])
                navigate("/reset-password",{
                    state : {
                        data : response.data,
                        email : location?.state?.email
                    }
                })
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className='w-full min-h-screen flex items-center justify-center bg-gray-50 px-3'>
            <div className='bg-white w-full max-w-lg mx-auto rounded-xl shadow-md p-8'>
                
                {/* Title */}
                <h1 className='text-2xl font-semibold text-gray-800 text-center'>
                    OTP Verification
                </h1>
                <p className='text-center text-gray-500 mt-1'>
                    Enter the 6-digit code sent to your email
                </p>

                <form className='grid gap-5 mt-6' onSubmit={handleSubmit}>
                    
                    {/* OTP input boxes */}
                    <div>
                        <label className='text-gray-700 font-medium'>
                            Enter OTP :
                        </label>

                        <div className='flex items-center justify-between mt-4 gap-2'>
                            {data.map((element,index)=>(
                                <input
                                    key={"otp"+index}
                                    type='text'
                                    maxLength={1}
                                    id='otp'
                                    ref={(ref)=>{
                                        inputRef.current[index] = ref
                                    }}
                                    value={data[index]}
                                    onChange={(e)=>{
                                        const value = e.target.value

                                        const newData = [...data]
                                        newData[index] = value
                                        setData(newData)

                                        if(value && index < 5){
                                            inputRef.current[index+1].focus()
                                        }
                                    }}
                                    className='bg-gray-100 w-14 h-14 text-lg border rounded-lg text-center font-semibold outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition'
                                />
                            ))}
                        </div>
                    </div>

                    {/* Button */}
                    <button 
                        disabled={!valideValue}
                        className={`w-full py-3 rounded-lg font-semibold text-white text-lg shadow-md transition-all
                        ${valideValue 
                            ? "bg-green-700 hover:bg-green-800" 
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Verify OTP
                    </button>
                </form>

                {/* Login link */}
                <p className='text-center mt-4 text-gray-600'>
                    Already have an account?{" "}
                    <Link 
                        to={"/login"} 
                        className='font-semibold text-green-700 hover:text-green-800'
                    >
                        Login
                    </Link>
                </p>

            </div>
        </section>
    )
}

export default OtpVerification
