import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { valideURLConvert } from '../utils/valideURLConvert'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import AddToCartButton from './AddToCartButton'

const CardProduct = ({ data }) => {
    const url = `/product/${valideURLConvert(data.name)}-${data._id}`
    const [loading, setLoading] = useState(false)
 
    return (
        <Link 
            to={url} 
            className='border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer grid gap-2 lg:gap-3 p-3 lg:p-4 min-w-[150px] lg:min-w-[208px]'
        >
            {/* Image */}
            <div className='w-full max-h-32 lg:max-h-40 rounded-lg overflow-hidden relative'>
                <img 
                    src={data.image[0]} 
                    alt={data.name}
                    className='w-full h-full object-cover lg:scale-110 transition-transform duration-500 hover:scale-125'
                />
                {Boolean(data.discount) && (
                    <span className='absolute top-2 left-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold shadow-md'>
                        {data.discount}% OFF
                    </span>
                )}
            </div>

            {/* Product Name */}
            <h3 className='text-sm lg:text-base font-medium line-clamp-2 px-1 lg:px-0'>
                {data.name}
            </h3>

            {/* Unit */}
            <p className='text-gray-500 text-xs lg:text-sm px-1 lg:px-0'>
                {data.unit}
            </p>

            {/* Price and Add to Cart */}
            <div className='flex items-center justify-between px-1 lg:px-0 mt-2'>
                <div className='flex items-center gap-1'>
                    <span className='text-sm lg:text-base font-semibold text-gray-800'>
                        {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
                    </span>
                    {data.discount ? (
                        <span className='text-gray-400 text-xs line-through'>
                            {DisplayPriceInRupees(data.price)}
                        </span>
                    ) : null}
                </div>

                <div>
                    {data.stock === 0 ? (
                        <p className='text-red-500 text-xs lg:text-sm font-medium'>Out of stock</p>
                    ) : (
                        <AddToCartButton data={data} />
                    )}
                </div>
            </div>
        </Link>
    )
}

export default CardProduct
