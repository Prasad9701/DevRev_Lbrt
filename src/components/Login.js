import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        navigate('/');
      } catch (error) {
        alert(error);
      }
    },
    [navigate]
  );

  return (
    <div style={{ background: 'linear-gradient(135deg, #FF6B6B, #C56CB3)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#FFFFFF', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
        <h1 style={{ textAlign: 'center', color: '#FF4E50', marginBottom: '40px', fontSize: '28px' }}>Login</h1>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontSize: '16px', color: '#333' }}>Email</label>
            <input id="email" name="email" type="email" placeholder="Email" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #DDD', outline: 'none', fontSize: '16px', color: '#333' }} />
          </div>
          <div style={{ marginBottom: '30px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontSize: '16px', color: '#333' }}>Password</label>
            <input id="password" name="password" type="password" placeholder="Password" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #DDD', outline: 'none', fontSize: '16px', color: '#333' }} />
          </div>
          <button type="submit" style={{ background: '#FF4E50', color: '#FFFFFF', padding: '12px 24px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', letterSpacing: '1px' }}>Sign In</button>
        </form>
        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#333' }}>Don't have an account? <a href="/signup" style={{ color: '#FF4E50', textDecoration: 'none' }}>Sign up</a></p>
      </div>
    </div>
  );
}

export default Login;
