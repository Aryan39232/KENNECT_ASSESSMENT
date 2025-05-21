import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './AuthContext.css';

function AuthForm() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', contact_info: '' });
  const { login, signup } = useContext(AuthContext);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await signup(formData);
      } else {
        await login(formData);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

   return (
  <div className="auth-form-container">
    <h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2>
    <form onSubmit={handleSubmit}>
      {isSignup && (
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </label>
      )}
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </label>
      {isSignup && (
        <label>
          Phone No:
          <input
            type="text"
            name="contact_info"
            value={formData.contact_info}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </label>
      )}
      <button type="submit">{isSignup ? 'Sign Up' : 'Sign In'}</button>
    </form>
    <button
      type="button"
      className="toggle-button"
      onClick={() => setIsSignup(!isSignup)}
    >
      {isSignup ? 'Switch to Sign In' : 'Switch to Sign Up'}
    </button>
  </div>
);

}

export default AuthForm;