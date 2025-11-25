import React from 'react'

const CardLoading = () => {
  return (
    <div className='border border-gray-200 rounded-xl shadow-sm cursor-pointer bg-white overflow-hidden animate-pulse p-4 lg:p-6 grid gap-3 lg:gap-4 min-w-[150px] lg:min-w-[208px]'>
      
      {/* Image placeholder */}
      <div className='w-full h-32 lg:h-40 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded-lg' />

      {/* Title placeholder */}
      <div className='h-5 lg:h-6 w-3/4 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded' />

      {/* Description placeholder */}
      <div className='h-4 lg:h-5 w-full bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded' />
      <div className='h-4 lg:h-5 w-1/2 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded' />

      {/* Price & button placeholders */}
      <div className='flex items-center justify-between gap-3'>
        <div className='h-8 lg:h-10 w-20 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded' />
        <div className='h-8 lg:h-10 w-20 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded' />
      </div>

    </div>
  )
}

export default CardLoading
