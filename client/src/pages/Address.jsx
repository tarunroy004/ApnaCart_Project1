import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddAddress from "../components/AddAddress";
import { MdDelete, MdEdit } from "react-icons/md";
import EditAddressDetails from "../components/EditAddressDetails";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useGlobalContext } from "../provider/GlobalProvider";

const Address = () => {
  const addressList = useSelector((state) => state.addresses.addressList);
  const [openAddress, setOpenAddress] = useState(false);
  const [OpenEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const { fetchAddress } = useGlobalContext();

  const handleDisableAddress = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.disableAddress,
        data: { _id: id },
      });

      if (response.data.success) {
        toast.success("Address removed");
        fetchAddress && fetchAddress();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-4">
      {/* Header */}
      <div className="bg-white shadow-md rounded-xl px-4 py-3 flex justify-between items-center border">
        <h2 className="font-semibold text-lg text-gray-800">My Addresses</h2>

        <button
          onClick={() => setOpenAddress(true)}
          className="px-4 py-1.5 rounded-full border border-primary-200 text-primary-200 
          hover:bg-primary-200 hover:text-black transition-all duration-200"
        >
          + Add Address
        </button>
      </div>

      {/* Address List */}
      <div className="p-4 grid gap-4">
        {addressList.map((address, index) => (
          <div
            key={index}
            className={`bg-white border rounded-xl p-4 shadow-sm flex justify-between items-start transition-all duration-300 hover:shadow-md ${
              !address.status && "hidden"
            }`}
          >
            <div className="space-y-1 text-gray-700">
              <p className="font-medium">{address.address_line}</p>
              <p>{address.city}</p>
              <p>{address.state}</p>
              <p>
                {address.country} - {address.pincode}
              </p>
              <p className="font-semibold">{address.mobile}</p>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setOpenEdit(true);
                  setEditData(address);
                }}
                className="bg-green-100 hover:bg-green-600 hover:text-white p-2 rounded-lg transition-all"
              >
                <MdEdit size={20} />
              </button>

              <button
                onClick={() => handleDisableAddress(address._id)}
                className="bg-red-100 hover:bg-red-600 hover:text-white p-2 rounded-lg transition-all"
              >
                <MdDelete size={22} />
              </button>
            </div>
          </div>
        ))}

        {/* Add Address Card */}
        <div
          onClick={() => setOpenAddress(true)}
          className="h-20 bg-white border-2 border-dashed rounded-xl flex justify-center items-center
          text-gray-500 hover:bg-gray-50 cursor-pointer transition-all"
        >
          + Add New Address
        </div>
      </div>

      {/* Modals */}
      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
      {OpenEdit && (
        <EditAddressDetails data={editData} close={() => setOpenEdit(false)} />
      )}
    </div>
  );
};

export default Address;
