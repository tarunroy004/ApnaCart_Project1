import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { Link, useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'

const ProductListPage = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const AllSubCategory = useSelector(state => state.product.allSubCategory)
  const [DisplaySubCatory, setDisplaySubCategory] = useState([])

  const subCategory = params?.subCategory?.split("-")
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ")

  const categoryId = params.category.split("-").slice(-1)[0]
  const subCategoryId = params.subCategory.split("-").slice(-1)[0]

  const fetchProductdata = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId,
          subCategoryId,
          page,
          limit: 8,
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data)
        } else {
          setData(prev => [...prev, ...responseData.data])
        }
        setTotalPage(responseData.totalCount)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductdata()
  }, [params])

  useEffect(() => {
    const sub = AllSubCategory.filter(s => {
      const filterData = s.category.some(el => el._id == categoryId)
      return filterData ? filterData : null
    })
    setDisplaySubCategory(sub)
  }, [params, AllSubCategory])

  return (
    <section className="sticky top-24 lg:top-20">

      <div className="container mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[260px,1fr]">

        {/* ------------------- LEFT SIDEBAR ------------------- */}
        <div className="min-h-[88vh] max-h-[88vh] overflow-y-scroll scrollbarCustom py-3
                        bg-white shadow-md rounded-r-2xl border border-gray-100">

          {DisplaySubCatory.map((s, index) => {
            const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`
            return (
              <Link
                key={index}
                to={link}
                className={`
                  w-full flex flex-col lg:flex-row items-center gap-2 p-3 border-b 
                  transition-all duration-200 cursor-pointer 
                  hover:bg-green-50 hover:shadow-sm
                  ${subCategoryId === s._id ? "bg-green-100 shadow-sm" : ""}
                `}
              >
                <div className="bg-white rounded-xl p-2 shadow-sm">
                  <img
                    src={s.image}
                    alt='subCategory'
                    className="w-12 h-12 object-contain lg:w-10 lg:h-10"
                  />
                </div>
                <p className="text-xs lg:text-sm text-center lg:text-left font-medium text-gray-700">
                  {s.name}
                </p>
              </Link>
            )
          })}
        </div>

        {/* ------------------- PRODUCT SECTION ------------------- */}
        <div className="sticky top-20">

          {/* Header */}
          <div className="bg-white shadow-md p-4 sticky top-20 z-10 rounded-bl-2xl border-b">
            <h3 className="text-lg font-semibold tracking-wide text-gray-700">
              {subCategoryName}
            </h3>
          </div>

          {/* Product List Container */}
          <div className="min-h-[80vh] max-h-[80vh] overflow-y-auto relative">

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                            gap-5 p-4">
              {data.map((p, index) => (
                <CardProduct
                  data={p}
                  key={p._id + "productSubCategory" + index}
                />
              ))}
            </div>
          </div>

          {/* Loading Spinner */}
          {loading && <Loading />}
        </div>
      </div>
    </section>
  )
}

export default ProductListPage
