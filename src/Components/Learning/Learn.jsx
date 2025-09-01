import React from 'react';
import { useSelector } from 'react-redux';
import Flashcard from './Flashcard.jsx';
import './learn.css';

const Learn = () => {
  const { currentLanguage, currentCategory, learningMode } = useSelector((state) => state.vocabulary);

  return (
    <div className="learn-container">
      <div className="learn-header">
        <h1 className="learn-title">Learning Mode</h1>
        <div className="learn-info">
          <span className="language-badge">{currentLanguage}</span>
          <span className="category-badge">{currentCategory}</span>
          <span className="mode-badge">{learningMode}</span>
        </div>
      </div>
      
      <div className="learn-content">
        <Flashcard />
      </div>
    </div>
  );
};

export default Learn;
