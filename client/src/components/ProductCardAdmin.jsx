import React, { useState } from 'react';
import EditProductAdmin from './EditProductAdmin';
import { IoClose } from 'react-icons/io5';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDeleteCancel = () => setOpenDelete(false);

  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: { _id: data._id },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchProductData && fetchProductData();
        setOpenDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="w-36 p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="w-full h-36 flex justify-center items-center bg-gray-50 rounded-md overflow-hidden">
        <img
          src={data?.image[0] || '/placeholder.png'}
          alt={data?.name}
          className="w-full h-full object-cover"
        />
      </div>

      <p className="mt-2 text-sm font-medium line-clamp-2">{data?.name}</p>
      <p className="text-gray-400 text-xs">{data?.unit}</p>

      <div className="grid grid-cols-2 gap-2 mt-3">
        <button
          onClick={() => setEditOpen(true)}
          className="text-xs font-semibold px-2 py-1 rounded-md bg-green-100 border border-green-500 text-green-600 hover:bg-green-200 transition"
        >
          Edit
        </button>
        <button
          onClick={() => setOpenDelete(true)}
          className="text-xs font-semibold px-2 py-1 rounded-md bg-red-100 border border-red-500 text-red-600 hover:bg-red-200 transition"
        >
          Delete
        </button>
      </div>

      {editOpen && (
        <EditProductAdmin
          fetchProductData={fetchProductData}
          data={data}
          close={() => setEditOpen(false)}
        />
      )}

      {openDelete && (
        <section className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-5 shadow-lg animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Confirm Delete</h3>
              <button onClick={() => setOpenDelete(false)}>
                <IoClose size={25} />
              </button>
            </div>
            <p className="my-4 text-sm text-gray-600">
              Are you sure you want to permanently delete this product?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleDeleteCancel}
                className="px-3 py-1 rounded-md bg-red-100 border border-red-500 text-red-600 hover:bg-red-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 rounded-md bg-green-100 border border-green-500 text-green-600 hover:bg-green-200 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductCardAdmin;
