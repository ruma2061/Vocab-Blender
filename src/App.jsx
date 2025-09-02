import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './store/store';
import { loginSuccess } from './store/slices/authSlice';
import { loadProgress } from './store/slices/progressSlice';
import { getCurrentUser, isAuthenticated as authIsAuthenticated } from './Components/Services/authService.js';
import { setLanguage } from './store/slices/languageSlice.js';

// Components
import Navbar from './Components/Navbar/Navbar.jsx';
import Footer from './Components/Footer/Footer.jsx';

// Pages
import Home from './Components/Home/Home.jsx';
import Login from './Components/Auth/Login.jsx';
import Register from './Components/Auth/Register.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import Learn from './Components/Learning/Learn.jsx';
import Progress from './Components/Progress/Progress.jsx';
import About from './Components/About/About.jsx';
import Contact from './Components/Contact/Contact.jsx';

// Styles
import './styles/design-system.css';
import { current } from '@reduxjs/toolkit';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// App Component
const AppContent = () => {
  
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) => state.language.selected);
  
  useEffect(() => {
    const user = getCurrentUser();
    const savedProgress = localStorage.getItem('progress');
    const savedLanguage = localStorage.getItem('language');

    if (user && authIsAuthenticated()){
      store.dispatch(loginSuccess(user));
    }
    
    if (savedProgress) {
      store.dispatch(loadProgress(JSON.parse(savedProgress)));
    }

    if (savedLanguage) {
      dispatch(setLanguage(savedLanguage));
    }
  }, [dispatch]);

  useEffect(() =>{
    document.documentElement.lang = currentLanguage;
    localStorage.setItem('language', currentLanguage);
  }, [currentLanguage]);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/learn" 
              element={
                <ProtectedRoute>
                  <Learn />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/progress" 
              element={
                <ProtectedRoute>
                  <Progress />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

// Main App with Redux Provider
const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
