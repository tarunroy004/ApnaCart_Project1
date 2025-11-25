import React from 'react'
import { IoClose } from "react-icons/io5";

const CofirmBox = ({ cancel, confirm, close }) => {
  return (
    <div className='fixed inset-0 z-50 bg-neutral-900 bg-opacity-70 flex justify-center items-center p-4 animate-fade-in'>
      
      <div className='bg-white w-full max-w-md p-6 rounded-2xl shadow-xl transform transition-transform duration-300 scale-95 animate-scale-up'>
        
        {/* Header */}
        <div className='flex justify-between items-center mb-4'>
          <h1 className='font-semibold text-lg text-gray-800'>Permanent Delete</h1>
          <button onClick={close} className='text-gray-600 hover:text-gray-800 transition-colors'>
            <IoClose size={25} />
          </button>
        </div>

        {/* Message */}
        <p className='text-gray-600 mb-6'>Are you sure you want to permanently delete this item?</p>

        {/* Actions */}
        <div className='flex justify-end gap-4'>
          <button 
            onClick={cancel} 
            className='px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300'
          >
            Cancel
          </button>
          <button 
            onClick={confirm} 
            className='px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300'
          >
            Confirm
          </button>
        </div>

      </div>
    </div>
  )
}

export default CofirmBox
