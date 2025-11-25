import React, { useEffect, useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import EditCategory from '../components/EditCategory'
import CofirmBox from '../components/CofirmBox'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'

const CategoryPage = () => {
    const [openUploadCategory, setOpenUploadCategory] = useState(false)
    const [loading, setLoading] = useState(false)
    const [categoryData, setCategoryData] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
    const [editData, setEditData] = useState({ name: "", image: "" })
    const [openConfimBoxDelete, setOpenConfirmBoxDelete] = useState(false)
    const [deleteCategory, setDeleteCategory] = useState({ _id: "" })

    const fetchCategory = async () => {
        try {
            setLoading(true)
            const response = await Axios({ ...SummaryApi.getCategory })
            const { data: responseData } = response

            if (responseData.success) {
                setCategoryData(responseData.data)
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    const handleDeleteCategory = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data: deleteCategory
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                fetchCategory()
                setOpenConfirmBoxDelete(false)
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className="min-h-screen bg-gray-50">

            {/* HEADER */}
            <div className="p-4 bg-white shadow-md flex items-center justify-between rounded-b-xl">
                <h2 className="font-semibold text-lg tracking-wide">Categories</h2>

                <button
                    onClick={() => setOpenUploadCategory(true)}
                    className="text-sm px-4 py-2 border border-primary-300 text-primary-700 rounded-lg 
                    hover:bg-primary-100 transition-all shadow-sm"
                >
                    + Add Category
                </button>
            </div>

            {/* NO DATA */}
            {!categoryData[0] && !loading && <NoData />}

            {/* CATEGORY GRID */}
            <div className="p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">

                {categoryData.map(category => (
                    <div
                        key={category._id}
                        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all 
                        flex flex-col overflow-hidden border border-gray-100"
                    >
                        <div className="w-full h-36 flex items-center justify-center bg-gray-50">
                            <img
                                alt={category.name}
                                src={category.image}
                                className="w-full h-full object-contain p-2 transition-all hover:scale-105"
                            />
                        </div>

                        <div className="p-3">
                            <p className="text-sm font-medium text-gray-700 text-center mb-3">{category.name}</p>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setOpenEdit(true)
                                        setEditData(category)
                                    }}
                                    className="flex-1 bg-green-100 text-green-700 font-semibold py-1 rounded-lg
                                    hover:bg-green-200 transition-all"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => {
                                        setOpenConfirmBoxDelete(true)
                                        setDeleteCategory(category)
                                    }}
                                    className="flex-1 bg-red-100 text-red-700 font-semibold py-1 rounded-lg
                                    hover:bg-red-200 transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/* LOADING */}
            {loading && <Loading />}

            {/* POPUPS */}
            {openUploadCategory && (
                <UploadCategoryModel
                    fetchData={fetchCategory}
                    close={() => setOpenUploadCategory(false)}
                />
            )}

            {openEdit && (
                <EditCategory
                    data={editData}
                    close={() => setOpenEdit(false)}
                    fetchData={fetchCategory}
                />
            )}

            {openConfimBoxDelete && (
                <CofirmBox
                    close={() => setOpenConfirmBoxDelete(false)}
                    cancel={() => setOpenConfirmBoxDelete(false)}
                    confirm={handleDeleteCategory}
                />
            )}
        </section>
    )
}

export default CategoryPage
