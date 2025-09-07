import axios from 'axios';
import { AppThunk } from '../store';
import { setLoginProfile, setLoading, setError, setTemporaryUser, resetForm } from '../slices/authSlice';

/**
 * Thunk to handle Google login after receiving temporaryUser from useGoogleLogin
 * @param navigate - React Router navigate function
 */
export const handleGoogleLogin = (navigate: (path: string) => void): AppThunk => {
  return async (dispatch, getState) => {
    const { temporaryUser } = getState().auth;

    if (!temporaryUser) return;

    try {
      dispatch(setLoading(true));

      const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo`, {
        headers: {
          Authorization: `Bearer ${temporaryUser.access_token}`,
          Accept: 'application/json',
        },
      });

      // Save profile to Redux and sessionStorage
      dispatch(setLoginProfile(response.data));
      dispatch(resetForm());
      navigate('/');

    } catch (error: any) {
      dispatch(setError(error.message || 'Login failed'));
      console.error('Google login error:', error);
    } finally {
      dispatch(setLoading(false));
      dispatch(setTemporaryUser(null)); // Clear temporary token
    }
  };
};
