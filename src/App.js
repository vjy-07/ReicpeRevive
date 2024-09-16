import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import RecipeSearch from './components/RecipeSearch';
import NutritionInfo from './components/NutritionInfo';
import Reminder from './components/Reminder';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Navbar from './components/Navbar';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false); // Stop loading once the authentication check is done
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading spinner or message
  }

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        {/* Home is accessible to all users */}
        <Route path="/" element={<Home />} />
        
        {/* Routes requiring authentication */}
        <Route path="/recipe-search" element={isLoggedIn ? <RecipeSearch /> : <Navigate to="/login" />} />
        <Route path="/nutrition-info" element={isLoggedIn ? <NutritionInfo /> : <Navigate to="/login" />} />
        <Route path="/reminder" element={isLoggedIn ? <Reminder /> : <Navigate to="/login" />} />

        {/* Login route redirects to home if already logged in */}
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
        
        {/* Signup route is accessible to all users */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
