import React, { useEffect, useState } from 'react'
import CardLoading from '../components/CardLoading'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import CardProduct from '../components/CardProduct'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation } from 'react-router-dom'
import noDataImage from '../assets/nothing here yet.webp'

const SearchPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingArrayCard = new Array(10).fill(null)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const params = useLocation()
  const searchText = params?.search?.slice(3)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchText,
          page: page,
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        if (responseData.page === 1) {
          setData(responseData.data)
        } else {
          setData(prev => [...prev, ...responseData.data])
        }
        setTotalPage(responseData.totalPage)
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page, searchText])

  const handleFetchMore = () => {
    if (totalPage > page) {
      setPage(prev => prev + 1)
    }
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">

        {/* Title */}
        <div className="bg-white shadow-sm p-4 rounded-xl mb-4 border">
          <p className="text-lg font-semibold text-gray-700">
            Search Results: <span className="text-blue-600">{data.length}</span>
          </p>
          <p className="text-sm text-gray-500">Showing results for: <span className="font-medium text-gray-700">"{searchText}"</span></p>
        </div>

        {/* Infinite scroll */}
        <InfiniteScroll
          dataLength={data.length}
          hasMore={page < totalPage}
          next={handleFetchMore}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

            {/* Product Cards */}
            {data.map((p, index) => (
              <CardProduct data={p} key={p?._id + "search" + index} />
            ))}

            {/* Loading Skeleton */}
            {loading && loadingArrayCard.map((_, index) => (
              <CardLoading key={"loading" + index} />
            ))}

          </div>
        </InfiniteScroll>

        {/* No Data Section */}
        {
          !data[0] && !loading && (
            <div className="flex flex-col justify-center items-center mt-10 opacity-80">
              <img
                src={noDataImage}
                className="w-60 h-60 object-contain mb-3"
              />
              <p className="text-gray-700 font-semibold text-lg">No products found</p>
              <p className="text-gray-500 text-sm">Try searching with different keywords</p>
            </div>
          )
        }

      </div>
    </section>
  )
}

export default SearchPage
