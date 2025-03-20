/* eslint-disable react/prop-types */
// import React from 'react'

import { Link, useNavigate } from "react-router-dom";


const Card = ({ product, handleDelete }) => {
      const isFullURL = product.productImage[0]?.startsWith("http");
      const imgPath = isFullURL
        ? product.productImage[0]
        : `http://localhost:8084/uploads/${product.productImage[0]}`;
    const navigate=useNavigate();
    
    const handleClick=()=>{
        const token = localStorage.getItem("Token");
        if(token==null){
          alert('login first')
          navigate('/login')
          return 
        }
        navigate(`/edit-product/${product._id}`)
    }

return (
  <div className="cart bg-[#E8C2CA] p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
    <Link to={`/product/${product._id}`}>
      <img
        src={imgPath}
        alt={product.productName}
        className="w-full h-72 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold text-[#735D78] mb-2">
        {product.productName}
      </h3>
      <h4 className="text-lg font-bold text-[#735D78]">
        ₹ {product.productPrice}
      </h4>
    </Link>
    <button
      onClick={handleClick}
      className="bg-[#B392AC] hover:bg-[#735D78] text-white font-bold py-2 px-4 rounded-lg m-1 transition"
    >
      Edit
    </button>

    <button
      onClick={() => handleDelete(product._id)}
      className="bg-[#D1B3C4] hover:bg-[#B392AC] text-white font-bold py-2 px-4 rounded-lg m-1 transition"
    >
      Delete
    </button>
  </div>
);

};

export default Card;
