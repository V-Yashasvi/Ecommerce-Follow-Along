import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = () => {
    const navigate=useNavigate()
    const[form,setForm]=useState({
        name:"",
        email:"",
        password:""
    })
    const handleNameChange=(e)=>{
        setForm({
            ...form,name:e.target.value
        })
    }   
    const handleEmailChange=(e)=>{
        setForm({
            ...form,email:e.target.value
        })
    }
    const handlePasswordChange=(e)=>{
        setForm({
            ...form,password:e.target.value
        })
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!form.email.includes("@")) {
        alert("Please enter a valid email");
        return;
      }
      if (form.password.length < 8 || form.password.length > 16) {
        alert("Please enter a valid password in the range of 8-16");
        return;
      }

      fetch("http://localhost:8084/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
        .then(async (res) => {
          console.log("Response:", res);
          return res.json(); 
        })
        .then((data) => {
          console.log("Json Response:", data);
          if (
            data.msg &&
            data.msg.toLowerCase().includes("signup successful")
          ) {
            alert("Hurray! Signed Up successfully");
            navigate("/login");
          } else {
            alert(data.msg || "Signup failed! Please try again.");
          }
        })
        .catch((err) => {
          console.error("Error:", err);
          alert("Signup failed! Please try again.");
        });
    };


    return (
      <>
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#D1B3C4] to-[#B392AC]">
          <div className="w-full sm:w-96 p-8 bg-[#F7D1CD] rounded-3xl shadow-xl">
            <h1 className="text-3xl font-bold text-center text-[#735D78] mb-6">SignUp</h1>
            <form className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="font-medium text-[#735D78] mb-1">Username</label>
                <input
                  id="name"
                  className="p-3 w-full rounded-xl border border-[#B392AC] focus:ring-2 focus:ring-[#735D78] outline-none"
                  type="text"
                  placeholder="Enter your username"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="font-medium text-[#735D78] mb-1">Email</label>
                <input
                  id="email"
                  className="p-3 w-full rounded-xl border border-[#B392AC] focus:ring-2 focus:ring-[#735D78] outline-none"
                  type="text"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="font-medium text-[#735D78] mb-1">Password</label>
                <input
                  id="password"
                  className="p-3 w-full rounded-xl border border-[#B392AC] focus:ring-2 focus:ring-[#735D78] outline-none"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <input
                type="submit"
                className="w-full p-3 mt-4 bg-[#735D78] text-white rounded-xl text-lg hover:bg-[#B392AC] transition duration-300 font-semibold shadow-md cursor-pointer"
              />
            </form>
            <p className="text-center mt-4 text-[#735D78]">
              Already have an account?{" "}
              <Link to="/login" className="text-[#B392AC] font-medium hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </>
    );
};

export default SignUp;


