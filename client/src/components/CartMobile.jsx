import React from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { FaCartShopping } from 'react-icons/fa6'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { FaCaretRight } from "react-icons/fa"
import { useSelector } from 'react-redux'

const CartMobileLink = () => {
    const { totalPrice, totalQty } = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart)

    return (
        <>
            {cartItem[0] && (
                <div className='fixed bottom-4 inset-x-4 lg:hidden z-50 animate-slide-up'>
                    <div className='bg-green-600 px-4 py-3 rounded-2xl text-white flex items-center justify-between gap-3 shadow-lg transition-transform duration-300 hover:scale-105'>
                        
                        {/* Cart summary */}
                        <div className='flex items-center gap-3'>
                            <div className='p-3 bg-green-500 rounded-full flex items-center justify-center'>
                                <FaCartShopping className='text-white'/>
                            </div>
                            <div className='text-xs'>
                                <p className='font-medium'>{totalQty} items</p>
                                <p className='font-semibold'>{DisplayPriceInRupees(totalPrice)}</p>
                            </div>
                        </div>

                        {/* View Cart Link */}
                        <Link 
                            to={"/cart"} 
                            className='flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-gray-200'
                        >
                            <span>View Cart</span>
                            <FaCaretRight className='text-white'/>
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}

export default CartMobileLink
