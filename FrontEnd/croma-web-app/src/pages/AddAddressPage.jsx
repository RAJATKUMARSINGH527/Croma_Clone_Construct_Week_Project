import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AddAddressPage = () => {
  const navigate = useNavigate();
  const [mapLocation, setMapLocation] = useState('');
  const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    nickName: '',
    pinCode: '',
    addressLine: '',
    landmark: '',
    locality: '',
    state: '',
    city: '',
    addressType: '',
    isDefault: false
  });

  useEffect(() => {
    // Handle the case when user clicks "Use Current Location"
    if (isUsingCurrentLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchAddressFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.error('Error getting current location:', error);
          setIsUsingCurrentLocation(false);
          alert('Could not access your location. Please check your browser permissions.');
        }
      );
    }
  }, [isUsingCurrentLocation]);

  // Debounced search effect
  useEffect(() => {
    if (searchQuery.length > 2) {
      const timer = setTimeout(() => {
        handleLocationSearch(searchQuery);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const fetchAddressFromCoordinates = async (latitude, longitude) => {
    try {
      setIsUsingCurrentLocation(true);
      // In a real app, this would use a real geocoding service like Google Maps API
      // For this example, I'm simulating a successful response
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulated response with actual data
      const addressData = {
        fullAddress: '123 Example Street, Example City',
        pinCode: '400001',
        addressLine: '123 Example Street',
        locality: 'Example Neighborhood',
        state: 'Example State',
        city: 'Example City',
        landmark: 'Near Example Mall'
      };
      
      setMapLocation(addressData.fullAddress);
      setFormData(prevData => ({
        ...prevData,
        pinCode: addressData.pinCode,
        addressLine: addressData.addressLine,
        locality: addressData.locality,
        state: addressData.state,
        city: addressData.city,
        landmark: addressData.landmark
      }));
    } catch (error) {
      console.error('Error fetching address from coordinates:', error);
      alert('Error fetching address from your location. Please try again or enter address manually.');
    } finally {
      setIsUsingCurrentLocation(false);
    }
  };

  const handleLocationSearch = async (query) => {
    if (!query || query.length < 3) return;
    
    setIsSearching(true);
    try {
      // In a real app, this would call a real API
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock search results based on query
      const mockResults = [
        {
          id: 1,
          fullAddress: `${query} Main Street, Mumbai`,
          pinCode: '400001',
          addressLine: `${query} Main Street`,
          locality: 'Andheri',
          state: 'Maharashtra',
          city: 'Mumbai',
          landmark: 'Near Central Mall'
        },
        {
          id: 2,
          fullAddress: `${query} Park Avenue, Delhi`,
          pinCode: '110001',
          addressLine: `${query} Park Avenue`,
          locality: 'Connaught Place',
          state: 'Delhi',
          city: 'New Delhi',
          landmark: 'Near India Gate'
        }
      ];
      
      setSearchResults(mockResults);
    } catch (error) {
      console.error('Error searching for location:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSearchResult = (result) => {
    setMapLocation(result.fullAddress);
    setFormData(prevData => ({
      ...prevData,
      pinCode: result.pinCode,
      addressLine: result.addressLine,
      locality: result.locality,
      state: result.state,
      city: result.city,
      landmark: result.landmark
    }));
    setSearchResults([]);
    setSearchQuery('');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchLocation = (e) => {
    if (e) e.preventDefault();
    handleLocationSearch(searchQuery);
  };

  const handleUseCurrentLocation = () => {
    setIsUsingCurrentLocation(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Prepare data for submission
      const addressData = {
        ...formData,
        fullAddress: formData.addressLine,
        mapLocation: mapLocation,
        createdAt: new Date()
      };
      
      // Send data to MongoDB using fetch API
      // Replace with your actual API endpoint
      console.log('Sending address data to MongoDB:', addressData);
      
      const response = await fetch('http://localhost:4000/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response from MongoDB:', data);
      
      alert('Address saved successfully to MongoDB!');
      navigate('/my-account/address');
    } catch (error) {
      console.error('Error saving address to MongoDB:', error);
      alert('Error saving address to database. Please try again.');
    }
  };

  return (
    <div className="bg-black min-h-screen text-white p-6 pt-20">
      <div className="flex items-center text-sm mb-6">
        <Link to="/my-account" className="hover:text-teal-500">My Account</Link>
        <span className="mx-2">&gt;</span>
        <Link to="/my-account/address" className="hover:text-teal-500">My Addresses</Link>
        <span className="mx-2">&gt;</span>
        <span>Manage Address</span>
      </div>

      <h1 className="text-2xl font-bold mb-8">Add New Address</h1>
      
      <div className="border-b border-gray-800 pb-6 mb-6">
        <h2 className="mb-4">Search your location</h2>
        <form onSubmit={handleSearchLocation} className="mb-4 relative">
          <div className="flex">
            <input
              type="text"
              name="locationSearch"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search for building name, landmark, street, area..."
              className="w-full bg-white text-black p-3 rounded-l outline-none"
            />
            <button 
              type="submit"
              className="bg-white text-black px-4 rounded-r border-l border-gray-300"
              disabled={isSearching}
            >
              {isSearching ? (
                <span className="animate-spin">⟳</span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
          
          {searchResults.length > 0 && (
            <div className="absolute z-10 w-full bg-white text-black mt-1 rounded shadow-lg">
              {searchResults.map(result => (
                <div 
                  key={result.id}
                  className="p-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectSearchResult(result)}
                >
                  <div className="font-medium">{result.fullAddress}</div>
                  <div className="text-sm text-gray-600">{result.locality}, {result.city}, {result.pinCode}</div>
                </div>
              ))}
            </div>
          )}
        </form>
        
        <button 
          onClick={handleUseCurrentLocation}
          className="w-full flex items-center justify-between bg-black border border-gray-700 text-white p-3 rounded mb-4 hover:bg-gray-900"
          disabled={isUsingCurrentLocation}
        >
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            {isUsingCurrentLocation ? 'Getting your location...' : 'Use Current Location (GPS)'}
          </div>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
        
        {mapLocation && (
          <div className="mb-4">
            <div className="bg-gray-200 h-64 rounded relative mb-4">
              {/* This would be a real map in production */}
              <div className="absolute inset-0 flex items-center justify-center text-black">
                Map View - {mapLocation}
              </div>
            </div>
            
            <div className="flex items-center justify-between bg-black border border-gray-700 p-3 rounded">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                </svg>
                {mapLocation}
              </div>
              <button 
                className="text-teal-500"
                onClick={() => {
                  setMapLocation('');
                  setSearchQuery('');
                }}
              >
                Change
              </button>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2">
              Full Name*
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter Full name"
              className="w-full bg-black border border-gray-700 rounded p-3"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2">
              Mobile Number*
            </label>
            <div className="flex">
              <div className="bg-black border border-gray-700 border-r-0 rounded-l p-3">
                +91
              </div>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="w-full bg-black border border-gray-700 rounded-r p-3"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-2">
              Address Nick Name*
            </label>
            <input
              type="text"
              name="nickName"
              value={formData.nickName}
              onChange={handleChange}
              placeholder="Enter Nick Name"
              className="w-full bg-black border border-gray-700 rounded p-3"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2">
              Pin Code*
            </label>
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              placeholder="Pincode"
              className="w-full bg-black border border-gray-700 rounded p-3"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2">
              Address (Flat no., Building, Company, Street)*
            </label>
            <input
              type="text"
              name="addressLine"
              value={formData.addressLine}
              onChange={handleChange}
              placeholder="Flat no./Building Name/Society"
              className="w-full bg-black border border-gray-700 rounded p-3"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2">
              Landmark*
            </label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="Landmark"
              className="w-full bg-black border border-gray-700 rounded p-3"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block mb-2">
            Locality / Sector / Area*
          </label>
          <input
            type="text"
            name="locality"
            value={formData.locality}
            onChange={handleChange}
            placeholder="Locality/Sector/Area"
            className="w-full bg-black border border-gray-700 rounded p-3"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2">
              State*
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full bg-black border border-gray-700 rounded p-3"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2">
              City*
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full bg-black border border-gray-700 rounded p-3"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block mb-4">
            Address Type
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="addressType"
                value="Home"
                checked={formData.addressType === 'Home'}
                onChange={handleChange}
                className="mr-2 text-teal-500"
              />
              Home
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="addressType"
                value="Work"
                checked={formData.addressType === 'Work'}
                onChange={handleChange}
                className="mr-2 text-teal-500"
              />
              Work
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="addressType"
                value="Other"
                checked={formData.addressType === 'Other'}
                onChange={handleChange}
                className="mr-2 text-teal-500"
              />
              Other
            </label>
          </div>
        </div>
        
        <div className="mb-8">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="mr-2"
            />
            Make This My Default Address
          </label>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-teal-500 text-white rounded px-6 py-3 hover:bg-teal-600"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressPage;