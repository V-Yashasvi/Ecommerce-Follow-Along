import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { handleSetEmail } from '../redux/actions/userAction';

const Login = () => {
  const navigate=useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch=useDispatch();
  const handleEmailChange = (e) => {
    setForm({
      ...form,
      email: e.target.value,
    });
  };
  const handlePasswordChange = (e) => {
    setForm({
      ...form,
      password: e.target.value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleSetEmail(form.email))
    if (!form.email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }
    if (form.password.length < 8 || form.password.length > 16) {
      alert("Please enter a valid password in the range of 8-16");
      return;
    }
    fetch("http://localhost:8084/login", {
      method: "POST",
      body: JSON.stringify({ email: form.email, password: form.password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Login response:", res); 
        if (res.token) {
          localStorage.setItem("Token", res.token);
          alert("Login Successful!");
          navigate("/");
        } else {
          alert("Login failed: " + res.message);
        }
      })
      .catch((err) => console.log("Login error:", err));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-300 to-purple-300">
      <div className="w-full sm:w-96 p-6 bg-white rounded-3xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-700 ">Login</h1>
        <form className="my-5" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium text-gray-600 mb-3">Email</label>
            <input
              id="name"
              className="p-3 w-full rounded-2xl border border-gray-300 "
              type="text"
              placeholder="Enter your username"
              onChange={handleEmailChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-medium text-gray-600 mt-3 mb-3">Password</label>
            <input
              id="password"
              className="p-3 w-full rounded-2xl border border-gray-300 "
              type="password"
              placeholder="Enter your password"
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="w-full p-3 mt-4 bg-purple-500 text-white rounded-2xl">Submit</button>
        </form>
        <p>Do not have an account? <button className="text-blue-300"><Link to='/signup'>register</Link></button></p>
      </div>
    </div>
  );
};

export default Login;
