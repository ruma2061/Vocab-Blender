import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../store/slices/languageSlice';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'sv', name: 'Svenska' },
];

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.language.selected);
  const [open, setOpen] = useState(false);
  // `displayName` holds the label currently shown on the selector button.
  // Using a more explicit variable name avoids clashing with the global
  // `display` identifier some environments expose, which previously caused
  // a `ReferenceError` during rendering.
  const [displayName, setDisplayName] = useState(LANGUAGES[0].name);
  const intervalRef = useRef(null);
  const indexRef = useRef(0);
  const [flipping, setFlipping] = useState(false);

  const animateFlip = useCallback((nextIndex) => {
    setFlipping(true);
    setTimeout(() => {
      setDisplayName(LANGUAGES[nextIndex].name);
    }, 300);
    setTimeout(() => {
      setFlipping(false);
    }, 600);
  }, []);

  const startCycle = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % LANGUAGES.length;
      animateFlip(indexRef.current);
    }, 2000);
  }, [animateFlip]);

  useEffect(() => {
    startCycle();
    return () => clearInterval(intervalRef.current);
  }, [startCycle]);

  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
    setFlipping(false);
    const current = LANGUAGES.find((l) => l.code === selected);
    setDisplayName(current.name);
  };

  const handleMouseLeave = () => {
    if (!open) {
      startCycle();
    }
  };

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleSelect = (code) => {
    dispatch(setLanguage(code));
    setOpen(false);
    const current = LANGUAGES.find((l) => l.code === code);
    setDisplayName(current.name);
  };

  return (
    <div
      className="language-selector"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="language-button" onClick={handleToggle}>
        <span className={`language-label${flipping ? ' flip' : ''}`}>{displayName}</span>
      </button>
      {open && (
        <ul className="language-dropdown">
          {LANGUAGES.map((lang) => (
            <li key={lang.code} onClick={() => handleSelect(lang.code)}>
              {lang.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;