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
import { Provider } from 'react-redux';
import { store } from './redux/store';
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
    <Provider store={store}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </ApolloProvider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// TODO: Send web performance to analytics
reportWebVitals();
