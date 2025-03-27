# Cloud Frontend Service

## Overview
This is the frontend for the Cloud Backend Service. It is built using React and Material-UI, with TypeScript support and state management using Recoil.

## Features
- User authentication (Login page)
- Folder and file management views
- User management
- Notification system using Notistack
- Uses React Router for navigation

## Tech Stack
- **React**: Frontend framework
- **Material-UI**: UI components and icons
- **Recoil**: State management
- **TypeScript**: Static typing
- **React Router**: Routing

## Project Structure
```
my-app/
│-- src/
│   │-- components/          # UI components
│   │-- features/            # Feature modules
│   │-- routes/              # Routing logic
│   │-- App.tsx              # Main application file
│   │-- index.tsx            # Entry point
│-- public/
│-- package.json             # Dependencies and scripts
│-- tsconfig.json            # TypeScript configuration
```

## Installation
To install dependencies, run:
```sh
npm install
```

## Running the Project
To start the development server:
```sh
npm start
```

## Building the Project
To create a production build:
```sh
npm run build
```

## Routing
Routes are defined in `mainRoutes.tsx`:
```tsx
const routes: Array<Route> = [
    { name: "/", component: <Login /> },
    { name: "/showfolder", component: <Main /> },
    { name: "/showfile", component: <Main /> },
    { name: "/users", component: <Main /> },
    { name: "/folder", component: <Main /> },
    { name: "/login", component: <Login /> },
    { name: "/edit", component: <Main /> }
];
```

## Dependencies
Key dependencies from `package.json`:
- **React** (`17.0.2`)
- **Material-UI** (`@mui/material`, `@mui/icons-material`)
- **Recoil** (`0.4.1`)
- **TypeScript** (`4.4.2`)
- **Notistack** (`2.0.3`)

## Proxy Configuration
The frontend is configured to use a proxy:
```json
"proxy": "http://0.0.0.0:80"
```

