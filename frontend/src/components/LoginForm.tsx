import React, { useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { 
  setLoading, 
  setError, 
  setUsername, 
  setPassword, 
  setTemporaryUser,
  resetForm 
} from '../redux/slices/authSlice';
import { handleGoogleLogin } from '../redux/thunks/authThunk';
import { styled } from '@mui/material/styles';
import { 
    Box, 
    Container, 
    Paper, 
    Typography, 
    TextField, 
    Button, 
    Divider,
    Alert,
    CircularProgress
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { LightSection, ContentContainer } from '../theme/commonStyles';


interface User {
  access_token:string
}
interface LoginFormInterface  {
  title: string ,
  label1:string,
  label2:string,
  buttonText1:string,
  paragraph1:string,
  paragraph2:string,
  buttonText2:string,
  emailPlaceholder:string,
  passwordPlaceholder:string
};
interface loginProfileInterface {
  data: LoginFormInterface
}
const LoginCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: '400px',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
}));

const FormContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const GoogleButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#fff',
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.palette.grey[50],
  },
}));

const OrDivider = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  margin: theme.spacing(3, 0),
  '& hr': {
    flexGrow: 1,
  },
}));

const LoginForm :React.FC<loginProfileInterface>= ({data}) => {
  const dispatch = useAppDispatch();
  const { username, password, temporaryUser, isLoading, error } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const {t} = useTranslation();
  
  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username && password) {
      dispatch(setLoading(true));
      // TODO: Implement email/password login API integration
      // DETAILS: This is a placeholder. Once backend support is available, 
      // replace this block with a call to the login endpoint and handle success/error states.
      // For now, email/password login is not functional. Only Google login is supported.
      // Example of how might handle a form submission:
      // submitLoginForm({ username, password })
      //   .then(response => dispatch(setLoginProfile(response)))
      //   .catch(error => dispatch(setError(error.message)))
      //   .finally(() => dispatch(setLoading(false)));
      
      dispatch(setError('Email/password login is not available yet. Please use Google login.'));
      dispatch(setLoading(false));
    }
  };

  /*
  Performs user authentication with React provided google login hook. After successful authentication
  user's access token is stored
  */
  const login = useGoogleLogin({ 
    onSuccess: (userProfileResponse:any) => dispatch(setTemporaryUser(userProfileResponse)),
    onError: (error) => dispatch(setError('Login Failed: ' + error))
  });

  useEffect(() => {
    // Handle Google authentication
    if (temporaryUser) {
      void dispatch(handleGoogleLogin(navigate));
    }
    // Cleanup function
    return () => {
      dispatch(resetForm());
      dispatch(setError(null));
    };
  }, [temporaryUser, dispatch, navigate]);
  

return (
    <LightSection>
        <ContentContainer maxWidth="sm" sx={{ 
            minHeight: '80vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
        }}>
            <LoginCard>
                <Typography variant="h4" align="center" gutterBottom>
                    {t(data.title)}
                </Typography>

                {error && (
                    <Alert 
                        severity="error" 
                        onClose={() => dispatch(setError(null))}
                        sx={{ mb: 2 }}
                    >
                        {error}
                    </Alert>
                )}
                
                <GoogleButton
                    fullWidth
                    variant="outlined"
                    size="large"
                    onClick={() => login()}
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={20} /> : <GoogleIcon />}
                >
                    {t(data.buttonText2)}
                </GoogleButton>

                <OrDivider>
                    <Divider flexItem />
                    <Typography variant="body2" color="text.secondary">
                        {t(data.paragraph2)}
                    </Typography>
                    <Divider flexItem />
                </OrDivider>

                <form onSubmit={handleSubmit}>
                    <FormContent>
                        <TextField
                            fullWidth
                            label={t(data.label1)}
                            variant="outlined"
                            type="email"
                            required
                            placeholder={t(data.emailPlaceholder)}
                            value={username}
                            onChange={(event) => dispatch(setUsername(event.target.value))}
                        />
                        
                        <TextField
                            fullWidth
                            label={t(data.label2)}
                            variant="outlined"
                            type="password"
                            required
                            placeholder={t(data.passwordPlaceholder)}
                            value={password}
                            onChange={(event) => dispatch(setPassword(event.target.value))}
                        />
                        
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            disabled={isLoading}
                        >
                            {t(data.buttonText1)}
                        </Button>

                        <Typography 
                            variant="body2" 
                            color="primary" 
                            align="center" 
                            sx={{ cursor: 'pointer' }}
                        >
                            {t(data.paragraph1)}
                        </Typography>
                    </FormContent>
                </form>
            </LoginCard>
        </ContentContainer>
    </LightSection>
  );
};

export default LoginForm;