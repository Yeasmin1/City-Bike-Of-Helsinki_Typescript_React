
# 🚴‍♀️City Bike of Helsinki Demo App

This is a demo application for the **Helsinki City Bike** system, featuring live bike station data, multilingual support, and a modern responsive UI.

---

## Features

- Responsive design (mobile + desktop)
- Google Login with session storage + Logout
- Language translation (🇫🇮 Finnish, 🇬🇧 English)
- Interactive Map showing real-time bike availability (Google Maps + DigiTransit API)
- Static pages for buying Tickets

---

## Live Demo

A live version of the app is available at:  
👉 [https://city-bike-of-helsinki.firebaseapp.com](https://city-bike-of-helsinki.firebaseapp.com)

---

## Available Scripts

In the project directory, you can run:

```bash
npm start          # Run app in development mode
npm run build      # Create production build in /build
npm run cypress:open # Open Cypress test runner
```

---

## Project Evolution

This project has undergone several significant improvements:

### 1. UI Migration: Bootstrap → MUI (Material-UI)
- Replaced Bootstrap with modern MUI components.
- Enhanced responsiveness, accessibility, and design consistency.

### 2. State Management: React State → Redux Toolkit
- Global state refactored to use Redux.
- Improved scalability and maintainability.
- Redux DevTools support for easier debugging.

### 3. Docker Containerization
- App is fully containerized using Docker.
- Simplified setup and deployment using `Dockerfile`.
- Exposes the app on `http://localhost:8080`.

---

## Docker Setup

### Build and Run the Container

```bash
# Build the Docker image
docker build -t city-bike-of-helsinki-docker-image .

# Run the container on port 8080
docker run -p 8080:80 city-bike-of-helsinki-docker-image
```

### Verify It's Running

```bash
docker ps
```

You should see a container running based on `city-bike-of-helsinki-docker-image`.

To inspect the container:

```bash
docker exec -it <container-id or name> sh
```

---

## Want to Know More?

For a **detailed overview of the project goals and logic**, check out the [`main`](https://github.com/Yeasmin1/City-Bike-Of-Helsinki_Typescript_React/tree/main) branch

---

## Other Projects

Check out more frontend and full-stack projects:  
 [https://github.com/Yeasmin1/Web_projects](https://github.com/Yeasmin1/Web_projects)