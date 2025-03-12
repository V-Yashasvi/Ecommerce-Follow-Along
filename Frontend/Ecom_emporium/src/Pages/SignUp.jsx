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
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-300 to-purple-300">
          <div className="w-full sm:w-96 p-6 bg-white rounded-3xl shadow-lg">
            <h1 className="text-4xl font-bold text-center text-gray-700 ">SignUp</h1>
            <form className="my-5" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label htmlFor="name" className="font-medium text-gray-600 mb-3">Username</label>
                <input
                  id="name"
                  className="p-3 w-full rounded-2xl border border-gray-300 "
                  type="text"
                  value={form.name}
                  placeholder="Enter your username"
                  onChange={handleNameChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="font-medium text-gray-600 mb-3 mt-3">Email</label>
                <input
                  id="email"
                  className="p-3 w-full rounded-2xl border border-gray-300 "
                  type="text"
                  value={form.email}
                  placeholder="Enter your email"
                  onChange={handleEmailChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="font-medium text-gray-600 mb-3 mt-3">Password</label>
                <input
                  id="password"
                  className="p-3 w-full rounded-2xl border border-gray-300 "
                  type="password"
                  value={form.password}
                  placeholder="Enter your password"
                  onChange={handlePasswordChange}
                />
              </div>
              <input
                type="submit"
                className="w-full p-3 mt-4 bg-purple-500 text-white rounded-2xl"
              />
            </form>
            <p>Already have an account? <button className="text-blue-300"><Link to='/login'>login</Link></button></p>
          </div>
        </div>
      </>
    );
};

export default SignUp;


