import { useState, useEffect } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchOrders() {
    try {
      const response = await fetch("http://localhost:8084/orders",{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem("Token")}`
        }
      });
      if (!response.ok) {
        throw new Error("Could not fetch orders");
      }
      const data = await response.json();
      console.log(data);
      setOrders(data);
      setLoading(false);
    }catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchOrders();
  }, []); 

  const handleCancelOrder = (id) => {
    fetch(`http://localhost:8084/orders/update/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ cancelled: true }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setOrders(orders.filter((e) => e._id != res._id));
        fetchOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order._id}
              className="border p-4 rounded-lg flex items-center bg-white shadow-sm"
            >
              <div className="flex-grow">
                <p className="text-lg font-medium">{order.product.productName}</p>
                <p className="text-gray-700">Quantity: {order.quantity}</p>
                <p className="text-gray-500 text-sm">
                  Address:{" "}
                  {order.address
                    ? `${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.zip}`
                    : "No address provided"}
                </p>
              </div>
              <img
                src={order.product.productImage}
                alt={order.product.productName}
                className="w-20 h-20 object-cover ml-4 rounded-md"
              />
              {!order.cancelled ? (
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Cancel Order
                </button>
              ) : (
                <span className="ml-4 text-gray-400">Cancelled</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Orders;
