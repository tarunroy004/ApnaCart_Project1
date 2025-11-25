import React from 'react';
import { IoClose } from 'react-icons/io5';

const ViewImage = ({ url, close }) => {
  return (
    <div className="fixed inset-0 bg-neutral-900 bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-lg max-h-[80vh] bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-700 hover:text-red-500 transition"
        >
          <IoClose size={25} />
        </button>

        {/* Image */}
        <div className="flex-1 flex items-center justify-center p-2">
          <img
            src={url}
            alt="Full Screen"
            className="max-w-full max-h-full object-contain rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewImage;
