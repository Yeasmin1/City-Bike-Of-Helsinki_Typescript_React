import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BannerData {
  title: string;
  paragraph: string;
}

interface ContentState {
  banner: BannerData;
  isLoading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  banner: {
    title: '',
    paragraph: ''
  },
  isLoading: false,
  error: null
};

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setBannerContent: (state, action: PayloadAction<BannerData>) => {
      state.banner = action.payload;
    },
    setContentLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setContentError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { setBannerContent, setContentLoading, setContentError } = contentSlice.actions;

export default contentSlice.reducer;
