import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isMobileNavOpen: boolean;
  menuAnchorEl: HTMLElement | null;
}

const initialState: UiState = {
  isMobileNavOpen: false,
  menuAnchorEl: null
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileNav: (state) => {
      state.isMobileNavOpen = !state.isMobileNavOpen;
    },
    setMenuAnchorEl: (state, action: PayloadAction<HTMLElement | null>) => {
      state.menuAnchorEl = action.payload;
    }
  }
});

export const { toggleMobileNav, setMenuAnchorEl } = uiSlice.actions;

export default uiSlice.reducer;
