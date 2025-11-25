import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'

const Product = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)

  const fetchProductData = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: { page }
      })

      const { data: responseData } = response

      if (responseData.success) {
        setProductData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [])

  return (
    <section className="w-full px-4 py-6 container mx-auto">
      
      {/* HEADER */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Products
        </h1>
        <p className="text-gray-500 mt-1">
          Explore our latest products
        </p>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productData?.map((product, index) => (
          <div
            key={product._id + index}
            className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition-all duration-300 cursor-pointer group"
          >
            {/* IMAGE */}
            <div className="w-full h-56 overflow-hidden rounded-t-2xl">
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* INFO */}
            <div className="p-4">
              <h2 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-1">
                {product.name}
              </h2>

              {/* PRICE */}
              <p className="text-green-700 font-bold text-xl mb-2">
                ₹{product.price}
              </p>

              {/* DESCRIPTION */}
              <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                {product.description}
              </p>

              {/* BUTTON */}
              <button className="w-full bg-green-700 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-all duration-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION — optional if backend supports */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition disabled:opacity-40"
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
        >
          Previous
        </button>

        <button
          className="px-4 py-2 rounded-lg bg-green-700 hover:bg-green-600 text-white transition"
          onClick={() => setPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>
    </section>
  )
}

export default Product
