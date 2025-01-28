// import React from 'react'
import productData from './data.json'
import Cart from './Cart';

const Home = () => {
  return (
  <div>
    <nav className="flex justify-end p-8 bg-blue-400 text-white">
      <button className="px-6 py-2 mx-2 text-lg font-semibold bg-blue-800 rounded-lg hover:bg-blue-700">
        Login
      </button>
      <button className="px-6 py-2 mx-2 text-lg font-semibold bg-green-700 rounded-lg hover:bg-green-600">
        Sign Up
      </button>
    </nav>

    <div className="container ml-20 mx-auto mt-8 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {productData.map((product, index) => (
        <Cart key={index} product={product} />
      ))}
    </div>
  </div>
);
}

export default Home
