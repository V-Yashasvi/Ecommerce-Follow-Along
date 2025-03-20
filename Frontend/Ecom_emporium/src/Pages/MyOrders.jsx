import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate()

  async function fetchOrders() {
    try {
      const token=localStorage.getItem("Token")
      if(token==null){
        alert("Login first");
        navigate("/login");
      }
      const response = await fetch(
        "https://ecommerce-follow-along-mz95.onrender.com/orders",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.message == "Login Pls") {
        alert("Login first");
        navigate("/login");
      }
      if (!response.ok) {
        throw new Error("Could not fetch orders");
      }
      const data = await response.json();
      console.log(data);
      setOrders(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = (id) => {
    fetch(
      `https://ecommerce-follow-along-mz95.onrender.com/orders/update/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ cancelled: true }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setOrders(orders.filter((e) => e._id !== res._id));
        fetchOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7D1CD] text-[#735D78] text-xl">
        <p className="font-semibold">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7D1CD] text-red-600 text-xl">
        <p className="font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="w-full px-4 sm:px-8 py-8 bg-[#F7D1CD]">
        <h2 className="text-4xl font-bold text-[#735D78] mb-8 text-center">
          Your Orders
        </h2>
        {orders.length === 0 ? (
          <p className="text-gray-700 text-center text-xl">
            No orders found. Start shopping now!
          </p>
        ) : (
          <ul className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <li
                key={order._id}
                className="border p-6 rounded-2xl flex flex-col bg-[#E8C2CA] shadow-md transition transform hover:scale-105"
              >
                <div className="flex-grow">
                  <p className="text-xl font-semibold text-[#735D78]">
                    {order?.product?.productName}
                  </p>
                  <p className="text-gray-800 text-lg">
                    Quantity: {order.quantity}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Address:{" "}
                    {order.address
                      ? `${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.zip}`
                      : "No address provided"}
                  </p>
                </div>
                {!order.cancelled ? (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="mt-4 bg-[#B392AC] hover:bg-[#735D78] text-white px-6 py-3 rounded-xl transition text-lg font-medium shadow-md"
                  >
                    Cancel Order
                  </button>
                ) : (
                  <span className="mt-4 text-[#735D78] font-medium text-lg">
                    Cancelled
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Orders;
