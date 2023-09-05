import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/react-hooks'	//baseconfig
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import './i18n';
import { GoogleOAuthProvider } from '@react-oauth/google';

const httpLink = createHttpLink({ 
    uri: `${process.env.REACT_APP_DIGITRANSIT_GRAPHQL_URI}`,
  });

const authLink = setContext((_, { headers }) => {
// get the authentication token from local storage if it exists
    return {
      headers: {
        ...headers,
        "digitransit-subscription-key" :`${process.env.REACT_APP_DIGITRANSIT_KEY}`,
      }
    }
  });
    
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="958063092314-np3ibb1l0h0fg14otouc7nbhj237ecoq.apps.googleusercontent.com">
      <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
        
    </GoogleOAuthProvider>
     
  </React.StrictMode>
);

reportWebVitals();
