import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
    const [form, setForm]=useState({
        name:"",
        email:"",
        addresses:""
    })

    useEffect(()=>{
        fetch("http://localhost:8084/user", {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem("Token")}`,
                "Content-Type": "application/json",
            },
            })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setForm({
                    name: res.user.name,
                    email: res.user.email,
                    addresses: res.user.addresses || "No address found",
                });
            })
            .catch((err) => {
                console.log(err);
            });
    },[]);


    console.log(form)

    return (
      <div className="mt-48 p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md flex flex-col space-y-4">
        <section className="profile-section text-center">
          <img
            src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid"
            alt="Profile Image"
            className="rounded-full w-32 h-32 mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold">Name: {form.name}</h3>
          <h4 className="text-gray-600">Email: {form.email}</h4>
        </section>

        <section className="address-section">
          <h2 className="text-lg font-semibold mb-2">Addresses</h2>
          {form.addresses ? (
            form.addresses.map((address, idx) => (
              <h3 key={idx} className="text-gray-800 mb-1">
                Address {idx + 1}: {address.city}
              </h3>
            ))
          ) : (
            <p className="text-gray-500">No addresses added.</p>
          )}
          <Link to="/add-address" className="mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Address
            </button>
          </Link>
        </section>
      </div>
    );
};

export default Profile
