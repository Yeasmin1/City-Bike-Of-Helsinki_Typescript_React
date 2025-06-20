import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileType {
  picture?: string;
  name: string;
  email?: string;
}

interface AuthState {
  loginProfile: ProfileType | null;
  isLoading: boolean;
  error: string | null;
  username: string;
  password: string;
  temporaryUser: {
    access_token: string;
  } | null;
}

const initialState: AuthState = {
  loginProfile: null,
  isLoading: false,
  error: null,
  username: '',
  password: '',
  temporaryUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginProfile: (state, action: PayloadAction<ProfileType | null>) => {
      state.loginProfile = action.payload;
      if (action.payload) {
        window.sessionStorage.setItem('userProfile', JSON.stringify(action.payload));
      } else {
        window.sessionStorage.removeItem('userProfile');
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setTemporaryUser: (state, action: PayloadAction<{ access_token: string } | null>) => {
      state.temporaryUser = action.payload;
      if (!action.payload) {
        // Clear error when resetting temporary user
        state.error = null;
      }
    },
    resetForm: (state) => {
      state.username = '';
      state.password = '';
      state.error = null;
      state.isLoading = false;
    },
    logout: (state) => {
      state.loginProfile = null;
      state.username = '';
      state.password = '';
      state.error = null;
      state.isLoading = false;
      state.temporaryUser = null;
      window.sessionStorage.removeItem('userProfile');
    }
  },
});

export const { 
  setLoginProfile, 
  setLoading, 
  setError, 
  setUsername, 
  setPassword, 
  setTemporaryUser,
  resetForm,
  logout
} = authSlice.actions;

export default authSlice.reducer;
