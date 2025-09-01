import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  progress: {
    english: {
      greetings: { completed: 0, total: 2, score: 0 },
      courtesy: { completed: 0, total: 2, score: 0 },
      basics: { completed: 0, total: 1, score: 0 },
    },
    german: {
      greetings: { completed: 0, total: 2, score: 0 },
      courtesy: { completed: 0, total: 2, score: 0 },
      basics: { completed: 0, total: 1, score: 0 },
    },
    swedish: {
      greetings: { completed: 0, total: 2, score: 0 },
      courtesy: { completed: 0, total: 2, score: 0 },
      basics: { completed: 0, total: 1, score: 0 },
    },
  },
  totalScore: 0,
  streak: 0,
  achievements: [],
  lastStudyDate: null,
};

// Load progress from localStorage
const loadProgressFromStorage = () => {
  try {
    const savedProgress = localStorage.getItem('progress');
    return savedProgress ? JSON.parse(savedProgress) : initialState;
  } catch (error) {
    console.error('Error loading progress from localStorage:', error);
    return initialState;
  }
};

const progressSlice = createSlice({
  name: 'progress',
  initialState: loadProgressFromStorage(),
  reducers: {
    updateProgress: (state, action) => {
      const { language, category, score } = action.payload;
      if (state.progress[language] && state.progress[language][category]) {
        state.progress[language][category].completed += 1;
        state.progress[language][category].score += score;
        state.totalScore += score;
        state.streak += 1;
        state.lastStudyDate = new Date().toISOString();
        
        // Save to localStorage
        localStorage.setItem('progress', JSON.stringify(state));
      }
    },
    resetProgress: (state) => {
      state.progress = initialState.progress;
      state.totalScore = 0;
      state.streak = 0;
      state.achievements = [];
      state.lastStudyDate = null;
      
      // Clear from localStorage
      localStorage.removeItem('progress');
    },
    addAchievement: (state, action) => {
      state.achievements.push({
        ...action.payload,
        date: new Date().toISOString()
      });
      
      // Save to localStorage
      localStorage.setItem('progress', JSON.stringify(state));
    },
    breakStreak: (state) => {
      state.streak = 0;
      
      // Save to localStorage
      localStorage.setItem('progress', JSON.stringify(state));
    },
    loadProgress: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateProgress, resetProgress, addAchievement, breakStreak, loadProgress } = progressSlice.actions;
export default progressSlice.reducer;
