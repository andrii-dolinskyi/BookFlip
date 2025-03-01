import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import AdditionalDetails from './AdditionalDetails';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

function App() {
    return (
        <AuthProvider> {/* Wrap Routes with AuthProvider */}
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/additional-details" element={<AdditionalDetails />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;