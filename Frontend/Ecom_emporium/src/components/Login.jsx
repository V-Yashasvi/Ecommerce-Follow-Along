// import React from 'react'

const Login = () => {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-300 via-orange-300">
        <div className="w-full sm:w-96 p-6 bg-white rounded-3xl shadow-lg">
          <h1 className="text-4xl font-bold text-center text-gray-700 ">
            Login
          </h1>

          <form className="my-5">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-600 mb-3">
                Username
              </label>
              <input
                id="name"
                className="p-3 w-full rounded-2xl border border-gray-300 "
                type="text"
                placeholder="Enter your username"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-600 mb-2">
                Password
              </label>
              <input
                id="password"
                className="p-3 w-full rounded-2xl border border-gray-300 "
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 mt-4 bg-purple-500 text-white rounded-2xl"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
};

export default Login;
