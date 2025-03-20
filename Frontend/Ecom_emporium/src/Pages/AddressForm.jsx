import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AddressForm = () => {
    const navigate=useNavigate()
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [zip, setZip] = useState("");
    const [addressType, setAddressType] = useState("Home");
    
    const handleCountryChange = (event) => {
      setCountry(event.target.value);
    };

    const handleCityChange = (event) => {
      setCity(event.target.value);
    };

    const handleAddress1Change = (event) => {
      setAddress1(event.target.value);
    };

    const handleAddress2Change = (event) => {
      setAddress2(event.target.value);
    };

    const handleZipCodeChange = (event) => {
      setZip(event.target.value);
    };

    const handleAddressTypeChange = (event) => {
      setAddressType(event.target.value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("Token"); 
      if (!token) {
        alert("You need to log in first!");
        return;
      }
      const addressData = {
        country,
        city,
        address1,
        address2,
        zipCode:zip,
        addressType,
      };
      try {
        const response = await fetch("http://localhost:8084/user/add-address", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addressData),
        })
        const data = await response.json();
        if (response.ok) {
          alert("Address added successfully!");
          navigate('/profile')
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error adding address:", error);
        alert("Something went wrong.");
      }
    };


  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-[#F7D1CD]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-[#735D78] mb-6 text-center">
          Add Address
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-[#735D78] font-medium">Country</label>
            <input
              type="text"
              name="country"
              value={country}
              onChange={handleCountryChange}
              placeholder="Enter your country"
              className="mt-1 p-2 w-full border border-[#B392AC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#735D78]"
            />
          </div>

          <div>
            <label className="block text-[#735D78] font-medium">City</label>
            <input
              type="text"
              name="city"
              value={city}
              onChange={handleCityChange}
              placeholder="Enter your city"
              className="mt-1 p-2 w-full border border-[#B392AC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#735D78]"
            />
          </div>

          <div>
            <label className="block text-[#735D78] font-medium">
              Address Line 1
            </label>
            <input
              type="text"
              name="address1"
              value={address1}
              onChange={handleAddress1Change}
              placeholder="Enter your address"
              className="mt-1 p-2 w-full border border-[#B392AC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#735D78]"
            />
          </div>

          <div>
            <label className="block text-[#735D78] font-medium">
              Address Line 2 (Optional)
            </label>
            <input
              type="text"
              name="address2"
              value={address2}
              onChange={handleAddress2Change}
              placeholder="Enter additional address details"
              className="mt-1 p-2 w-full border border-[#B392AC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#735D78]"
            />
          </div>

          <div>
            <label className="block text-[#735D78] font-medium">Zip Code</label>
            <input
              type="number"
              name="zip"
              value={zip}
              onChange={handleZipCodeChange}
              placeholder="Enter your PIN code"
              className="mt-1 p-2 w-full border border-[#B392AC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#735D78]"
            />
          </div>

          <div>
            <label className="block text-[#735D78] font-medium">
              Address Type
            </label>
            <select
              name="addressType"
              value={addressType}
              onChange={handleAddressTypeChange}
              className="mt-1 p-2 w-full border border-[#B392AC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#735D78]"
            >
              <option value="Home">Home</option>
              <option value="Office">Office</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-[#735D78] hover:bg-[#B392AC] text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Submit Address
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default AddressForm
