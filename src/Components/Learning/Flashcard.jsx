import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextWord, previousWord } from '../../store/slices/vocabularySlice';
import { updateProgress } from '../../store/slices/progressSlice';
import './learning.css';

const Flashcard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  
  const dispatch = useDispatch();
  const { vocabulary, currentLanguage, currentCategory, currentWordIndex } = useSelector((state) => state.vocabulary);

  const currentWords = vocabulary[currentLanguage].filter(
    word => word.category === currentCategory
  );
  
  const currentWord = currentWords[currentWordIndex];
  const isLastWord = currentWordIndex === currentWords.length - 1;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowAnswer(!showAnswer);
  };

  const handleNext = () => {
    if (!isLastWord) {
      setIsFlipped(false);
      setShowAnswer(false);
      dispatch(nextWord());
    }
  };

  const handlePrevious = () => {
    if (currentWordIndex > 0) {
      setIsFlipped(false);
      setShowAnswer(false);
      dispatch(previousWord());
    }
  };

  const handleCorrect = () => {
    dispatch(updateProgress({ language: currentLanguage, category: currentCategory, score: 10 }));
    handleNext();
  };

  const handleIncorrect = () => {
    dispatch(updateProgress({ language: currentLanguage, category: currentCategory, score: 1 }));
    handleNext();
  };

  if (!currentWord) {
    return (
      <div className="flashcard-container">
        <div className="card">
          <div className="card-body text-center">
            <h3 className="text-xl font-semibold mb-4">No words available</h3>
            <p className="text-gray-600">Please select a different category or language.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flashcard-container">
      <div className="flashcard-header">
        <h2 className="text-2xl font-bold mb-2">
          {currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1)} - {currentCategory}
        </h2>
        <p className="text-gray-600">
          Word {currentWordIndex + 1} of {currentWords.length}
        </p>
      </div>

      <div className="flashcard-wrapper">
        <div 
          className={`flashcard ${isFlipped ? 'flipped' : ''}`}
          onClick={handleFlip}
        >
          <div className="flashcard-front card">
            <div className="card-body text-center">
              <h3 className="text-3xl font-bold mb-4">{currentWord.word}</h3>
              <p className="text-gray-500">Click to reveal translation</p>
            </div>
          </div>
          
          <div className="flashcard-back card">
            <div className="card-body text-center">
              <h3 className="text-3xl font-bold mb-4">{currentWord.translation}</h3>
              <p className="text-gray-500 mb-4">Original: {currentWord.word}</p>
              <div className="flashcard-actions">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIncorrect();
                  }}
                  className="btn btn-error mr-2"
                >
                  ❌ Incorrect
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCorrect();
                  }}
                  className="btn btn-success"
                >
                  ✅ Correct
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flashcard-navigation">
        <button 
          onClick={handlePrevious}
          disabled={currentWordIndex === 0}
          className="btn btn-secondary"
        >
          ← Previous
        </button>
        
        <button 
          onClick={handleNext}
          disabled={isLastWord}
          className="btn btn-primary"
        >
          Next →
        </button>
      </div>

      {isLastWord && (
        <div className="flashcard-complete">
          <div className="card">
            <div className="card-body text-center">
              <h3 className="text-xl font-semibold mb-2">🎉 Category Complete!</h3>
              <p className="text-gray-600 mb-4">
                You've finished all words in this category.
              </p>
              <button 
                onClick={() => {
                  dispatch(previousWord());
                  setIsFlipped(false);
                  setShowAnswer(false);
                }}
                className="btn btn-primary"
              >
                Review Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
