// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';
import { connectToFirebase } from "./firebaseModelV2.js";
import store from './MovieQuizStore'; // Import the MobX store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App model={store} /> {/* Pass the MobX store */}
  </AuthProvider>
);

connectToFirebase(); // Connect the MobX store to Firebase
