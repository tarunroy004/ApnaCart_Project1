    import React from 'react'
    import { IoClose } from 'react-icons/io5'
    import { Link, useNavigate } from 'react-router-dom'
    import { useGlobalContext } from '../provider/GlobalProvider'
    import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
    import { FaCaretRight } from "react-icons/fa"
    import { useSelector } from 'react-redux'
    import AddToCartButton from './AddToCartButton'
    import { pricewithDiscount } from '../utils/PriceWithDiscount'
    import imageEmpty from '../assets/empty_cart.webp'
    import toast from 'react-hot-toast'

    const DisplayCartItem = ({ close }) => {
        const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext()
        const cartItem = useSelector(state => state.cartItem.cart)
        const user = useSelector(state => state.user)
        const navigate = useNavigate()

        const redirectToCheckoutPage = () => {
            if (user?._id) {
                navigate("/checkout")
                close && close()
                return
            }
            toast("Please Login")
        }

        return (
            <section className='fixed inset-0 z-50 bg-neutral-900 bg-opacity-70 flex justify-end animate-fade-in'>
                <div className='bg-white w-full max-w-sm min-h-screen flex flex-col shadow-xl rounded-l-3xl overflow-hidden'>
                    
                    {/* Header */}
                    <div className='flex items-center justify-between p-4 shadow-md'>
                        <h2 className='font-semibold text-lg text-gray-800'>Cart</h2>
                        <button onClick={close} className='text-gray-600 hover:text-gray-800 transition-colors'>
                            <IoClose size={25} />
                        </button>
                    </div>

                    {/* Cart Content */}
                    <div className='flex-1 overflow-y-auto bg-blue-50 p-3 space-y-4'>
                        {cartItem[0] ? (
                            <>
                                {/* Total Savings */}
                                <div className='flex items-center justify-between px-4 py-2 bg-green-100 text-green-700 font-medium rounded-full'>
                                    <p>Your total savings</p>
                                    <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</p>
                                </div>

                                {/* Items List */}
                                <div className='bg-white rounded-xl p-4 grid gap-5 overflow-auto max-h-[60vh]'>
                                    {cartItem.map(item => (
                                        <div key={item?._id} className='flex w-full gap-4 items-center'>
                                            <div className='w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center'>
                                                <img src={item?.productId?.image[0]} className='object-contain w-full h-full' />
                                            </div>
                                            <div className='flex-1 text-xs'>
                                                <p className='font-medium line-clamp-2'>{item?.productId?.name}</p>
                                                <p className='text-gray-400'>{item?.productId?.unit}</p>
                                                <p className='font-semibold text-gray-800'>{DisplayPriceInRupees(pricewithDiscount(item?.productId?.price, item?.productId?.discount))}</p>
                                            </div>
                                            <AddToCartButton data={item?.productId} />
                                        </div>
                                    ))}
                                </div>

                                {/* Bill Details */}
                                <div className='bg-white p-4 rounded-xl shadow-sm space-y-2'>
                                    <h3 className='font-semibold text-gray-800'>Bill details</h3>
                                    <div className='flex justify-between text-sm text-gray-700'>
                                        <span>Items total</span>
                                        <span>
                                            <span className='line-through text-gray-400 mr-2'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span>
                                            {DisplayPriceInRupees(totalPrice)}
                                        </span>
                                    </div>
                                    <div className='flex justify-between text-sm text-gray-700'>
                                        <span>Quantity total</span>
                                        <span>{totalQty} item</span>
                                    </div>
                                    <div className='flex justify-between text-sm text-gray-700'>
                                        <span>Delivery Charge</span>
                                        <span>Free</span>
                                    </div>
                                    <div className='flex justify-between font-semibold text-gray-800'>
                                        <span>Grand total</span>
                                        <span>{DisplayPriceInRupees(totalPrice)}</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className='flex flex-col justify-center items-center h-full gap-4'>
                                <img src={imageEmpty} className='w-3/4 h-auto object-contain' alt="Empty Cart" />
                                <Link onClick={close} to={"/"} className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-colors'>
                                    Shop Now
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Checkout Bar */}
                    {cartItem[0] && (
                        <div className='p-4 bg-green-700 text-white rounded-t-3xl flex items-center justify-between gap-4 shadow-lg'>
                            <div className='font-bold text-lg'>
                                {DisplayPriceInRupees(totalPrice)}
                            </div>
                            <button onClick={redirectToCheckoutPage} className='flex items-center gap-2 font-semibold hover:opacity-90 transition-opacity'>
                                Proceed <FaCaretRight />
                            </button>
                        </div>
                    )}

                </div>
            </section>
        )
    }

    export default DisplayCartItem
