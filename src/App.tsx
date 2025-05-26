import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './components/Home';
import { SignIn } from './components/auth/SignIn';
import GoogleAuthUI from './components/googleAuth/GoogleAuthUI';
// import AuthCallback from './components/auth/AuthCallback';s

const Dashboard = () => <div>Dashboard (Coming Soon)</div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/signup" element={<Home />} />   
          <Route path="/signin" element={<SignIn />} />
          <Route path="/test" element={<GoogleAuthUI />} />
          {/* <Route path="/auth/callback" element={<AuthCallback />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export  default App;
