
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/react-hooks'
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './i18n';
import './index.css';
import App from './App';

// URI of HSL DigitTransit API
const httpLink = createHttpLink({ 
    uri: `${process.env.REACT_APP_DIGITRANSIT_GRAPHQL_URI}`,
  });

// get the authentication token from local storage if it exists
const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        "digitransit-subscription-key" :`${process.env.REACT_APP_DIGITRANSIT_KEY}`,
      }
    }
  });

// Apollo GraphQL client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Use strict mode to catch more errors
// TODO: Move clientId to variable
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="958063092314-np3ibb1l0h0fg14otouc7nbhj237ecoq.apps.googleusercontent.com">
      <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
        
    </GoogleOAuthProvider>
     
  </React.StrictMode>
);

// TODO: Send web performance to analytics
reportWebVitals();
