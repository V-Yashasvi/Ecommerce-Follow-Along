import React from 'react'

const Login = () => {
  return (
    <div>
      <h1 className='border border-blue-600 rounded-full'>Login</h1>
      <label htmlFor="name"></label>
      <input id="name" type="text" placeholder='Enter Your Name' />
      <label htmlFor="password"></label>
      <input id="password" type="text" placeholder='Enter Your Password' />
    </div>
  )
}

export default Login
