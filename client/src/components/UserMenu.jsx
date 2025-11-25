import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Divider from './Divider';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { logout } from '../store/userSlice';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from '../utils/isAdmin';

const UserMenu = ({ close }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({ ...SummaryApi.logout });
      if (response.data.success) {
        close && close();
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleClose = () => close && close();

  const adminLinks = [
    { label: "Category", path: "/dashboard/category" },
    { label: "Sub Category", path: "/dashboard/subcategory" },
    { label: "Upload Product", path: "/dashboard/upload-product" },
    { label: "Product", path: "/dashboard/product" }
  ];

  return (
    <div className='w-60 p-2 bg-white rounded-lg shadow-md'>
      
      {/* User Info */}
      <div className='mb-2 font-semibold'>My Account</div>
      <div className='flex items-center gap-2 text-sm mb-3'>
        <span className='flex-1 text-ellipsis line-clamp-1'>
          {user.name || user.mobile}{" "}
          {user.role === "ADMIN" && (
            <span className='ml-1 px-1 rounded bg-red-100 text-red-600 text-xs font-medium'>(Admin)</span>
          )}
        </span>
        <Link to="/dashboard/profile" onClick={handleClose} className='hover:text-primary-200 transition'>
          <HiOutlineExternalLink size={15} />
        </Link>
      </div>

      <Divider />

      {/* Menu Links */}
      <div className='grid gap-1 mt-2 text-sm'>
        {isAdmin(user.role) && adminLinks.map(link => (
          <Link
            key={link.path}
            to={link.path}
            onClick={handleClose}
            className='px-2 py-1 rounded hover:bg-orange-200 transition'
          >
            {link.label}
          </Link>
        ))}

        <Link
          to="/dashboard/myorders"
          onClick={handleClose}
          className='px-2 py-1 rounded hover:bg-orange-200 transition'
        >
          My Orders
        </Link>

        <Link
          to="/dashboard/address"
          onClick={handleClose}
          className='px-2 py-1 rounded hover:bg-orange-200 transition'
        >
          Saved Address
        </Link>

        <button
          onClick={handleLogout}
          className='text-left px-2 py-1 rounded hover:bg-orange-200 transition w-full'
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
