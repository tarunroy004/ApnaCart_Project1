import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import Loading from '../components/Loading'
import ProductCardAdmin from '../components/ProductCardAdmin'
import { IoSearchOutline } from "react-icons/io5";

const ProductAdmin = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [search, setSearch] = useState("")

  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page,
          limit: 12,
          search
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage)
        setProductData(responseData.data)
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [page])

  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (page > 1) {
      setPage(prev => prev - 1)
    }
  }

  const handleOnChange = (e) => {
    const { value } = e.target
    setSearch(value)
    setPage(1)
  }

  useEffect(() => {
    let flag = true

    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData()
        flag = false
      }
    }, 300)

    return () => clearTimeout(interval)
  }, [search])

  return (
    <section className="bg-gray-50 min-h-screen">

      {/* -------- Header -------- */}
      <div className="p-4 bg-white shadow-md border-b flex items-center justify-between sticky top-0 z-20">
        <h2 className="font-bold text-2xl text-gray-700 tracking-wide">
          Product Management
        </h2>

        {/* Search Box */}
        <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl border border-gray-200 shadow-sm 
                        focus-within:ring-2 focus-within:ring-blue-300 transition-all duration-200">
          <IoSearchOutline size={22} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none text-sm w-full"
            value={search}
            onChange={handleOnChange}
          />
        </div>
      </div>

      {/* -------- Loader -------- */}
      {loading && <Loading />}

      {/* -------- Content Area -------- */}
      <div className="p-6">

        <div className="min-h-[60vh]">

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6">
            {productData.map((p, index) => (
              <ProductCardAdmin
                key={p._id + index}
                data={p}
                fetchProductData={fetchProductData}
              />
            ))}
          </div>
        </div>

        {/* -------- Pagination -------- */}
        <div className="flex items-center justify-between mt-10">

          <button
            onClick={handlePrevious}
            className="px-6 py-2 rounded-lg border border-gray-300 bg-white shadow-sm 
                       hover:bg-gray-100 transition-all text-sm font-medium"
          >
            Previous
          </button>

          <div className="px-6 py-2 bg-white rounded-lg shadow border text-sm font-semibold tracking-wide">
            {page} / {totalPageCount}
          </div>

          <button
            onClick={handleNext}
            className="px-6 py-2 rounded-lg border border-gray-300 bg-white shadow-sm 
                       hover:bg-gray-100 transition-all text-sm font-medium"
          >
            Next
          </button>

        </div>

      </div>

    </section>
  )
}

export default ProductAdmin
