import React, { useEffect, useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import DisplayTable from '../components/DisplayTable'
import { createColumnHelper } from '@tanstack/react-table'
import ViewImage from '../components/ViewImage'
import { HiPencil } from 'react-icons/hi'
import { MdDelete } from 'react-icons/md'
import EditSubCategory from '../components/EditSubCategory'
import CofirmBox from '../components/CofirmBox'
import toast from 'react-hot-toast'

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const columnHelper = createColumnHelper()
  const [ImageURL, setImageURL] = useState("")
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({ _id: "" })
  const [deleteSubCategory, setDeleteSubCategory] = useState({ _id: "" })
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false)

  const fetchSubCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({ ...SummaryApi.getSubCategory })
      const { data: responseData } = response

      if (responseData.success) setData(responseData.data)
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubCategory()
  }, [])

  const column = [
    columnHelper.accessor('name', {
      header: "Name",
      cell: ({ row }) => (
        <p className="font-medium text-gray-700">{row.original.name}</p>
      )
    }),
    columnHelper.accessor('image', {
      header: "Image",
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <img
            src={row.original.image}
            alt={row.original.name}
            className="w-10 h-10 rounded-md shadow cursor-pointer hover:scale-105 transition"
            onClick={() => setImageURL(row.original.image)}
          />
        </div>
      )
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-2">
          {row.original.category.map((c) => (
            <span
              key={c._id}
              className="px-2 py-1 text-xs bg-gray-100 rounded-md shadow-sm text-gray-700"
            >
              {c.name}
            </span>
          ))}
        </div>
      )
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => {
              setOpenEdit(true)
              setEditData(row.original)
            }}
            className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
          >
            <HiPencil size={18} />
          </button>

          <button
            onClick={() => {
              setOpenDeleteConfirmBox(true)
              setDeleteSubCategory(row.original)
            }}
            className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
          >
            <MdDelete size={18} />
          </button>
        </div>
      )
    })
  ]

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCategory
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        fetchSubCategory()
        setOpenDeleteConfirmBox(false)
        setDeleteSubCategory({ _id: "" })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className="min-h-screen bg-gray-50 p-4">
      <div className="p-4 bg-white shadow-md rounded-xl flex items-center justify-between border border-gray-100">
        <h2 className="font-bold text-lg text-gray-700">Sub Category</h2>

        <button
          onClick={() => setOpenAddSubCategory(true)}
          className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Add Sub Category
        </button>
      </div>

      <div className="overflow-auto w-full mt-4 bg-white p-4 rounded-xl shadow border border-gray-100">
        <DisplayTable data={data} column={column} />
      </div>

      {openAddSubCategory && (
        <UploadSubCategoryModel
          close={() => setOpenAddSubCategory(false)}
          fetchData={fetchSubCategory}
        />
      )}

      {ImageURL && (
        <ViewImage url={ImageURL} close={() => setImageURL("")} />
      )}

      {openEdit && (
        <EditSubCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchSubCategory}
        />
      )}

      {openDeleteConfirmBox && (
        <CofirmBox
          cancel={() => setOpenDeleteConfirmBox(false)}
          close={() => setOpenDeleteConfirmBox(false)}
          confirm={handleDeleteSubCategory}
        />
      )}
    </section>
  )
}

export default SubCategoryPage;