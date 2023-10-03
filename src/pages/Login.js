import React, { useState } from 'react';
import './login.css'; // Import the CSS file

const Login = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    const data = await response.json();

    if (data.user) {
      // Save the JWT token to local storage
      localStorage.setItem('token', data.user);
      // Redirect to the homepage
      window.location.href='/home'
    } else {
      alert('Please enter valid credentials');
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>User Login</h1>
        <form onSubmit={loginUser}>
          <input
            type="text"
            className="login-input"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            required
          /><br />
          <input
            type="password"
            className="login-input"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
      <label className='lbl1'>
        Don't have an account?
      </label>
      <button className='login-button' onClick={()=>window.location.href='/register'}>Register</button>
    </div>
  );
}

export default Login;
