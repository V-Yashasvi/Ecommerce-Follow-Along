import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Addresses = () => {
  const navigate=useNavigate()
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token) {
      console.log("No token found!");
      return;
    }

    fetch("http://localhost:8084/user/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setAddresses(res.user.addresses || []);
      })
      .catch((err) => {
        console.error("Error fetching addresses:", err);
      });
  }, []);

  const handleProceed = () => {
    if (!selectedAddress) {
      alert("Please select an address before proceeding.");
      return;
    }
    console.log("Selected Address:", selectedAddress);
    alert(`Country: ${selectedAddress.country}, City: ${selectedAddress.city}`);
    navigate("/confirmation", { state: { selectedAddress } });
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-[#F7D1CD]">
        <div className="border border-gray-300 p-6 bg-white rounded-lg shadow-lg max-w-lg w-full">
          <h1 className="text-2xl font-bold text-[#735D78] mb-6">
            Select Address
          </h1>
          {addresses.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-600 mb-4">No addresses found.</p>
              <button
                onClick={() => navigate("/add-address")}
                className="bg-[#735D78] hover:bg-[#B392AC] text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                Add Address
              </button>
            </div>
          ) : (
            addresses.map((address, index) => (
              <label
                key={index}
                className="flex items-center gap-3 p-3 border border-gray-300 rounded-md cursor-pointer mb-3 hover:shadow-md transition"
              >
                <input
                  type="radio"
                  name="selectedAddress"
                  value={index}
                  checked={selectedAddress === address}
                  onChange={() => setSelectedAddress(address)}
                  className="w-5 h-5 accent-[#B392AC]"
                />
                <span className="text-gray-700">
                  <strong>{address.addressType}</strong>, {address.address1},{" "}
                  {address.address2}, {address.city}, {address.zip},{" "}
                  {address.country}
                </span>
              </label>
            ))
          )}
          {addresses.length > 0 && (
            <button
              onClick={handleProceed}
              className="w-full bg-[#735D78] hover:bg-[#B392AC] text-white font-semibold py-2 px-4 rounded-lg shadow-md mt-4 transition"
            >
              Proceed
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Addresses;
