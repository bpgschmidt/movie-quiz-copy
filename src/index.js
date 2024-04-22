// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { connectToFirebase } from "./utilities/persistance.js";
import store from './MovieQuizStore'; // Import the MobX store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App model={store} /> // Pass the MobX store as a prop to the App component

);

connectToFirebase(); // Connect the MobX store to Firebase
