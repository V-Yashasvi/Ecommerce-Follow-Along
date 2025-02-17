/* eslint-disable react/prop-types */
// import React from 'react'

import { Link, useNavigate } from "react-router-dom";


const Card = ({ product, handleDelete }) => {
    let imgPath=`././././Backend/uploads/${product.productImage}`

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
                {product.productPrice}
            </h4>
            <button onClick={handleClick}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
        </Link>
    </div>
);

};

export default Card;
