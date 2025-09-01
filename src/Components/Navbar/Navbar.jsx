import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import './navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    dispatch(logout());
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className='navbar'>
      <div className='nav-container'>
        <div className='nav-brand' onClick={() => navigate('/')}>
          <img src="/vite.svg" alt="Vocab Blender" className='nav-logo'/>
          <span className='nav-title'>Vocab Blender</span>
        </div>
        
        <ul className='nav-menu'>
          {isAuthenticated ? (
            <>
              <li className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
                <button onClick={() => navigate('/dashboard')} className='nav-link'>
                  Dashboard
                </button>
              </li>
              <li className={`nav-item ${isActive('/learn') ? 'active' : ''}`}>
                <button onClick={() => navigate('/learn')} className='nav-link'>
                  Learn
                </button>
              </li>
              <li className={`nav-item ${isActive('/progress') ? 'active' : ''}`}>
                <button onClick={() => navigate('/progress')} className='nav-link'>
                  Progress
                </button>
              </li>
              <li className='nav-item'>
                <div className='user-menu'>
                  <span className='user-name'>Hi, {user?.name}</span>
                  <button onClick={handleLogout} className='btn btn-secondary'>
                    Logout
                  </button>
                </div>
              </li>
            </>
          ) : (
            <>
              <li className={`nav-item ${isActive('/about') ? 'active' : ''}`}>
                <button onClick={() => navigate('/about')} className='nav-link'>
                  About
                </button>
              </li>
              <li className={`nav-item ${isActive('/contact') ? 'active' : ''}`}>
                <button onClick={() => navigate('/contact')} className='nav-link'>
                  Contact
                </button>
              </li>
              <li className='nav-item'>
                <button onClick={() => navigate('/login')} className='btn btn-primary'>
                  Sign In
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
