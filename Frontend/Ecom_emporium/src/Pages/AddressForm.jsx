import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
        zip,
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Add Address</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Country
            </label>
            <input
              type="text"
              placeholder="Enter your Country"
              value={country}
              onChange={handleCountryChange}
              id="country"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              Enter City
            </label>
            <input
              type="text"
              placeholder="Enter your City"
              value={city}
              onChange={handleCityChange}
              id="city"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="address1"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Address1
            </label>
            <input
              type="text"
              placeholder="Enter your Address1"
              value={address1}
              onChange={handleAddress1Change}
              id="address1"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="address2"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Address2
            </label>
            <input
              type="text"
              placeholder="Enter your Address2"
              value={address2}
              onChange={handleAddress2Change}
              id="address2"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="zipCode"
              className="block text-sm font-medium text-gray-700"
            >
              Enter ZipCode
            </label>
            <input
              type="number"
              placeholder="Enter your PIN Code"
              value={zip}
              onChange={handleZipCodeChange}
              id="zipCode"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="addressType"
              className="block text-sm font-medium text-gray-700"
            >
              Address Type
            </label>
            <select
              value={addressType}
              onChange={handleAddressTypeChange}
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="Home">Home</option>
              <option value="Office">Office</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddressForm
