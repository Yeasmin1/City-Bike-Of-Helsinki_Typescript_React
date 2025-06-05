import React, { useState, useEffect } from 'react';
import {useGoogleLogin } from '@react-oauth/google';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { 
    Box, 
    Container, 
    Paper, 
    Typography, 
    TextField, 
    Button, 
    Divider,
    IconButton
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
interface loginProfileInterface{
  data: LoginFormInterface,
  setLoginProfile: any
}
const LoginForm :React.FC<loginProfileInterface>= ({data, setLoginProfile}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const {t} = useTranslation();
  
  // Prevents submission of the form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  /*
  Performs user authentication with React provided google login hook. After successful authentication
  user's access token is stored
  */
  const login = useGoogleLogin({ 
    onSuccess: (userProfileResponse:any) => setUser(userProfileResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  /*
  Gets profile information for the authenticated user using the previously stored access token. 
  Then, sets the profile information in a state variable.
  */
  useEffect(
    () => {
      if (user) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            setLoginProfile(res.data);
            window.sessionStorage.setItem('userProfile',JSON.stringify(res.data));
            navigate("/");
          })
          .catch((err) => console.log(err)); //TODO: add error notification to the user
      }
    },
    [ user, setLoginProfile ,navigate]
  );
  
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
                
                <GoogleButton
                    fullWidth
                    variant="outlined"
                    size="large"
                    onClick={() => login()}
                    startIcon={<GoogleIcon />}
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
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        
                        <TextField
                            fullWidth
                            label={t(data.label2)}
                            variant="outlined"
                            type="password"
                            required
                            placeholder={t(data.passwordPlaceholder)}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
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