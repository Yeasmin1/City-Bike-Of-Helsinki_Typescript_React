import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  isMobileNavOpen: boolean;
  isProfileMenuOpen: boolean;
}

const initialState: UiState = {
  isMobileNavOpen: false,
  isProfileMenuOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileNav: (state) => {
      state.isMobileNavOpen = !state.isMobileNavOpen;
    },
    openProfileMenu: (state) => {
      state.isProfileMenuOpen = true;
    },
    closeProfileMenu: (state) => {
      state.isProfileMenuOpen = false;
    }
  }
});

export const { toggleMobileNav, openProfileMenu, closeProfileMenu } = uiSlice.actions;

export default uiSlice.reducer;
