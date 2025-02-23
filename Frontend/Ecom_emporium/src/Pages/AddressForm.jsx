import React, { useState } from 'react'

const AddressForm = () => {

    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [zipCode, setZipCode] = useState("");
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
      setZipCode(event.target.value);
    };

    const handleAddressTypeChange = (event) => {
      setAddressType(event.target.value);
    };

    const handleSubmit=(e)=>{
        e.preventDefault();

        let data={
            country,city,address1,address2,zipCode,addressType
        };

        
    }

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
              value={zipCode}
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
