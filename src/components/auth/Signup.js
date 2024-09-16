import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/Auth.scss';

axios.defaults.baseURL = 'http://localhost:5001'; 

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    // Validation checks
    if (!name) {
      setMessage('Name is required');
      return;
    }

    if (password.length < 6) {
      setMessage('Password should be a minimum of 6 characters');
      return;
    }

    try {
      const response = await axios.post('/api/auth/signup', { name, email, password });
      console.log('Signup successful', response.data);
      setMessage('Signup successful!'); // Success message
    } catch (error) {
      console.error('Signup failed', error);

      // Improved error handling
      if (error.response) {
        const errorMessage = error.response.data.message || 'Signup failed. Please try again.';
        if (errorMessage === 'User already exists') {
          setMessage('User already exists'); // Specific error message for duplicate email
        } else {
          setMessage(errorMessage); // Show specific backend error message
        }
      } else {
        setMessage('Signup failed. Please try again.'); // Fallback error message
      }
    }
  };

  return (
    <div className="auth-container">
      
      <div className="auth-form">
        <h2>Signup</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleSignup}>Signup</button>
        {message && <div className="auth-message">{message}</div>}
      </div>
    </div>
  );
};

export default Signup;
