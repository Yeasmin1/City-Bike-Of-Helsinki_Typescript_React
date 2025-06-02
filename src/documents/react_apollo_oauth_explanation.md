# Code Explanation: React + Apollo + Google OAuth Setup

### Imports

- `import React from 'react';`  
  Imports the core React library for building UI components.

- `import ReactDOM from 'react-dom/client';`  
  Imports ReactDOM to render React components into the browser DOM.

- `import reportWebVitals from './reportWebVitals';`  
  Imports utility for measuring app performance metrics.Useful for analyzing things like page load speed and responsiveness.

- `import { ApolloProvider } from '@apollo/react-hooks';`  
  Imports ApolloProvider to enable Apollo Client in React.It allows the React app to interact with GraphQL APIs via Apollo.

- `import { setContext } from '@apollo/client/link/context';`  
  Imports helper to modify request headers for Apollo.

- `import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';`  
  Imports main Apollo Client utilities.
  ApolloClient: main client instance to interact with GraphQL server
  createHttpLink: creates HTTP connection to GraphQL endpoint
  InMemoryCache: client-side cache to store query results for faster performance

- `import { GoogleOAuthProvider } from '@react-oauth/google';`  
  Imports Google OAuth provider for authentication. Wraps the app to provide Google authentication capabilities.

- `import './index.css';`  
  Imports global CSS styles.

- `import App from './App';`  
  Imports the root React component.

- `import './i18n';`  
  Imports internationalization setup.

---

### Apollo Client Setup

- `const httpLink = createHttpLink({ uri: process.env.REACT_APP_DIGITRANSIT_GRAPHQL_URI });`  
  Creates a network link to the GraphQL API endpoint from environment variables.

- `const authLink = setContext((_, { headers }) => ({ headers: { ...headers, "digitransit-subscription-key": process.env.REACT_APP_DIGITRANSIT_KEY } }));`  
  Middleware that adds authentication headers to each request.

- `const client = new ApolloClient({ link: authLink.concat(httpLink), cache: new InMemoryCache() });`  
  Initializes Apollo Client with auth and HTTP links and an in-memory cache.

---

### React DOM Rendering

- `const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);`  
  Finds the DOM element with id `root` and prepares React rendering.Creates a React root to render your app inside that div.

- \`\`\`jsx
  root.render(
    <React.StrictMode>
      <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </GoogleOAuthProvider>
    </React.StrictMode>
  );
  \`\`\`  
  Renders the app wrapped with:
  - React Strict Mode (development checks). Helps identify potential problems by running extra checks in development
  - Provides Google login context with the specified client ID
  - Apollo provider (GraphQL client context). Makes the Apollo Client available throughout the component tree
  - The root \`<App />\` component

---

### Performance Reporting

- \`reportWebVitals();\`  
  Starts performance measurements for the app.It is used to hook this into analytics services to track real user performance.

---

### Notes

- Replace \`"YOUR_CLIENT_ID"\` with your actual Google OAuth client ID.
- Environment variables (\`process.env.REACT_APP_...\`) should be set in a \`.env\` file.

---