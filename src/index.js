import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from '../src/components/Header';
import Meals from '../src/components/Meals'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <Meals />
    <App />
  </React.StrictMode>
);