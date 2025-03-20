import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Profile = () => {
  const navigate=useNavigate()
    const [form, setForm]=useState({
        name:"",
        email:"",
        addresses:""
    })

    useEffect(()=>{
      const token = localStorage.getItem("Token");
      if (!token) {
        alert("Login first")
        navigate("/login"); 
      }
      fetch(
        "https://ecommerce-follow-along-mz95.onrender.com/user/profile",
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
        }
      )
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
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
      <>
        <Navbar />
        <div className="mt-24 p-6 max-w-lg mx-auto bg-[#F7D1CD] rounded-2xl shadow-lg flex flex-col space-y-6">
          <section className="profile-section text-center">
            <img
              src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid"
              alt="Profile Image"
              className="rounded-full w-32 h-32 mx-auto mb-4 border-4 border-[#735D78]"
            />
            <h3 className="text-2xl font-semibold text-[#735D78]">
              {form.name}
            </h3>
            <h4 className="text-[#B392AC]">{form.email}</h4>
          </section>

          <section className="address-section bg-[#E8C2CA] p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-[#735D78] mb-2">
              Addresses
            </h2>
            {form.addresses && Array.isArray(form.addresses) ? (
              form.addresses.map((address, idx) => (
                <h3 key={idx} className="text-[#735D78] mb-1">
                  <span className="font-semibold">Address {idx + 1}:</span>{" "}
                  {address.city}
                </h3>
              ))
            ) : (
              <p className="text-[#D1B3C4]">No addresses added.</p>
            )}
            <Link to="/add-address" className="mt-4 block text-center">
              <button className="bg-[#735D78] hover:bg-[#B392AC] text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Add Address
              </button>
            </Link>
          </section>
        </div>
      </>
    );
};

export default Profile
