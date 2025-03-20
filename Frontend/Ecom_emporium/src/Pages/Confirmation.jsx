import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const Confirmation = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const location = useLocation();
    const selectedAddress = location.state?.selectedAddress || null;
    const navigate = useNavigate();
    const token = localStorage.getItem("Token");
    const [email, setEmail]=useState("")
    const [selectedMethod, setSelectedMethod]=useState("")

    useEffect(() => {
        fetchCartItems();
    },);

    const fetchCartItems = async () => {
        try {
        const res = await axios.get("http://localhost:8084/cart/products", {
            headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            },
        });
        setCartItems(res.data.cart);
        // console.log(res.data.cart)
        setEmail(localStorage.getItem('email'))
        } catch (error) {
        console.error("Error fetching cart items:", error);
        }
    };

    useEffect(() => {
        setTotalPrice(cartItems.reduce((sum, item) => sum + item.totalPrice, 0));
    }, [cartItems]);

    const updateQuantity = async (cartItemId, type) => {
        try {
        await axios.put(
            `http://localhost:8084/cart/${type}/${cartItemId}`,
            {},
            {
            headers: { authorization: `Bearer ${token}` },
            }
        );
        fetchCartItems(); 
        } catch (error) {
        console.error(`Error updating quantity (${type}):`, error);
        alert(`Failed to ${type} quantity. Minimum Quantity is 1`);
        }
    };
    const handleSelection = (method) => {
        setSelectedMethod(selectedMethod === method ? "" : method);
    };


    const handleOrder = async () => {
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    // console.log("Email:", email);
    // console.log("Cart Items:", cartItems);
    // console.log("Selected Address:", selectedAddress);
    if (!email) {
        alert("User email is required");
        return;
    }

    if (!selectedAddress) {
        alert("Please select an address.");
        return;
    }

    console.log(token,"J")

    const orderData = {
        email,
        products: cartItems.map((item) => ({
        _id: item?.product?._id,
        quantity: item.quantity,
        })),
        address: {
        addressType: selectedAddress.addressType,
        address1: selectedAddress.address1,
        city: selectedAddress.city,
        country: selectedAddress.country,
        zipCode: selectedAddress.zipCode,
        },
    };
    console.log("Final Order Data:", orderData);
    if(selectedMethod=="cod"){
        try {
            const response = await axios.post("http://localhost:8084/orders/place",orderData,
            {
                headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                },
            }
            );
        console.log("Order Response:", response);
        if (response.status === 201 || response.data.success) {
            alert("Order placed successfully!");
            navigate("/orders");
        } else {
            alert("Failed to place order. Please try again.");
        }
        } catch (error) {
            console.error("Error placing order:",error.message);
            alert(`An error while placing the order: ${error.message}`);
        }
    }
    else if(selectedMethod=="online"){
        navigate('/paypal')
    }else{
        alert("Select a payment method")
    }
};

    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-8 p-4">
            <h2 className="text-2xl font-bold mb-4 text-[#735D78]">
                Shopping Cart
            </h2>
            {cartItems.length === 0 ? (
                <p className="text-[#B392AC]">Your cart is empty.</p>
            ) : (
                cartItems.map((item) => (
                <div
                    key={item._id}
                    className="flex items-center justify-between p-4 bg-[#E8C2CA] shadow-md rounded-lg mb-4"
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
                    <p className="text-[#735D78]">
                        ${item?.product?.productPrice}
                    </p>
                    </div>
                    <div className="flex items-center">
                    <button
                        onClick={() => updateQuantity(item._id, "decrease")}
                        className="bg-[#D1B3C4] px-3 py-1 rounded-l-lg"
                    >
                        -
                    </button>
                    <span className="px-4">{item?.quantity}</span>
                    <button
                        onClick={() => updateQuantity(item._id, "increase")}
                        className="bg-[#D1B3C4] px-3 py-1 rounded-r-lg"
                    >
                        +
                    </button>
                    </div>
                    <p className="text-lg font-bold text-[#735D78]">
                    ${item?.totalPrice}
                    </p>
                </div>
                ))
            )}

            <div className="mx-24 mt-2 p-4">
                <h2 className="text-xl font-bold mt-6 text-[#735D78]">
                Selected Address:
                </h2>
                {selectedAddress ? (
                <p className="text-[#B392AC]">{`${selectedAddress.addressType}, ${selectedAddress.address1}, ${selectedAddress.city}, ${selectedAddress.country}`}</p>
                ) : (
                <p className="text-gray-500">No address selected.</p>
                )}
            </div>

            <h2 className="text-xl font-bold mx-24 mt-4 p-4 text-[#735D78]">
                Total Price: $
                {cartItems.length > 0 ? totalPrice.toFixed(2) : "0.00"}
            </h2>

            <div className="mx-24 mt-2 p-2">
                <label className="text-lg font-semibold text-[#735D78]">
                Select payment method:
                </label>
                <input
                type="radio"
                id="cod"
                name="payment"
                checked={selectedMethod === "cod"}
                onChange={() => handleSelection("cod")}
                className="ml-5 mr-2"
                />
                <label htmlFor="cod">COD</label>
                <input
                type="radio"
                id="online"
                name="payment"
                checked={selectedMethod === "online"}
                onChange={() => handleSelection("online")}
                className="ml-5 mr-2"
                />
                <label htmlFor="online">Online</label>
            </div>

            <button
                onClick={handleOrder}
                className="absolute right-10 bg-[#735D78] hover:bg-[#B392AC] text-white font-semibold py-2 px-4 rounded-lg shadow-md"
            >
                Place Order
            </button>
            </div>
        </>
    );
};

export default Confirmation;
