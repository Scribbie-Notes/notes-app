import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      return { ...state, isDarkMode: !state.isDarkMode };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer,
});