import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'

const CategoryWiseProductDisplay = ({ id, name }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const containerRef = useRef()
    const subCategoryData = useSelector(state => state.product.allSubCategory)
    const loadingCardNumber = new Array(6).fill(null)

    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProductByCategory,
                data: { id }
            })
            const { data: responseData } = response
            if (responseData.success) setData(responseData.data)
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchCategoryWiseProduct() }, [])

    const handleScrollRight = () => { containerRef.current.scrollLeft += 240 }
    const handleScrollLeft = () => { containerRef.current.scrollLeft -= 240 }

    const handleRedirectProductListpage = () => {
        const subcategory = subCategoryData.find(sub => 
            sub.category.some(c => c._id == id)
        )
        return `/${valideURLConvert(name)}-${id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}`
    }

    const redirectURL = handleRedirectProductListpage()

    return (
        <div className='mb-8'>
            {/* Header */}
            <div className='container mx-auto px-4 flex items-center justify-between gap-4 mb-4'>
                <h3 className='font-semibold text-lg md:text-xl text-gray-800'>{name}</h3>
                <Link to={redirectURL} className='text-green-600 font-medium hover:text-green-500 transition-colors'>
                    See All
                </Link>
            </div>

            {/* Product Carousel */}
            <div className='relative flex items-center'>
                <div 
                    className='flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth snap-x snap-mandatory'
                    ref={containerRef}
                >
                    {/* Loading placeholders */}
                    {loading && loadingCardNumber.map((_, index) => (
                        <CardLoading key={"loading-" + index} />
                    ))}

                    {/* Product cards */}
                    {data.map((p, index) => (
                        <div key={p._id + "-" + index} className='snap-start'>
                            <CardProduct data={p} />
                        </div>
                    ))}
                </div>

                {/* Scroll buttons */}
                <div className='w-full left-0 right-0 container mx-auto px-2 absolute hidden lg:flex justify-between items-center pointer-events-none'>
                    <button 
                        onClick={handleScrollLeft} 
                        className='pointer-events-auto bg-white hover:bg-gray-100 shadow-lg p-2 rounded-full transition-transform duration-300 hover:scale-110'
                    >
                        <FaAngleLeft className='text-lg text-gray-700'/>
                    </button>
                    <button 
                        onClick={handleScrollRight} 
                        className='pointer-events-auto bg-white hover:bg-gray-100 shadow-lg p-2 rounded-full transition-transform duration-300 hover:scale-110'
                    >
                        <FaAngleRight className='text-lg text-gray-700'/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategoryWiseProductDisplay
