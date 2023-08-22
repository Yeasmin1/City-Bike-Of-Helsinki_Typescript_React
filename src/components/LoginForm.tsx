import { Formik, Field, Form, ErrorMessage } from "formik";
import { GoogleLogin } from '@react-oauth/google';
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  token: string;
  access_token:string;
 
}


const LoginForm = (props:any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ user, setUser ] = useState<User | null>(null);
  const [ profile, setProfile ] = useState<User | null>(null);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  
    const login = useGoogleLogin({
        onSuccess: (codeResponse:any) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };


  return (
  
    <div className="login">
      <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                   
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </div>
        <div className="form">
        
          <form  onSubmit={handleSubmit}>
            <span>Login</span>

            <input
              type="email"
              name="email"
              placeholder="Enter email id / username"
              className="form-control inp_text"
              id="email"
              value={username} onChange={(event) => setUsername(event.target.value)}
            />

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="form-control"
              value={password} onChange={(event) => setPassword(event.target.value)}
            />

            <button type="submit">Login</button>
            
          </form>
          
        </div>
        
        
      </div>
      
   
      
    
       
      
     
   
  );
};

export default LoginForm;