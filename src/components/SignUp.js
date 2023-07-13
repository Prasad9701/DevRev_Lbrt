import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      navigate('/');
    } catch (error) {
      alert(error);
    }
  }, [navigate]);

  return (
    <div style={{ background: 'linear-gradient(135deg, #FFE53B, #FF2525)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '40px', borderRadius: '10px', maxWidth: '400px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#FF2525' }}>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '18px', color: '#FF2525' }}>Email</label><br />
            <input name="email" type="email" placeholder="Email" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #FF2525' }} />
          </div>
          <div style={{ marginBottom: '30px' }}>
            <label style={{ fontSize: '18px', color: '#FF2525' }}>Password</label><br />
            <input name="password" type="password" placeholder="Password" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #FF2525' }} />
          </div>
          <button type="submit" style={{ background: 'linear-gradient(135deg, #FF2525, #FF793B)', color: '#fff', padding: '12px 24px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
