import { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  console.log(localStorage.getItem("Token"),"hh");
  const fetchCartItems =  () => {
    
      // const config = {
      //   headers: {
      //     "Authorization":`Bearer ${localStorage.getItem("Token")}`,
      //     "Content-Type": "application/json",
      //   },
      // };
      // const response = await axios.get(`http://localhost:8084/product/cart`, config)
      fetch("http://localhost:8084/product/cart",{
        method:"GET",
        headers:{authorization:`Bearer ${localStorage.getItem("Token")}`,
          "Content-Type": "application/json"}
      }).then((res)=>res.json())
      .then((res)=>{
        console.log(res);
        setCartItems(res.cart)
      }).catch((err)=>{
        console.log(err)
      });

    }
    
  
  useEffect(() => {
    fetchCartItems();
  }, []);
  
  const handleIncrease = async (cartItemId) => {
    try {
      await axios.put(`http://localhost:8084/product/cart/increase/${cartItemId}`);
      fetchCartItems(); 
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };
  const handleDecrease = async (cartItemId) => {
    try {
      await axios.put(`http://localhost:8084/product/cart/decrease/${cartItemId}`);
      fetchCartItems();
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };
  return (
    <>
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems?.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4"
          >
            <img
              src={item.product.productImage[0]}
              alt={item.product.productName}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div>
              <h3 className="text-xl font-semibold">
                {item.product.productName}
              </h3>
              <p className="text-gray-600">${item.product.productPrice}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleDecrease(item._id)}
                className="bg-gray-300 px-3 py-1 rounded-l-lg"
              >
                -
              </button>
              <span className="px-4">{item.quantity}</span>
              <button
                onClick={() => handleIncrease(item._id)}
                className="bg-gray-300 px-3 py-1 rounded-r-lg"
              >
                +
              </button>
            </div>
            <p className="text-lg font-bold">${item.totalPrice}</p>
            </div>
        ))
      )}
    </div>
    </>
  );
};

export default Cart;
