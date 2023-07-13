import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { auth } from './firebase';

import BookDetail from './components/BookDetail';
import BooksList from './components/BooksList';
import Login from './components/Login';
import SearchBar from './components/SearchBar';
import SignUp from './components/SignUp';

function App() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  }

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to right, #667eea, #764ba2)',
    padding: '20px',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    width: '100%',
  };

  const titleStyle = {
    color: 'white',
    fontSize: '28px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  };

  const buttonStyle = {
    padding: '12px 24px',
    background: '#FF4E50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    transition: 'background-color 0.3s ease',
  };

  const booksContainerStyle = {
    maxHeight: '600px',
    overflowY: 'scroll',
    width: '100%',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  };

  return (
    <div style={{ backgroundColor: 'LavenderBlush' }}>
      <Router>
        {user ? (
          <div style={containerStyle}>
            <header style={headerStyle}>
              <h1 style={titleStyle}>My Bookshelf</h1>
              <button style={buttonStyle} onClick={handleLogout}>Logout</button>
            </header>
            <SearchBar setBooks={setBooks} books={books} />
            <div style={booksContainerStyle}>
              <BooksList books={books} />
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" />} />
            <Route exact path="/book/:id" component={BookDetail} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
