/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import Navbar from "../components/Navbar";

const ProductForm = () => {
  const navigate=useNavigate()
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState([]);

  const handleNameChange = (e) => {
    let name = e.target.value;
    setProductName(name);
  };
  const handleDescriptionChange = (e) => {
    let description = e.target.value;
    setProductDescription(description);
  };
  const handlePriceChange = (e) => {
    let price = e.target.value;
    setProductPrice(price);
  };
  const handleImageChange = (e) => {
    let image = e.target.files;
    let filesArray=Array.from(image)
    setProductImage([...productImage,...filesArray]);
    console.log(image)
  };
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("productPrice", productPrice);
    productImage.forEach((image) => {
      formData.append(`productImage`, image);
    });

    try {
      const token = localStorage.getItem("Token");
      if (token == null) {
        alert("login first");
        navigate("/login");
        return 
      }
      const result = await fetch(
        "https://ecommerce-follow-along-mz95.onrender.com/product/create",
        {
          method: "POST",
          body: formData,
          "Content-Type": "application/json",
        }
      );
      if (result.message == "Login Pls") {
        alert("Login first");
        navigate("/login");
      }
      console.log("Product added successfully:", result);
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setProductImage([]);
      navigate('/')
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  return (
   <>
      <Navbar />
      <div className="max-w-lg mt-24 mx-auto p-6 bg-[#E8C2CA] shadow-lg rounded-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-[#735D78]">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Enter Product Name"
            className="mt-1 block w-full p-2 border border-[#B392AC] rounded"
            value={productName}
            onChange={handleNameChange}
          />

          <label className="block text-sm font-medium text-[#735D78]">
            Product Description
          </label>
          <input
            type="text"
            placeholder="Enter Product Description"
            className="mt-1 block w-full p-2 border border-[#B392AC] rounded"
            value={productDescription}
            onChange={handleDescriptionChange}
          />

          <label className="block text-sm font-medium text-[#735D78]">
            Product Price
          </label>
          <input
            type="text"
            placeholder="Enter Product Price"
            className="mt-1 block w-full p-2 border border-[#B392AC] rounded"
            value={productPrice}
            onChange={handlePriceChange}
          />

          <label className="block text-sm font-medium text-[#735D78]">
            Product Images
          </label>
          <input
            type="file"
            multiple
            className="mt-1 block w-full p-2 border border-[#B392AC] rounded"
            onChange={handleImageChange}
          />

          <input
            type="submit"
            value="Add Product"
            className="w-full bg-[#735D78] hover:bg-[#B392AC] text-white font-bold py-2 px-4 rounded-lg transition"
          />
        </form>
      </div>
    </>

  );
};

export default ProductForm;
