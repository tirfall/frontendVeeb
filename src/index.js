import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tooted from './tooted'; // Assuming `tooded.js` is your product page component
import Kasutajad from './kasutajad'; // Import `kasutajad` correctly
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Tooted />} />
                <Route path="/kasutajad" element={<Kasutajad />} /> {/* Ensure the path matches */}
            </Routes>
        </Router>
    </React.StrictMode>
);
