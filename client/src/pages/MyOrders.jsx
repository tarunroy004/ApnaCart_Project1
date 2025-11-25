import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)

  return (
    <div className="min-h-screen bg-blue-50 p-4">

      {/* Header */}
      <div className="bg-white shadow-md p-4 rounded-lg mb-5">
        <h1 className="text-xl font-semibold text-gray-800">My Orders</h1>
      </div>

      {/* No Orders */}
      {!orders[0] && <NoData />}

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order, index) => {
          // Format the order date/time
          const date = new Date(order.createdAt) // change 'createdAt' to your actual timestamp field if different
          const formattedDate = date.toLocaleString()

          return (
            <div
              key={order._id + index}
              className="bg-white shadow-sm hover:shadow-md transition border border-gray-100 
                rounded-xl p-4 flex flex-col gap-3"
            >

              {/* Order Number */}
              <p className="text-sm font-medium text-gray-600">
                Order No :
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                  {order?.orderId}
                </span>
              </p>

              {/* Order Time */}
              <p className="text-xs text-gray-500">
                Ordered on: <span className="font-medium">{formattedDate}</span>
              </p>

              {/* Product Info */}
              <div className="flex items-center gap-4">
                <img
                  src={order.product_details.image[0]}
                  className="w-16 h-16 rounded-lg object-cover border"
                  alt={order.product_details.name}
                />
                <div>
                  <p className="font-semibold text-gray-800 text-base">
                    {order.product_details.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Payment Status : <span className="font-semibold">{order.payment_status}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Total Price :  
                    <span className="font-semibold text-green-700 ml-1">
                      ₹{order.subTotalAmt}
                    </span>
                  </p>
                </div>
              </div>

            </div>
          )
        })}
      </div>

    </div>
  )
}

export default MyOrders
