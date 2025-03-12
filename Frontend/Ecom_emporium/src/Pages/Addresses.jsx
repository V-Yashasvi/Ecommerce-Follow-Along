import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    alert(selectedAddress.country, selectedAddress.city)
    navigate("/confirmation", { state: { selectedAddress } });
  };

  return (
    <div className="mt-60">
      <div className="border border-gray-300 p-4 rounded-lg shadow-md max-w-md mx-auto ">
        <h1 className="text-xl font-semibold mb-4">Select Address</h1>
        {addresses.length === 0 ? (
          <div>
            <p className="text-gray-600">No addresses found.</p>
            <button>Add Address</button>
          </div>
        ) : (
          addresses.map((address, index) => (
            <div
              key={index + 1}
              className="flex items-center gap-2 p-2 border rounded-md mb-2"
            >
              <input
                type="radio"
                name="selectedAddress"
                value={index + 1}
                checked={selectedAddress === address}
                onChange={() => setSelectedAddress(address)}
                className="w-5 h-5 accent-blue-600"
              />
              <span className="text-gray-700">
                {address.addressType}, {address.address1}, {address.address2},{" "}
                {address.city}, {address.zip}, {address.country}
              </span>
            </div>
          ))
        )}
        <button
          onClick={handleProceed}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md mt-4 transition duration-300"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Addresses;
