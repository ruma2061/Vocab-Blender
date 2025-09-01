import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { loginSuccess } from './store/slices/authSlice';
import { loadProgress } from './store/slices/progressSlice';

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

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// App Component
const AppContent = () => {
  useEffect(() => {
    // Check for existing user session
    const user = localStorage.getItem('user');
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const savedProgress = localStorage.getItem('progress');
    
    if (user && isAuthenticated) {
      store.dispatch(loginSuccess(JSON.parse(user)));
    }
    
    if (savedProgress) {
      store.dispatch(loadProgress(JSON.parse(savedProgress)));
    }
  }, []);

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
