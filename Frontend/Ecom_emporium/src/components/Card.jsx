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
    navigate(`/edit-product/${product._id}`)
}

return (
  <div className="cart bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
    <Link to={`/product/${product._id}`}>
      <img
        src={imgPath}
        alt={product.productName}
        className="w-full h-72 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {product.productName}
      </h3>
      <h4 className="text-lg font-bold text-green-600">
        ₹ {product.productPrice}
      </h4>
    </Link>
    <button
      onClick={handleClick}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded m-1"
    >
      Edit
    </button>

    <button
      onClick={() => handleDelete(product._id)}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded m-1"
    >
      Delete
    </button>
  </div>
);

};

export default Card;
