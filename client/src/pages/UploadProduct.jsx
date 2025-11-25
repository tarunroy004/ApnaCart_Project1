import React, { useState, useEffect } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux'
import { IoClose } from "react-icons/io5";
import AddFieldComponent from '../components/AddFieldComponent';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import successAlert from '../utils/SuccessAlert';

const UploadProduct = () => {

  const [data,setData] = useState({
    name : "",
    image : [],
    category : [],
    subCategory : [],
    unit : "",
    stock : "",
    price : "",
    discount : "",
    description : "",
    more_details : {},
  })

  const [imageLoading,setImageLoading] = useState(false)
  const [ViewImageURL,setViewImageURL] = useState("")
  const allCategory = useSelector(state => state.product.allCategory)
  const allSubCategory = useSelector(state => state.product.allSubCategory)

  const [selectCategory,setSelectCategory] = useState("")
  const [selectSubCategory,setSelectSubCategory] = useState("")

  const [openAddField,setOpenAddField] = useState(false)
  const [fieldName,setFieldName] = useState("")

  const handleChange = (e)=>{
    const { name, value} = e.target 
    setData(prev=>({ ...prev, [name]: value }))
  }

  const handleUploadImage = async(e)=>{
    const file = e.target.files[0]
    if(!file) return
    setImageLoading(true)
    const response = await uploadImage(file)
    const { data : ImageResponse } = response
    const imageUrl = ImageResponse.data.url 

    setData(prev=>({
      ...prev,
      image : [...prev.image,imageUrl]
    }))
    setImageLoading(false)
  }

  const handleDeleteImage = (index)=>{
      data.image.splice(index,1)
      setData(prev=>({...prev}))
  }

  const handleRemoveCategory = (index)=>{
    data.category.splice(index,1)
    setData(prev=>({...prev}))
  }

  const handleRemoveSubCategory = (index)=>{
    data.subCategory.splice(index,1)
    setData(prev=>({...prev}))
  }

  const handleAddField = ()=>{
    setData(prev=>({
      ...prev,
      more_details : {
        ...prev.more_details,
        [fieldName] : ""
      }
    }))
    setFieldName("")
    setOpenAddField(false)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data : data
      })
      const { data : responseData} = response

      if(responseData.success){
        successAlert(responseData.message)
        setData({
          name : "",
          image : [],
          category : [],
          subCategory : [],
          unit : "",
          stock : "",
          price : "",
          discount : "",
          description : "",
          more_details : {},
        })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className="min-h-screen bg-gray-50 py-6 px-4">
      
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Upload Product
        </h2>
        <p className="text-gray-500">Add a new item to your shop catalog</p>
      </div>

      {/* Card Container */}
      <div className="bg-white shadow-sm rounded-xl p-6 max-w-3xl mx-auto border border-gray-100">
        
        <form className="grid gap-6" onSubmit={handleSubmit}>

          {/* Name */}
          <div className="grid gap-1">
            <label className="font-medium text-gray-700">Product Name</label>
            <input 
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              placeholder="Premium Leather Wallet"
              className="bg-gray-50 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Description */}
          <div className="grid gap-1">
            <label className="font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              rows={3}
              placeholder="Write short product details..."
              className="bg-gray-50 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            />
          </div>

          {/* Image Upload */}
          <div className="grid gap-2">
            <label className="font-medium text-gray-700">Images</label>

            <label className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg h-28 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
              {imageLoading ? (
                <Loading />
              ) : (
                <>
                  <FaCloudUploadAlt size={36} className="text-gray-500" />
                  <p className="text-gray-500 text-sm mt-1">Upload Images</p>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleUploadImage} />
            </label>

            {/* Display Images */}
            <div className="flex flex-wrap gap-4">
              {data.image.map((img,index)=>(
                <div key={img+index} className="h-24 w-24 bg-gray-100 rounded-lg border relative group overflow-hidden">
                  <img
                    src={img}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={()=>setViewImageURL(img)}
                  />
                  <button
                    onClick={()=>handleDeleteImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded hidden group-hover:block"
                  >
                    <MdDelete size={18}/>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="grid gap-1">
            <label className="font-medium text-gray-700">Category</label>
            <select
              value={selectCategory}
              onChange={(e)=>{
                const value = e.target.value 
                const category = allCategory.find(el => el._id === value )
                setData(prev=>({...prev, category: [...prev.category, category]}))
                setSelectCategory("")
              }}
              className="bg-gray-50 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select Category</option>
              {allCategory.map(c=>(
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>

            <div className="flex flex-wrap gap-2 mt-2">
              {data.category.map((c,index)=>(
                <div key={c._id} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2 text-sm">
                  {c.name}
                  <IoClose onClick={()=>handleRemoveCategory(index)} className="cursor-pointer hover:text-red-600" />
                </div>
              ))}
            </div>
          </div>

          {/* Subcategory */}
          <div className="grid gap-1">
            <label className="font-medium text-gray-700">Subcategory</label>
            <select
              value={selectSubCategory}
              onChange={(e)=>{
                const value = e.target.value 
                const subCategory = allSubCategory.find(el => el._id === value )
                setData(prev=>({...prev, subCategory: [...prev.subCategory, subCategory]}))
                setSelectSubCategory("")
              }}
              className="bg-gray-50 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select Subcategory</option>
              {allSubCategory.map(c=>(
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>

            <div className="flex flex-wrap gap-2 mt-2">
              {data.subCategory.map((c,index)=>(
                <div key={c._id} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2 text-sm">
                  {c.name}
                  <IoClose onClick={()=>handleRemoveSubCategory(index)} className="cursor-pointer hover:text-red-600" />
                </div>
              ))}
            </div>
          </div>

          {/* Grid Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <label className="font-medium text-gray-700">Unit</label>
              <input 
                name="unit"
                value={data.unit}
                onChange={handleChange}
                placeholder="kg / piece"
                className="bg-gray-50 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="grid gap-1">
              <label className="font-medium text-gray-700">Stock</label>
              <input 
                type="number"
                name="stock"
                value={data.stock}
                onChange={handleChange}
                placeholder="10"
                className="bg-gray-50 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="grid gap-1">
              <label className="font-medium text-gray-700">Price</label>
              <input 
                type="number"
                name="price"
                value={data.price}
                onChange={handleChange}
                placeholder="399"
                className="bg-gray-50 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="grid gap-1">
              <label className="font-medium text-gray-700">Discount (%)</label>
              <input 
                type="number"
                name="discount"
                value={data.discount}
                onChange={handleChange}
                placeholder="10"
                className="bg-gray-50 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          {/* Dynamic Extra Fields */}
          {Object.keys(data.more_details).map((k,index)=>(
            <div key={k} className="grid gap-1">
              <label className="font-medium text-gray-700">{k}</label>
              <input 
                type="text"
                value={data.more_details[k]}
                onChange={(e)=>{
                  const value = e.target.value 
                  setData(prev=>({
                    ...prev,
                    more_details : {
                      ...prev.more_details,
                      [k] : value
                    }
                  }))
                }}
                className="bg-gray-50 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          ))}

          {/* Add New Field Button */}
          <button 
            type="button"
            onClick={()=>setOpenAddField(true)}
            className="border border-blue-300 text-blue-600 hover:bg-blue-50 transition px-4 py-2 rounded-lg w-40"
          >
            + Add Field
          </button>

          {/* Submit */}
          <button className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Submit
          </button>

        </form>
      </div>

      {ViewImageURL && (
        <ViewImage url={ViewImageURL} close={()=>setViewImageURL("")}/>
      )}

      {openAddField && (
        <AddFieldComponent 
          value={fieldName}
          onChange={(e)=>setFieldName(e.target.value)}
          submit={handleAddField}
          close={()=>setOpenAddField(false)} 
        />
      )}

    </section>
  )
}

export default UploadProduct
