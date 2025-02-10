// import React from 'react'
// import productData from './data.json'
import Cart from './Card';
import { useEffect, useState } from 'react';
import axios from "axios";
import Navbar from './Navbar';

const Home = () => {
  let [productData, setProductData]=useState([])

  useEffect(()=>{
    fetch("http://localhost:8084/product").then((res)=>{
      return res.json();
    }).then((res)=>{
      console.log(res)
      setProductData(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[])

  const handleDelete = async (id) => {
    try {
      let response = await axios.delete(
        `http://localhost:8084/product/delete/${id}`
      );
      console.log(response.data.message);
      const filtered_data = productData.filter((e) => e._id != id);
      setProductData(filtered_data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="container ml-20 mx-auto mt-8 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {productData.map((product, index) => (
          <Cart key={index} product={product} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default Home
