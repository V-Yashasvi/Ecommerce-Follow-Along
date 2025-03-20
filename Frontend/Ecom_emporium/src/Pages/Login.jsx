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
      credentials: "include",
      body: JSON.stringify({ email: form.email, password: form.password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Login response:", res);
        if (!res.token=="") {
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#D1B3C4] to-[#B392AC]">
      <div className="w-full sm:w-96 p-8 bg-[#F7D1CD] rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-[#735D78] mb-6">
          Welcome Back!
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium text-[#735D78] mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full rounded-xl border border-[#B392AC] focus:ring-2 focus:ring-[#735D78] outline-none"
              onChange={handleEmailChange}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="font-medium text-[#735D78] mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="p-3 w-full rounded-xl border border-[#B392AC] focus:ring-2 focus:ring-[#735D78] outline-none"
              onChange={handlePasswordChange}
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-4 bg-[#735D78] text-white rounded-xl text-lg hover:bg-[#B392AC] transition duration-300 font-semibold shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-[#735D78]">
          Dont have an account?{" "}
          <Link
            to="/signup"
            className="text-[#B392AC] font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
