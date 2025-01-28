/* eslint-disable react/prop-types */
// import React from 'react'

const Cart = ({ product }) => {
return (
    <div className="cart bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
        <img src={product.imageUrl} alt={product.name} className="w-full h-72 object-cover rounded-md mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
        <h4 className="text-lg font-bold text-green-600">${product.price}</h4>
    </div>
);

};

export default Cart;
