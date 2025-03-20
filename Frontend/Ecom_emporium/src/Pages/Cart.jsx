import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      let token=localStorage.getItem("Token");
      console.log(token,)
      if (token == null) {
        alert("Login first");
        navigate("/login");
      }
      const res = await axios.get("http://localhost:8084/cart/products", {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(res,"Hj")
      console.log(res.data);
      setCartItems(res.data.cart);
      if(res.message=="Login Pls"){
        alert("Login first")
        navigate('/login')
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleIncrease = async (cartItemId) => {
    try {
      await axios.put(
        `http://localhost:8084/cart/increase/${cartItemId}`,
        {},
        {
          headers: { authorization: `Bearer ${localStorage.getItem("Token")}` },
        }
      );
      await fetchCartItems();
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const handleDecrease = async (cartItemId) => {
    try {
      await axios.put(
        `http://localhost:8084/cart/decrease/${cartItemId}`,
        {},
        {
          headers: { authorization: `Bearer ${localStorage.getItem("Token")}` },
        }
      );
      await fetchCartItems(); 
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const handleOrder = () => {
    navigate("/addresses");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 p-6 bg-[#F7D1CD] rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-[#735D78] mb-6">
          Shopping Cart
        </h2>
        {cartItems?.length === 0 ? (
          <p className="text-lg text-gray-700">Your cart is empty.</p>
        ) : (
          cartItems?.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4"
            >
              <img
                src={item?.product?.productImage[0]}
                alt={item?.product?.productName}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div>
                <h3 className="text-xl font-semibold text-[#735D78]">
                  {item?.product?.productName}
                </h3>
                <p className="text-gray-600">₹{item?.product?.productPrice}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleDecrease(item._id)}
                  className="bg-[#D1B3C4] hover:bg-[#B392AC] px-3 py-1 rounded-l-lg transition"
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => handleIncrease(item._id)}
                  className="bg-[#D1B3C4] hover:bg-[#B392AC] px-3 py-1 rounded-r-lg transition"
                >
                  +
                </button>
              </div>
              <p className="text-lg font-bold text-[#735D78]">
                ₹{item?.totalPrice}
              </p>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <button
          onClick={handleOrder}
          className="fixed bottom-10 right-10 bg-[#735D78] hover:bg-[#B392AC] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
        >
          Place Order
        </button>
      )}
    </>
  );
};

export default Cart;
