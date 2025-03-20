import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PayPalCheckout = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const token = localStorage.getItem("Token");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartTotal();
  }, []);

  const fetchCartTotal = async () => {
    try {
      const res = await axios.get("http://localhost:8084/cart/products", {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const total = res.data.cart.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
      setTotalPrice(total);
    } catch (error) {
      console.error("Error fetching cart total:", error);
    }
  };

  const handleApprove = async (orderId) => {
    try {
      const orderData = {
        email,
        paypalOrderId: orderId, // Store PayPal order ID in backend
      };

      const response = await axios.post(
        "http://localhost:8084/orders/paypal",
        orderData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.data.success) {
        alert("Payment successful! Order placed.");
        navigate("/orders");
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error processing PayPal order:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
      <div className="container mx-auto mt-8 p-4">
        <h2 className="text-2xl font-bold mb-4">PayPal Checkout</h2>
        <h3 className="text-xl font-semibold">
          Total Price: ${totalPrice.toFixed(2)}
        </h3>

        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: totalPrice.toFixed(2),
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              console.log(
                "Transaction completed by:",
                details.payer.name.given_name
              );
              handleApprove(details.id);
            });
          }}
          onError={(err) => {
            console.error("PayPal Payment Error:", err);
            alert("An error occurred during the transaction.");
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalCheckout;
