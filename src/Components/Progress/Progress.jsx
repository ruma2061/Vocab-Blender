import React from 'react';
import { useSelector } from 'react-redux';
import './progress.css';

const Progress = () => {
  const { progress, totalScore, streak, achievements } = useSelector((state) => state.progress);
  const { vocabulary } = useSelector((state) => state.vocabulary);

  const languages = Object.keys(vocabulary);
  const categories = ['greetings', 'courtesy', 'basics'];

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
    <div className="progress-container">
      <div className="progress-header">
        <h1 className="progress-title">Your Learning Progress</h1>
        <p className="progress-subtitle">Track your vocabulary learning journey</p>
      </div>

      <div className="progress-overview">
        <div className="overview-card card">
          <h3 className="overview-title">Overall Progress</h3>
          <div className="overview-stats">
            <div className="stat-item">
              <div className="stat-value">{getTotalProgress()}%</div>
              <div className="stat-label">Completion</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{totalScore}</div>
              <div className="stat-label">Total Score</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{streak}</div>
              <div className="stat-label">Day Streak</div>
            </div>
          </div>
        </div>
      </div>

      <div className="progress-details">
        <div className="language-progress">
          <h2 className="section-title">Language Progress</h2>
          <div className="language-grid">
            {languages.map((language) => (
              <div key={language} className="language-progress-card card">
                <h3 className="language-name">
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </h3>
                <div className="category-progress">
                  {categories.map((category) => {
                    const percentage = getProgressPercentage(language, category);
                    const categoryProgress = progress[language]?.[category];
                    return (
                      <div key={category} className="category-item">
                        <div className="category-header">
                          <span className="category-name">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </span>
                          <span className="category-percentage">{percentage}%</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="category-stats">
                          <span className="completed">
                            {categoryProgress?.completed || 0} completed
                          </span>
                          <span className="total">
                            of {categoryProgress?.total || 0} words
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {achievements.length > 0 && (
          <div className="achievements-section">
            <h2 className="section-title">Achievements</h2>
            <div className="achievements-grid">
              {achievements.map((achievement, index) => (
                <div key={index} className="achievement-card card">
                  <div className="achievement-icon">🏆</div>
                  <div className="achievement-content">
                    <h4 className="achievement-title">{achievement.title}</h4>
                    <p className="achievement-description">{achievement.description}</p>
                    <span className="achievement-date">
                      {new Date(achievement.date).toLocaleDateString()}
                    </span>
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

export default Progress;
