import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './home.css';
import { LinearGradient } from 'react-text-gradients';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const handleLearning = () => {
    if (isAuthenticated) {
      navigate('/learn');
    } else {
      navigate('/login');
    }
  };

  const handleLanguages = () => {
    if (isAuthenticated) {
      navigate('/languages');
    } else {
      navigate('/login');
    }
  };

  const handleProgress = () => {
    if (isAuthenticated) {
      navigate('/progress');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Master Language with
            <span
            className="gradient-text">
            {' '}Vocab Blender
            </span>
          </h1>
          <p className="hero-subtitle">
            Learn vocabulary through interactive flashcards, quizzes, and games. 
            Track your progress and build fluency in multiple languages.
          </p>
          <div className="hero-actions">
            <button onClick={handleGetStarted} className="btn btn-primary btn-large">
              {isAuthenticated ? 'Get Started' : 'Get Started Free'}
            </button>
            {!isAuthenticated && (
              <button onClick={() => navigate('/login')} className="btn btn-secondary btn-large">
                Sign In
              </button>
            )}
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-graphic">
            <div className="floating-card card-1">Hello</div>
            <div className="floating-card card-2">Hola</div>
            <div className="floating-card card-3">Bonjour</div>
            <div className="floating-card card-4">Hallo</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title text-center">Why Choose Vocab Blender?</h2>
          <div className="features-grid">
            <button onClick={handleLearning} className="feature-card card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Learn Through Comprehensible Input</h3>
              <p className="feature-description">
                Adaptive algorithms that focus on words you need to practice most.
              </p>
            </button>

            <button onClick={handleProgress} className="feature-card card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Track Progress</h3>
              <p className="feature-description">
                Monitor your learning journey with detailed statistics and vocabulary achievements.
              </p>
            </button>

            <button onClick={handleLearning} className="feature-card card">
              <div className="feature-icon">🎮</div>
              <h3 className="feature-title">Fun & Engaging</h3>
              <p className="feature-description">
                Learn through interactive games and challenges that make studying enjoyable.
              </p>
            </button>

            <button onClick={handleLanguages} className="feature-card card">
              <div className="feature-icon">🌍</div>
              <h3 className="feature-title">Multiple Languages</h3>
              <p className="feature-description">
                Support for multiple languages with comprehensive vocabulary sets.
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Language Journey?</h2>
            <p className="cta-subtitle">
              Join thousands of learners who are already improving their vocabulary with Vocab Blender.
            </p>
            <button onClick={handleGetStarted} className="btn btn-primary btn-large">
              Start Learning Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
