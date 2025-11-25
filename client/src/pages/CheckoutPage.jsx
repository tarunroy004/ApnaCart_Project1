import React, { useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import AddAddress from '../components/AddAddress'
import { useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'

const CheckoutPage = () => {

  const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem, fetchOrder } = useGlobalContext()
  const [openAddress, setOpenAddress] = useState(false)
  const addressList = useSelector(state => state.addresses.addressList)
  const [selectAddress, setSelectAddress] = useState(0)
  const cartItemsList = useSelector(state => state.cartItem.cart)
  const navigate = useNavigate()


  const handleCashOnDelivery = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        fetchCartItem && fetchCartItem()
        fetchOrder && fetchOrder()

        navigate('/success', {
          state: { text: "Order" }
        })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }


  const handleOnlinePayment = async () => {
    try {
      toast.loading("Loading...")
      const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
      const stripePromise = await loadStripe(stripePublicKey)

      const response = await Axios({
        ...SummaryApi.payment_url,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        }
      })

      const { data: responseData } = response

      stripePromise.redirectToCheckout({ sessionId: responseData.id })

      fetchCartItem && fetchCartItem()
      fetchOrder && fetchOrder()
    } catch (error) {
      AxiosToastError(error)
    }
  }



  return (
    <section className="min-h-screen bg-gray-50 py-6">

      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6">

        {/* LEFT - ADDRESS */}
        <div className="w-full">
          <h3 className="text-xl font-semibold mb-3">Choose Your Address</h3>

          <div className="bg-white shadow-sm rounded-xl p-4 grid gap-4">

            {addressList.map((address, index) => (
              <label
                key={index}
                htmlFor={"address" + index}
                className={`${!address.status && "hidden"} cursor-pointer`}
              >
                <div className="border rounded-xl p-4 flex gap-4 items-start hover:bg-blue-50 transition-all shadow-sm hover:shadow-md">
                  <input
                    id={"address" + index}
                    type="radio"
                    value={index}
                    onChange={(e) => setSelectAddress(e.target.value)}
                    name="address"
                    className="mt-1"
                  />
                  <div className="text-gray-700 leading-5">
                    <p className="font-medium">{address.address_line}</p>
                    <p>{address.city}</p>
                    <p>{address.state}</p>
                    <p>{address.country} - {address.pincode}</p>
                    <p className="font-semibold mt-1">{address.mobile}</p>
                  </div>
                </div>
              </label>
            ))}

            <div
              onClick={() => setOpenAddress(true)}
              className="h-16 border-2 border-dashed bg-gray-100 rounded-xl flex justify-center items-center cursor-pointer hover:bg-gray-200 transition"
            >
              <span className="text-blue-600 font-medium">+ Add New Address</span>
            </div>
          </div>
        </div>


        {/* RIGHT - SUMMARY */}
        <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">

          <h3 className="text-xl font-semibold mb-3">Summary</h3>

          <div className="bg-gray-50 rounded-xl p-4 shadow-inner">

            <h3 className="font-semibold mb-3">Bill Details</h3>

            <div className="flex justify-between py-1 text-gray-700">
              <p>Items Total</p>
              <p className="flex gap-2">
                <span className="line-through text-gray-400">{DisplayPriceInRupees(notDiscountTotalPrice)}</span>
                <span className="font-semibold">{DisplayPriceInRupees(totalPrice)}</span>
              </p>
            </div>

            <div className="flex justify-between py-1 text-gray-700">
              <p>Quantity Total</p>
              <p>{totalQty} item</p>
            </div>

            <div className="flex justify-between py-1 text-gray-700">
              <p>Delivery Charge</p>
              <p className="text-green-600 font-medium">Free</p>
            </div>

            <div className="flex justify-between mt-3 pt-3 border-t font-semibold text-lg">
              <p>Grand Total</p>
              <p>{DisplayPriceInRupees(totalPrice)}</p>
            </div>
          </div>


          <div className="w-full flex flex-col gap-4 mt-6">

            <button
              className="py-3 rounded-lg text-white font-semibold bg-green-600 hover:bg-green-700 transition-all shadow"
              onClick={handleOnlinePayment}
            >
              Online Payment
            </button>

            <button
              className="py-3 rounded-lg border-2 border-green-600 font-semibold text-green-700 hover:bg-green-600 hover:text-white transition-all"
              onClick={handleCashOnDelivery}
            >
              Cash on Delivery
            </button>
          </div>

        </div>
      </div>


      {/* ADD ADDRESS POPUP */}
      {openAddress && (
        <AddAddress close={() => setOpenAddress(false)} />
      )}

    </section>
  )
}

export default CheckoutPage
