import React from 'react'
import UserMenu from '../components/UserMenu'
import { IoClose } from "react-icons/io5";

const UserMenuMobile = () => {
  return (
    <section className='bg-white h-full w-full py-3'>
      {/* Close Button */}
      <div className='w-full flex justify-end px-3'>
        <button 
          onClick={() => window.history.back()} 
          className='text-neutral-700 p-2 rounded-full hover:bg-neutral-100 transition'
        >
          <IoClose size={26}/>
        </button>
      </div>

      {/* Menu Card */}
      <div className='container mx-auto px-4 pb-10'>
        <div className='bg-white rounded-2xl shadow-md p-4'>
          <UserMenu/>
        </div>
      </div>
    </section>
  )
}

export default UserMenuMobile
