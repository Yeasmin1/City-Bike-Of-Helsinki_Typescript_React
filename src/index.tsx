import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './theme/theme';
import './index.css';
import App from './App';
import './i18n';

// URI of HSL DigitTransit API
const httpLink = createHttpLink({ 
    uri: import.meta.env.VITE_APP_DIGITRANSIT_GRAPHQL_URI,
});

// get the authentication token from local storage if it exists
const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        "digitransit-subscription-key": import.meta.env.VITE_DIGITRANSIT_KEY,
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

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="958063092314-np3ibb1l0h0fg14otouc7nbhj237ecoq.apps.googleusercontent.com">
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </ApolloProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// TODO: Send web performance to analytics
reportWebVitals();
