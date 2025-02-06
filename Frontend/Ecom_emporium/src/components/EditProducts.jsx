// import React from 'react'

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditProducts = () => {
    const {id}=useParams();
    const [product, setProduct]=useState([])
    useEffect(()=>{
        fetch(`http://localhost:8084/product/${id}`).then((res)=>{
            return res.json()
        }).then((res)=>{
            console.log(res)
            setProduct(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[id])

  return (
    <div className="max-w-lg mt-24 mx-auto p-6 bg-blue-200 shadow-lg rounded-lg">
      <form action="" className="space-y-4" >
        <label htmlFor="" className="block text-sm font-medium text-gray-800">
          Product Name
        </label>
        <input
          type="text"
          placeholder="Enter Product Name"
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          value={product.productName}
        />
        <label
          htmlFor=""
          className="block text-sm font-medium text-gray-800 rounded"
        >
          Product Descrition
        </label>
        <input
          type="text"
          placeholder="Enter Product Description"
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          value={product.productDescription}
        />
        <label htmlFor="" className="block text-sm font-medium text-gray-800">
          Product Price
        </label>
        <input
          type="text"
          placeholder="Enter Product Price"
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          value={product.productPrice}
        />
        <label htmlFor="" className="block text-sm font-medium text-gray-800">
          Product Images
        </label>
        <input
          type="file"
          placeholder="Add Product Images"
          multiple
          className="mt-1 block w-full p-2 border border-gray-400 rounded"
        />
        <input
          type="submit"
          value="Edit product"
          className="ml-40 bg-blue-600 text-white py-2 px-4 rounded-lg"
        />
      </form>
    </div>
  );
}

export default EditProducts
