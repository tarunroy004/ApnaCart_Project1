import React from 'react'
import { IoClose } from "react-icons/io5";

const AddFieldComponent = ({ close, value, onChange, submit }) => {
  return (
    <section className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex justify-center items-center p-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 animate-fadeIn">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-lg text-neutral-800">Add Field</h1>
          <button
            onClick={close}
            className="p-2 rounded-full hover:bg-neutral-100 transition"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Input */}
        <input
          className="bg-blue-50 mt-5 p-3 border border-neutral-300 rounded-xl w-full 
                     outline-none focus:bg-white focus:border-blue-500 transition"
          placeholder="Enter field name"
          value={value}
          onChange={onChange}
        />

        {/* Button */}
        <button
          onClick={submit}
          className="bg-primary-200 hover:bg-primary-100 transition font-semibold 
                     px-5 py-2 rounded-xl mt-5 mx-auto w-fit block shadow-sm"
        >
          Add Field
        </button>

      </div>

    </section>
  )
}

export default AddFieldComponent
