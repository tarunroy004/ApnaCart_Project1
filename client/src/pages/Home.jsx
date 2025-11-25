// Updated Home.jsx with improved Tailwind design (UI only, no logic changes)
import React from 'react'
import banner from '../assets/banner.webp'
import bannerMobile from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import { Link, useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find(sub => {
      const filterData = sub.category.some(c => c._id == id)
      return filterData ? true : null
    })

    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`
    navigate(url)
  }

  return (
    <section className="bg-gray-50 min-h-screen">

      {/* Banner Section */}
      <div className="container mx-auto px-4 py-4">
        <div className={`w-full h-full min-h-48 rounded-xl overflow-hidden shadow-md ${!banner && 'animate-pulse'} `}>
          <img src={banner} className="w-full h-full hidden lg:block object-cover" alt="banner" />
          <img src={bannerMobile} className="pt-4 w-full h-full lg:hidden object-cover" alt="banner" />
        </div>
      </div>

      {/* Category Grid */}
      <div className="container mx-auto px-4 my-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
        {
          loadingCategory ? (
            new Array(12).fill(null).map((_, index) => (
              <div
                key={index + 'loadingcategory'}
                className="bg-white rounded-xl p-4 min-h-36 shadow animate-pulse flex flex-col gap-3"
              >
                <div className="bg-gray-200 min-h-24 rounded-lg"></div>
                <div className="bg-gray-200 h-6 rounded-lg"></div>
              </div>
            ))
          ) : (
            categoryData.map(cat => (
              <div
                key={cat._id + 'displayCategory'}
                className="cursor-pointer bg-white hover:shadow-lg transition rounded-xl p-3 flex flex-col items-center border"
                onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
              >
                <img
                  src={cat.image}
                  className="w-20 h-20 object-contain mx-auto"
                  alt={cat.name}
                />
                <p className="mt-2 text-sm font-medium text-gray-700 text-center">{cat.name}</p>
              </div>
            ))
          )
        }
      </div>

      {/* Category-wise product section */}
      {
        categoryData?.map(c => (
          <CategoryWiseProductDisplay
            key={c?._id + 'CategorywiseProduct'}
            id={c?._id}
            name={c?.name}
          />
        ))
      }

    </section>
  )
}

export default Home
