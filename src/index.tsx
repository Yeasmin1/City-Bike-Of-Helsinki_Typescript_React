import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/react-hooks'	//baseconfig
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { Loader } from "@googlemaps/js-api-loader"


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
      <ApolloProvider client={client}>
          <App />
      </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
