import React from 'react';
import { createRoot } from 'react-dom/client';
import EnglishApp from './EnglishApp.jsx';
import './style.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><EnglishApp /></React.StrictMode>);
