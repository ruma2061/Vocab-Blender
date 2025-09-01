import { createSlice } from '@reduxjs/toolkit';

// Sample vocabulary data
const sampleVocabulary = {
  english: [
    { id: 1, word: 'hello', translation: 'hola', difficulty: 'beginner', category: 'greetings' },
    { id: 2, word: 'goodbye', translation: 'adiós', difficulty: 'beginner', category: 'greetings' },
    { id: 3, word: 'thank you', translation: 'gracias', difficulty: 'beginner', category: 'courtesy' },
    { id: 4, word: 'please', translation: 'por favor', difficulty: 'beginner', category: 'courtesy' },
    { id: 5, word: 'water', translation: 'agua', difficulty: 'beginner', category: 'basics' },
  ],
  german: [
    { id: 1, word: 'hallo', translation: 'hello', difficulty: 'beginner', category: 'greetings' },
    { id: 2, word: 'auf wiedersehen', translation: 'goodbye', difficulty: 'beginner', category: 'greetings' },
    { id: 3, word: 'danke', translation: 'thank you', difficulty: 'beginner', category: 'courtesy' },
    { id: 4, word: 'bitte', translation: 'please', difficulty: 'beginner', category: 'courtesy' },
    { id: 5, word: 'wasser', translation: 'water', difficulty: 'beginner', category: 'basics' },
  ],
  swedish: [
    { id: 1, word: 'hej', translation: 'hello', difficulty: 'beginner', category: 'greetings' },
    { id: 2, word: 'hej då', translation: 'goodbye', difficulty: 'beginner', category: 'greetings' },
    { id: 3, word: 'tack', translation: 'thank you', difficulty: 'beginner', category: 'courtesy' },
    { id: 4, word: 'snälla', translation: 'please', difficulty: 'beginner', category: 'courtesy' },
    { id: 5, word: 'vatten', translation: 'water', difficulty: 'beginner', category: 'basics' },
  ],
};

const initialState = {
  vocabulary: sampleVocabulary,
  currentLanguage: 'english',
  currentCategory: 'greetings',
  currentWordIndex: 0,
  learningMode: 'flashcard', // flashcard, quiz, matching
  loading: false,
  error: null,
};

const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState,
  reducers: {
    setCurrentLanguage: (state, action) => {
      state.currentLanguage = action.payload;
      state.currentWordIndex = 0;
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
      state.currentWordIndex = 0;
    },
    setLearningMode: (state, action) => {
      state.learningMode = action.payload;
    },
    nextWord: (state) => {
      const currentWords = state.vocabulary[state.currentLanguage].filter(
        word => word.category === state.currentCategory
      );
      if (state.currentWordIndex < currentWords.length - 1) {
        state.currentWordIndex += 1;
      }
    },
    previousWord: (state) => {
      if (state.currentWordIndex > 0) {
        state.currentWordIndex -= 1;
      }
    },
    resetWordIndex: (state) => {
      state.currentWordIndex = 0;
    },
  },
});

export const { 
  setCurrentLanguage, 
  setCurrentCategory, 
  setLearningMode, 
  nextWord, 
  previousWord, 
  resetWordIndex 
} = vocabularySlice.actions;

export default vocabularySlice.reducer;
