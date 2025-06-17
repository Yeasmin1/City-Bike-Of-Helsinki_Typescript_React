import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isMobileNavOpen: boolean;
}

const initialState: UiState = {
  isMobileNavOpen: false
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMobileNavOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileNavOpen = action.payload;
    },
    toggleMobileNav: (state) => {
      state.isMobileNavOpen = !state.isMobileNavOpen;
    }
  }
});

export const { setMobileNavOpen, toggleMobileNav } = uiSlice.actions;

export default uiSlice.reducer;
