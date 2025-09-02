import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentLanguage, setCurrentCategory, setLearningMode } from '../../store/slices/vocabularySlice';
import { logout } from '../../store/slices/authSlice';
import { logout as authLogout } from '../Services/authService';
import './dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.auth);
  const { vocabulary } = useSelector((state) => state.vocabulary);
  const { progress, totalScore, streak, achievements } = useSelector((state) => state.progress);

  const languages = Object.keys(vocabulary);
  const categories = ['greetings', 'courtesy', 'basics'];

  const handleLanguageSelect = (language) => {
    dispatch(setCurrentLanguage(language));
    navigate('/learn');
  };

  const handleCategorySelect = (category) => {
    dispatch(setCurrentCategory(category));
    dispatch(setLearningMode('flashcard'));
    navigate('/learn');
  };

  const handleLogout = () => {
    authLogout();
    dispatch(logout());
    navigate('/login');
  };

  const getProgressPercentage = (language, category) => {
    const categoryProgress = progress[language]?.[category];
    if (!categoryProgress) return 0;
    return Math.round((categoryProgress.completed / categoryProgress.total) * 100);
  };

  const getTotalProgress = () => {
    let totalCompleted = 0;
    let totalWords = 0;
    
    languages.forEach(language => {
      categories.forEach(category => {
        const categoryProgress = progress[language]?.[category];
        if (categoryProgress) {
          totalCompleted += categoryProgress.completed;
          totalWords += categoryProgress.total;
        }
      });
    });
    
    return totalWords > 0 ? Math.round((totalCompleted / totalWords) * 100) : 0;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Ready to continue your language learning journey?</p>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3 className="stat-value">{getTotalProgress()}%</h3>
            <p className="stat-label">Overall Progress</p>
          </div>
        </div>
        
        <div className="stat-card card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <h3 className="stat-value">{streak}</h3>
            <p className="stat-label">Day Streak</p>
          </div>
        </div>
        
        <div className="stat-card card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3 className="stat-value">{totalScore}</h3>
            <p className="stat-label">Total Score</p>
          </div>
        </div>
        
        <div className="stat-card card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <h3 className="stat-value">{achievements.length}</h3>
            <p className="stat-label">Achievements</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2 className="section-title">Quick Start</h2>
          <div className="language-grid">
            {languages.map((language) => (
              <div key={language} className="language-card card">
                <h3 className="language-name">
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </h3>
                <div className="language-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${getProgressPercentage(language, 'greetings')}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">
                    {getProgressPercentage(language, 'greetings')}% complete
                  </span>
                </div>
                <button 
                  onClick={() => handleLanguageSelect(language)}
                  className="btn btn-primary w-full"
                >
                  Continue Learning
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h2 className="section-title">Categories</h2>
          <div className="category-grid">
            {categories.map((category) => (
              <div key={category} className="category-card card">
                <h3 className="category-name">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h3>
                <div className="category-stats">
                  {languages.map((language) => (
                    <div key={language} className="category-stat">
                      <span className="language-label">{language}</span>
                      <span className="completion-rate">
                        {getProgressPercentage(language, category)}%
                      </span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => handleCategorySelect(category)}
                  className="btn btn-secondary w-full"
                >
                  Practice {category}
                </button>
              </div>
            ))}
          </div>
        </div>

        {achievements.length > 0 && (
          <div className="dashboard-section">
            <h2 className="section-title">Recent Achievements</h2>
            <div className="achievements-grid">
              {achievements.slice(-3).map((achievement, index) => (
                <div key={index} className="achievement-card card">
                  <div className="achievement-icon">🏆</div>
                  <div className="achievement-content">
                    <h4 className="achievement-title">{achievement.title}</h4>
                    <p className="achievement-description">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
