import React, { useState, useEffect } from 'react';
import {useGoogleLogin } from '@react-oauth/google';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


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
  
  return (
    <div id="login-form">
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">{t(data.title)}</h3>
          <div className="form-group mt-3">
            <label>{t(data.label1)}</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder={t(data.emailPlaceholder)}
              value={username} onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>{t(data.label2)}</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder={t(data.passwordPlaceholder)}
              value={password} onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              {t(data.buttonText1)}
            </button>
          </div>
          <br />
          <p className=" text-left mt-2">
            {t(data.paragraph1)}
          </p>
          <p className=" text-left mt-2">
            {t(data.paragraph2)}
          </p>
          <button className="btn btn-primary" onClick={() => login()}>
            {t(data.buttonText2)}       
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;