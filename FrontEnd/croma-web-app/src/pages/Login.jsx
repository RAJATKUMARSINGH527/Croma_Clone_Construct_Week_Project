import React, { useState } from 'react';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!identifier) {
      setError('Please enter your Email ID or Phone number');
      return;
    }

    // You would typically add your actual login logic here
    console.log('Logging in with:', identifier);
    console.log('Keep me signed in:', keepSignedIn);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 w-full max-w-md rounded-lg shadow-lg">
        <div className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-white text-2xl font-bold">Croma</h1>
          </div>
          
          <div className="mb-4 flex justify-center space-x-4">
            <button className="text-white px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600">
              Login
            </button>
            <button className="text-white px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600">
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Enter your Email ID or phone number"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  setError('');
                }}
                className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <div className="mb-4 flex items-center">
              <input 
                type="checkbox" 
                id="keepSignedIn"
                checked={keepSignedIn}
                onChange={() => setKeepSignedIn(!keepSignedIn)}
                className="mr-2 text-teal-500 focus:ring-teal-500"
              />
              <label htmlFor="keepSignedIn" className="text-white">
                Keep me signed in
              </label>
            </div>

            <div className="text-sm text-gray-400 mb-4">
              By continuing you agree to our <a href="#" className="text-teal-500">Terms of Use</a> & <a href="#" className="text-teal-500">Privacy Policy</a>
            </div>

            <button 
              type="submit" 
              className="w-full bg-teal-500 text-white py-3 rounded-md hover:bg-teal-600 transition duration-300"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}