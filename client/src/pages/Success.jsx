import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Success = () => {
  const location = useLocation()

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center gap-5 border border-green-200">

        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <p className="text-green-700 font-bold text-xl">
          {location?.state?.text ? location.state.text : "Payment"} Successful!
        </p>

        <p className="text-gray-600 text-sm">
          Your action has been completed successfully.
        </p>

        <Link
          to="/"
          className="mt-2 px-6 py-2 rounded-lg font-medium border border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition-all duration-200"
        >
          Go To Home
        </Link>
      </div>
    </div>
  )
}

export default Success
