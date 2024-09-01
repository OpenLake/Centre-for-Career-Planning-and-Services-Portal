import React from 'react'

const Login = () => {
  return (
    <div className="container">
      <div className="login-form">
        <h1>CCPS</h1>
        <p className="first">Centre for Career Planning ans Services </p>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
          </div>
          <button type="submit">Log In</button>
        </form>
        <p>
          <a href="#">Forgot Password?</a>
        </p>
        <p>Do not have an account yet? <a href="#">Sign Up</a></p>
      </div>
      <div className="image">
        <img src="../src/assets/bubble.jpeg" alt="" />
      </div>
    </div>


  )
}

export default Login
