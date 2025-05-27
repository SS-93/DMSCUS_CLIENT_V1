import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DriveLogin: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🔍 DriveLogin component mounted');
    console.log('🔍 Current URL:', window.location.href);
    console.log('🔍 URL search params:', window.location.search);
    
    // Check if token is in URL params (from Google OAuth redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    console.log('🔍 Token from URL params:', token ? 'Present' : 'Not found');
    console.log('🔍 Current localStorage token:', localStorage.getItem('token') ? 'Present' : 'Not found');
    
    if (token) {
      console.log('✅ Setting token in localStorage');
      localStorage.setItem('token', token);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
      console.log('🧹 URL cleaned up');
    }
  }, []);

  const handleDriveLogin = async () => {
    try {
      setIsLoading(true);
      
      const token = localStorage.getItem('token');
      console.log('🔑 Token for Drive login request:', token ? 'Present' : 'Missing');
      console.log('🚀 Making request to: http://localhost:3200/auth/drive/login');
      
      // Call backend to get Google Drive OAuth URL
      const response = await fetch('http://localhost:3200/auth/drive/login', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📥 Response status:', response.status);
      console.log('📥 Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Response error:', errorText);
        throw new Error(`Failed to get Drive auth URL: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('📋 Response data:', data);
      console.log('🔗 Auth URL received:', data.authUrl ? 'Present' : 'Missing');
      
      // Redirect to Google Drive OAuth
      console.log('🚀 Redirecting to Google Drive OAuth...');
      window.location.href = data.authUrl;
    } catch (error) {
      console.error('❌ Drive login error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connect to Google Drive
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access and manage your Google Drive files securely
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  What you'll get access to:
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>View and manage your Google Drive files</li>
                    <li>Upload documents to your Drive</li>
                    <li>Search through your documents</li>
                    <li>Organize files and folders</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleDriveLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting...
              </div>
            ) : (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                  />
                </svg>
                Connect Google Drive
              </div>
            )}
          </button>

          <div className="mt-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriveLogin; 