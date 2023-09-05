import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

interface User {
  access_token:string;
}
 interface Profile{
  picture:string;
  name: string;
  email: string;

 }

 interface loginProfile{
  setLoginProfile:any;
  }

const LoginForm  :React.FC<loginProfile>= ({ setLoginProfile}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [ user, setUser ] = useState<User | null>(null);
  const [ profile, setProfile ] = useState<Profile | null>(null);
  
  //prevents submission of the form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  
  const login = useGoogleLogin({
    onSuccess: (userProfileResponse:any) => setUser(userProfileResponse),
    onError: (error) => console.log('Login Failed:', error)
  });
  const navigate = useNavigate();
  useEffect(
      () => {
          if (user) {
            navigate("/");
              axios
                  .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                      headers: {
                          Authorization: `Bearer ${user.access_token}`,
                          Accept: 'application/json'
                      }
                  })
                  .then((res) => {
                      setLoginProfile(res.data);
                      setProfile(res.data);
                  })
                  .catch((err) => console.log(err));
          }
      },
      [ user, setLoginProfile ]
  );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
        setUser(null);
    };

  return (
       <div className="Auth-background-section">
      <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={username} onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password} onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <br />
          <p className=" text-left mt-2">
            Forgot password?
          </p>
        
          <p className=" text-left mt-2">
            OR
          </p>
          {profile ? (
                <div>
                  <Link  to={{pathname:"/"}}>
                   
                </Link>
                  <img src={profile.picture} alt="user" />
                   
                   
                    <h3>Logged in as</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button className="btn btn-primary" onClick={() => login()}>
                  Login with Google
                  
                </button>
            )}
        </div>
        
      </form>
      
    </div>
    </div>
   
  );
};

export default LoginForm;