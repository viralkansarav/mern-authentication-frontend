import { useState } from "react";
import './register.css'; 

function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        username,
        password
      })
    });
    const data = await response.json();
    console.log(data);
    alert('Registration successful, please login');
    window.location.href = '/login';
  }

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>User Registration</h1>
        <form onSubmit={registerUser}>
          <input
            type="text"
            className="register-input"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            required
          /><br />
          <input
            type="email"
            className="register-input"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            required
          /><br />
          <input
            type="password"
            className="register-input"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br />
          <button type="submit" className="register-button">Sign up</button>
        </form>
        
      </div>
      <label>Already have an account?</label>
      <button className="register-button" onClick={()=>{window.location.href='/login'}}>Login</button>
    </div>
  );
}

export default Register;
