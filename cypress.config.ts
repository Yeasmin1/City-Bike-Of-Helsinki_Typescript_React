import { defineConfig } from "cypress";
// Populate process.env with values from .env file
require('dotenv').config()

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
  },
  env: {
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    googleClientId: process.env.REACT_APP_GOOGLE_CLIENTID,
    googleClientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
  },
});
